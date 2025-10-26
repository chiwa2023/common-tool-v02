package net.seijishikin.jp.normalize.common_tool.utils.paging;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Map;

import org.junit.jupiter.api.Test;

import net.seijishikin.jp.normalize.common_tool.dto.paging.SwitchYearPagingIntegerDatetimeDtoInterface;

/**
 * SwitchYearCreatePagingConditionDatetimeUtil単体テスト
 */
class SwitchYearCreatePagingConditionDatetimeUtilTest {
    // CHECKSTYLE:OFF

    @Test
    void testCopyCount() throws Exception {

        MockSwichYearPagingDatetimeDto capsuleDto = new MockSwichYearPagingDatetimeDto();
        capsuleDto.setSearchWords("検索語1");
        MockSwichYearPagingDatetimeDto resultDto = new MockSwichYearPagingDatetimeDto();

        SwitchYearCreatePagingConditionDatetimeUtil util = new SwitchYearCreatePagingConditionDatetimeUtil();
        util.copyCount(resultDto, capsuleDto);

        assertEquals(resultDto.getAllCount(), capsuleDto.getAllCount());
        assertEquals(resultDto.getPreStepViewCount(), capsuleDto.getPreStepViewCount());

        assertEquals(capsuleDto.getSearchWords(), capsuleDto.getSearchWords(), "メソッドに通してもその他のフィールドに変更はない");
    }

    @Test
    void testLimitForExecute() throws Exception {

        final int limit = 10;
        // ページ番号が全件数を超えているので件数だけ取って検索処理をしない
        final int pageNumber00 = 4;

        MockSwichYearPagingDatetimeDto capsuleDto00 = this.createDto(limit, pageNumber00, 19, 3);
        MockSwichYearPagingDatetimeDto resultDto00 = this.createDto(limit, pageNumber00, 2, 3);

        SwitchYearCreatePagingConditionDatetimeUtil util = new SwitchYearCreatePagingConditionDatetimeUtil();
        assertEquals(-1, util.getLimitForExecute(resultDto00, capsuleDto00), "検索開始位置が全件数を超えている場合は検索しない");

        // 初回は計算結果としてとにかくlimitいっぱいを取りに行く(実際にとれる件数は考慮しない)
        final int pageNumber01 = 0; // 初期ページ
        MockSwichYearPagingDatetimeDto capsuleDto01 = this.createDto(limit, pageNumber01, 3, 0);
        MockSwichYearPagingDatetimeDto resultDto01 = this.createDto(limit, pageNumber01, 0, 0);
        assertEquals(limit, util.getLimitForExecute(resultDto01, capsuleDto01));

        // 10件表示のうち、７件すでに表示しているので、この検索では40件取得できるが、3件しか検索してはいけない
        final int pageNumber02 = 0; // 初期ページ
        final int viewCnt02 = 7; // いままで7件表示している
        MockSwichYearPagingDatetimeDto capsuleDto02 = this.createDto(limit, pageNumber02, 40, viewCnt02);
        MockSwichYearPagingDatetimeDto resultDto02 = this.createDto(limit, pageNumber02, viewCnt02, viewCnt02);
        assertEquals(limit - viewCnt02, util.getLimitForExecute(resultDto02, capsuleDto02));
    }

    @Test
    void testOffsetForExecute() throws Exception {

        final int limit = 10;

        // ページ番号が全件数を超えているので件数だけ取って検索処理をしない
        final int pageNumber00 = 4;
        MockSwichYearPagingDatetimeDto capsuleDto00 = this.createDto(limit, pageNumber00, 19, 3);
        MockSwichYearPagingDatetimeDto resultDto00 = this.createDto(limit, pageNumber00, 2, 3);

        SwitchYearCreatePagingConditionDatetimeUtil util = new SwitchYearCreatePagingConditionDatetimeUtil();
        assertEquals(-1, util.getOffsetForExecute(resultDto00, capsuleDto00));

        // 初期検索は0件から
        final int pageNumber01 = 0; // 初期ページ
        final int viewCnt01 = 0;
        MockSwichYearPagingDatetimeDto capsuleDto01 = this.createDto(limit, pageNumber01, 40, viewCnt01);
        MockSwichYearPagingDatetimeDto resultDto01 = this.createDto(limit, pageNumber01, viewCnt01, viewCnt01);
        assertEquals(0, util.getOffsetForExecute(resultDto01, capsuleDto01));

        // テーブルをまたいでいて検索をする必要があっても、またいだ後のテーブルは0件から検索する
        final int pageNumber02 = 0; // 初期ページ
        final int viewCnt02 = 7; // いままで7件表示している
        MockSwichYearPagingDatetimeDto capsuleDto02 = this.createDto(limit, pageNumber02, 40, viewCnt02);
        MockSwichYearPagingDatetimeDto resultDto02 = this.createDto(limit, pageNumber02, viewCnt02, viewCnt02);
        assertEquals(0, util.getOffsetForExecute(resultDto02, capsuleDto02));

        // テーブル途中で検索する場合はそのoffsetに移動する
        final int pageNumber03 = 4;
        final int viewCnt03 = 0;
        MockSwichYearPagingDatetimeDto capsuleDto03 = this.createDto(limit, pageNumber03, 156, viewCnt03);
        MockSwichYearPagingDatetimeDto resultDto03 = this.createDto(limit, pageNumber03, viewCnt03, viewCnt03);
        assertEquals(40, util.getOffsetForExecute(resultDto03, capsuleDto03));
    }

    @Test
    void testPracticeMap() throws Exception {

        SwitchYearCreatePagingConditionDatetimeUtil util = new SwitchYearCreatePagingConditionDatetimeUtil();

        MockSwichYearPagingDatetimeDto capsuleDto = new MockSwichYearPagingDatetimeDto();
        final String searchWords = "検索語2";
        capsuleDto.setSearchWords(searchWords);
        LocalDateTime startDate = LocalDateTime.of(2024, 6, 18, 3, 4, 5);
        LocalDateTime endDate = LocalDateTime.of(2026, 11, 29, 7, 8, 9);
        capsuleDto.setStartDate(startDate);
        capsuleDto.setEndDate(endDate);
        capsuleDto.setIsChangedCondition(true);
        capsuleDto.setPageNumber(32);

        Map<Integer, SwitchYearPagingIntegerDatetimeDtoInterface> map = util.practiceMap(capsuleDto);

        assertEquals(3, map.size());

        assertTrue(map.get(2024) instanceof MockSwichYearPagingDatetimeDto);
        assertTrue(map.get(2025) instanceof MockSwichYearPagingDatetimeDto);
        assertTrue(map.get(2026) instanceof MockSwichYearPagingDatetimeDto);

        MockSwichYearPagingDatetimeDto resultDto;
        if (map.get(2024) instanceof MockSwichYearPagingDatetimeDto) {
            resultDto = (MockSwichYearPagingDatetimeDto) map.get(2024);
            assertEquals(startDate, resultDto.getStartDate());
            assertEquals(LocalDateTime.of(LocalDate.of(2024, 12, 31), LocalTime.MAX), resultDto.getEndDate());
            assertEquals(searchWords, resultDto.getSearchWords());
            assertEquals(0, resultDto.getPageNumber(), "検索条件変更時にはページ番号は初期化される");
        }

        if (map.get(2025) instanceof MockSwichYearPagingDatetimeDto) {
            resultDto = (MockSwichYearPagingDatetimeDto) map.get(2025);
            assertEquals(LocalDateTime.of(LocalDate.of(2025, 1, 1), LocalTime.MIN), resultDto.getStartDate());
            assertEquals(LocalDateTime.of(LocalDate.of(2025, 12, 31), LocalTime.MAX), resultDto.getEndDate());
            assertEquals(searchWords, resultDto.getSearchWords());
        }

        if (map.get(2026) instanceof MockSwichYearPagingDatetimeDto) {
            resultDto = (MockSwichYearPagingDatetimeDto) map.get(2026);
            assertEquals(LocalDateTime.of(LocalDate.of(2026, 1, 1), LocalTime.MIN), resultDto.getStartDate());
            assertEquals(endDate, resultDto.getEndDate());
            assertEquals(searchWords, resultDto.getSearchWords());
        }
    }

    /**
     * 年切替ページングDtoを作成する
     *
     * @param limit        ページ表示件数
     * @param pageNumber   ページ番号
     * @param allCount     全件数
     * @param previewCount 前回まで表示数
     * @return 年切替ページングDto
     */
    private MockSwichYearPagingDatetimeDto createDto(final int limit, final int pageNumber, final int allCount,
            final int previewCount) {

        MockSwichYearPagingDatetimeDto dto = new MockSwichYearPagingDatetimeDto();
        dto.setSearchWords("検索語3");

        dto.setLimit(limit);
        dto.setPageNumber(pageNumber);
        dto.setAllCount(allCount);
        dto.setPreStepViewCount(previewCount);

        return dto;
    }

}
