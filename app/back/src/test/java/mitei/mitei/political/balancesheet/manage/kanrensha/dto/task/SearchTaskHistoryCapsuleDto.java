package mitei.mitei.political.balancesheet.manage.kanrensha.dto.task;

import java.io.Serializable;
import java.time.LocalDate;

import net.seijishikin.jp.normalize.common_tool.dto.DtoEntityInitialValueInterface;
import net.seijishikin.jp.normalize.common_tool.dto.paging.PeriodLocalDateCapsuleDtoInterface;

/**
 * テスト用検索条件Dto
 */
public class SearchTaskHistoryCapsuleDto // NOPMD DataClass
        implements Serializable, PeriodLocalDateCapsuleDtoInterface, DtoEntityInitialValueInterface {

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /** 開始日 */
    private LocalDate startDate = INIT_DATE;

    /** 終了日 */
    private LocalDate endDate = INIT_DATE;

    /**
     * 開始日を取得する
     */
    @Override
    public LocalDate getStartDate() {
        return startDate;
    }

    /**
     * 開始日を設定する
     */
    @Override
    public void setStartDate(final LocalDate startDate) {
        this.startDate = startDate;
    }

    /**
     * 終了日を取得する
     */
    @Override
    public LocalDate getEndDate() {
        return endDate;
    }

    /**
     * 終了日を設定する
     */
    @Override
    public void setEndDate(final LocalDate endDate) {
        this.endDate = endDate;
    }

    /** キーワード検索語 */
    private String keywords = INIT_STRING;

    /**
     * キーワード検索語を取得する
     * 
     * @return キーワード検索語
     */
    public String getKeywords() {
        return keywords;
    }

    /**
     * キーワード検索語を設定する
     * 
     * @param keywords キーワード検索語
     */
    public void setKeywords(final String keywords) {
        this.keywords = keywords;
    }

}
