package net.seijishikin.jp.normalize.common_tool.utils.paging;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Map;
import java.util.TreeMap;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import net.seijishikin.jp.normalize.common_tool.dto.paging.SwitchYearPagingIntegerDatetimeDtoInterface;

/**
 * 検索条件日時期間Dtoを年展開するLogic
 *
 * <p>
 * 大量のデータがあって発生年ごとでテーブルを分割していて、年をまたいだ検索条件指定ができる場合、<br>
 * 各年のテーブルで検索できるよう期間条件を調節します。<br>
 * 例) 検索開始日時 2022/12/05 12:34:56から2024/04/09 23:45:12<br>
 * 2022/12/05 12:34:56から2022/12/31 23:59:59<br>
 * 2023/01/01 00:00:00から2023/12/31 23:59:59<br>
 * 2024/01/01 00:00:00から2024/04/09 23:45:12<br>
 * その他の検索条件は複写します。<br>
 * インターフェースPeriodDatetimeCapsuleDtoInterfaceが戻ることになっていますが、実際には生成したインスタンスで戻ります。利用場所でアップキャストして使用します。<br>
 * </p>
 */
@Component
public class SwitchYearCreatePagingConditionDatetimeUtil {

    /**
     * 検索条件に件数をセットする
     *
     * @param srcImpl  複写元Interface実装
     * @param copyImpl 複写先Interface実装
     */
    public void copyCount(final SwitchYearPagingIntegerDatetimeDtoInterface srcImpl,
            final SwitchYearPagingIntegerDatetimeDtoInterface copyImpl) {

        // BeanUtilsは使わない
        copyImpl.setAllCount(srcImpl.getAllCount());
        copyImpl.setPreStepViewCount(srcImpl.getPreStepViewCount());
    }

    /**
     * 年展開検索条件作成を行う
     *
     * @param capsuleDto 日時期間Dto
     * @return 年展開したMap
     * @throws InvocationTargetException reflectio例外
     * @throws IllegalAccessException    reflectio例外
     * @throws InstantiationException    reflectio例外
     * @throws NoSuchMethodException     reflectio例外
     */
    public Map<Integer, SwitchYearPagingIntegerDatetimeDtoInterface> practiceMap(
            final SwitchYearPagingIntegerDatetimeDtoInterface capsuleDto)
            throws InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchMethodException {

        // 検索条件が変わったときはページ番号を初期化する
        if (capsuleDto.getIsChangedCondition()) {
            capsuleDto.setPageNumber(0);
        }

        // 入力の開始と終了の前後関係が逆転している場合は入れ替え(無限ループ発生は避ける)
        if (capsuleDto.getStartDate().isAfter(capsuleDto.getEndDate())) { // NOPMD LawOfDemiter
            LocalDateTime startTemp = LocalDateTime.from(capsuleDto.getStartDate());
            LocalDateTime endTemp = LocalDateTime.from(capsuleDto.getEndDate());
            capsuleDto.setStartDate(endTemp);
            capsuleDto.setEndDate(startTemp);
        }

        int yearStart = capsuleDto.getStartDate().getYear(); // NOPMD
        int yearEnd = capsuleDto.getEndDate().getYear(); // NOPMD

        Map<Integer, SwitchYearPagingIntegerDatetimeDtoInterface> map = new TreeMap<>();

        for (int year = yearStart; year <= yearEnd; year++) {

            // 開始年と同一であれば検索条件、同一でなければ年始
            LocalDateTime start;
            if (year == yearStart) {
                start = capsuleDto.getStartDate(); // NOPMD
            } else {
                start = LocalDateTime.of(LocalDate.of(year, 1, 1), LocalTime.MIN);
            }

            // 終了年と同一であれば検索条件、同一でなければ年末
            LocalDateTime end;
            if (year == yearEnd) {
                end = capsuleDto.getEndDate(); // NOPMD
            } else {
                end = LocalDateTime.of(LocalDate.of(year, 12, 31), LocalTime.MAX); // SUPPRESS CHECKSTYLE MagicNumber
            }
            map.put(year, this.createPagingDto(capsuleDto, start, end));
        }

        return map;
    }

    /**
     * ページングDtoを複写する
     *
     * @param capsuleDto ページングDto
     * @param start      検索条件開始日付
     * @param end        検索条件終了日付
     * @return ページングDto
     * @throws InvocationTargetException reflection例外
     * @throws IllegalAccessException    reflection例外
     * @throws InstantiationException    reflection例外
     * @throws NoSuchMethodException     reflection例外
     */
    private SwitchYearPagingIntegerDatetimeDtoInterface createPagingDto(
            final SwitchYearPagingIntegerDatetimeDtoInterface capsuleDto, final LocalDateTime start,
            final LocalDateTime end)
            throws InvocationTargetException, IllegalAccessException, InstantiationException, NoSuchMethodException {

        SwitchYearPagingIntegerDatetimeDtoInterface dto = capsuleDto.getClass().getDeclaredConstructor().newInstance();

        BeanUtils.copyProperties(capsuleDto, dto);
        dto.setStartDate(start);
        dto.setEndDate(end);

        return dto;
    }

    /**
     * 実行用Offsetを取得する
     *
     * @param capsuleDtoImpl 検索条件ページング実装
     * @param resultDtoImpl  検索結果ページング実装
     * @return offset
     */
    public int getOffsetForExecute(final SwitchYearPagingIntegerDatetimeDtoInterface capsuleDtoImpl,
            final SwitchYearPagingIntegerDatetimeDtoInterface resultDtoImpl) {

        int startOffset = this.getStartOffset(capsuleDtoImpl);

        if (this.isExecuteSearch(capsuleDtoImpl, resultDtoImpl, startOffset)) {
            return startOffset - capsuleDtoImpl.getAllCount() + capsuleDtoImpl.getPreStepViewCount();
        } else {
            return -1;
        }

    }

    /**
     * 実行用のLimitを算出する
     *
     * @param capsuleDtoImpl 検索条件ページング実装
     * @param resultDtoImpl  検索結果ページング実装
     * @return limit
     */
    public int getLimitForExecute(final SwitchYearPagingIntegerDatetimeDtoInterface capsuleDtoImpl,
            final SwitchYearPagingIntegerDatetimeDtoInterface resultDtoImpl) {

        int startOffset = this.getStartOffset(capsuleDtoImpl);

        if (this.isExecuteSearch(capsuleDtoImpl, resultDtoImpl, startOffset)) {
            return capsuleDtoImpl.getLimit() - capsuleDtoImpl.getPreStepViewCount();

        } else {
            return -1;
        }

    }

    /**
     * 検索実行するかどうか判定する
     *
     * @param capsuleDtoImpl 検索条件ページング実装
     * @param resultDtoImpl  検索結果ページング実装
     * @param startOffset    検索位置
     * @return 検索実行判定
     */
    private boolean isExecuteSearch(final SwitchYearPagingIntegerDatetimeDtoInterface capsuleDtoImpl,
            final SwitchYearPagingIntegerDatetimeDtoInterface resultDtoImpl, final int startOffset) {

        // 1.2. 表示開始位置が前回まで検索件数と今回まで検索件数の間
        // 3. 表示済件数がlimitより小さい
        return startOffset + capsuleDtoImpl.getPreStepViewCount() >= capsuleDtoImpl.getAllCount()
                && startOffset < resultDtoImpl.getAllCount()
                && capsuleDtoImpl.getPreStepViewCount() < capsuleDtoImpl.getLimit();
    }

    /**
     * (絶対)検索実行位置を取得する
     *
     * @param capsuleDtoImpl 検索条件ページング実装
     * @return 検索実行位置
     */
    private int getStartOffset(final SwitchYearPagingIntegerDatetimeDtoInterface capsuleDtoImpl) {

        return capsuleDtoImpl.getPageNumber() * capsuleDtoImpl.getLimit();
    }

}
