package net.seijishikin.jp.normalize.common_tool.utils.paging;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.Map;

import org.junit.jupiter.api.Test;

import net.seijishikin.jp.normalize.common_tool.dto.paging.SwitchYearPagingIntegerDtoInterface;

/**
 * SwitchYearCreatePagingConditionUtil単体テスト
 */
class SwitchYearCreatePagingConditionUtilTest {
    // CHECKSTYLE:OFF

    @Test
    void testCopyCount() throws Exception {

        MockSwichYearPagingDto capsuleDto = new MockSwichYearPagingDto();
        capsuleDto.setSearchWords("検索語1");
        MockSwichYearPagingDto resultDto = new MockSwichYearPagingDto();

        SwitchYearCreatePagingConditionUtil util = new SwitchYearCreatePagingConditionUtil();
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

        MockSwichYearPagingDto capsuleDto00 = this.createDto(limit, pageNumber00, 19, 3);
        MockSwichYearPagingDto resultDto00 = this.createDto(limit, pageNumber00, 2, 3);

        SwitchYearCreatePagingConditionUtil util = new SwitchYearCreatePagingConditionUtil();
        assertEquals(-1, util.getLimitForExecute(resultDto00, capsuleDto00), "検索開始位置が全件数を超えている場合は検索しない");

        // 初回は計算結果としてとにかくlimitいっぱいを取りに行く(実際にとれる件数は考慮しない)
        final int pageNumber01 = 0; // 初期ページ
        MockSwichYearPagingDto capsuleDto01 = this.createDto(limit, pageNumber01, 3, 0);
        MockSwichYearPagingDto resultDto01 = this.createDto(limit, pageNumber01, 0, 0);
        assertEquals(limit, util.getLimitForExecute(resultDto01, capsuleDto01));

        // 10件表示のうち、７件すでに表示しているので、この検索では40件取得できるが、3件しか検索してはいけない
        final int pageNumber02 = 0; // 初期ページ
        final int viewCnt02 = 7; // いままで7件表示している
        MockSwichYearPagingDto capsuleDto02 = this.createDto(limit, pageNumber02, 40, viewCnt02);
        MockSwichYearPagingDto resultDto02 = this.createDto(limit, pageNumber02, viewCnt02, viewCnt02);
        assertEquals(limit - viewCnt02, util.getLimitForExecute(resultDto02, capsuleDto02));
    }

    @Test
    void testOffsetForExecute() throws Exception {

        final int limit = 10;

        // ページ番号が全件数を超えているので件数だけ取って検索処理をしない
        final int pageNumber00 = 4;
        MockSwichYearPagingDto capsuleDto00 = this.createDto(limit, pageNumber00, 19, 3);
        MockSwichYearPagingDto resultDto00 = this.createDto(limit, pageNumber00, 2, 3);

        SwitchYearCreatePagingConditionUtil util = new SwitchYearCreatePagingConditionUtil();
        assertEquals(-1, util.getOffsetForExecute(resultDto00, capsuleDto00));

        // 初期検索は0件から
        final int pageNumber01 = 0; // 初期ページ
        final int viewCnt01 = 0;
        MockSwichYearPagingDto capsuleDto01 = this.createDto(limit, pageNumber01, 40, viewCnt01);
        MockSwichYearPagingDto resultDto01 = this.createDto(limit, pageNumber01, viewCnt01, viewCnt01);
        assertEquals(0, util.getOffsetForExecute(resultDto01, capsuleDto01));

        // テーブルをまたいでいて検索をする必要があっても、またいだ後のテーブルは0件から検索する
        final int pageNumber02 = 0; // 初期ページ
        final int viewCnt02 = 7; // いままで7件表示している
        MockSwichYearPagingDto capsuleDto02 = this.createDto(limit, pageNumber02, 40, viewCnt02);
        MockSwichYearPagingDto resultDto02 = this.createDto(limit, pageNumber02, viewCnt02, viewCnt02);
        assertEquals(0, util.getOffsetForExecute(resultDto02, capsuleDto02));

        // テーブル途中で検索する場合はそのoffsetに移動する
        final int pageNumber03 = 4;
        final int viewCnt03 = 0;
        MockSwichYearPagingDto capsuleDto03 = this.createDto(limit, pageNumber03, 156, viewCnt03);
        MockSwichYearPagingDto resultDto03 = this.createDto(limit, pageNumber03, viewCnt03, viewCnt03);
        assertEquals(40, util.getOffsetForExecute(resultDto03, capsuleDto03));
    }

    @Test
    void testPracticeMap() throws Exception {

        SwitchYearCreatePagingConditionUtil util = new SwitchYearCreatePagingConditionUtil();

        MockSwichYearPagingDto capsuleDto = new MockSwichYearPagingDto();
        final String searchWords = "検索語2";
        capsuleDto.setSearchWords(searchWords);
        LocalDate startDate = LocalDate.of(2024, 6, 18);
        LocalDate endDate = LocalDate.of(2026, 11, 29);
        capsuleDto.setStartDate(startDate);
        capsuleDto.setEndDate(endDate);
        capsuleDto.setIsChangedCondition(true);
        capsuleDto.setPageNumber(32);

        Map<Integer, SwitchYearPagingIntegerDtoInterface> map = util.practiceMap(capsuleDto);

        assertEquals(3, map.size());

        assertTrue(map.get(2024) instanceof MockSwichYearPagingDto);
        assertTrue(map.get(2025) instanceof MockSwichYearPagingDto);
        assertTrue(map.get(2026) instanceof MockSwichYearPagingDto);

        MockSwichYearPagingDto resultDto;
        if (map.get(2024) instanceof MockSwichYearPagingDto) {
            resultDto = (MockSwichYearPagingDto) map.get(2024);
            assertEquals(startDate, resultDto.getStartDate());
            assertEquals(LocalDate.of(2024, 12, 31), resultDto.getEndDate());
            assertEquals(searchWords, resultDto.getSearchWords());
            assertEquals(0, resultDto.getPageNumber(), "検索条件変更時にはページ番号は初期化される");
        }

        if (map.get(2025) instanceof MockSwichYearPagingDto) {
            resultDto = (MockSwichYearPagingDto) map.get(2025);
            assertEquals(LocalDate.of(2025, 1, 1), resultDto.getStartDate());
            assertEquals(LocalDate.of(2025, 12, 31), resultDto.getEndDate());
            assertEquals(searchWords, resultDto.getSearchWords());
        }

        if (map.get(2026) instanceof MockSwichYearPagingDto) {
            resultDto = (MockSwichYearPagingDto) map.get(2026);
            assertEquals(LocalDate.of(2026, 1, 1), resultDto.getStartDate());
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
    private MockSwichYearPagingDto createDto(final int limit, final int pageNumber, final int allCount,
            final int previewCount) {

        MockSwichYearPagingDto dto = new MockSwichYearPagingDto();
        dto.setSearchWords("検索語3");

        dto.setLimit(limit);
        dto.setPageNumber(pageNumber);
        dto.setAllCount(allCount);
        dto.setPreStepViewCount(previewCount);

        return dto;
    }

}
