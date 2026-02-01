package net.seijishikin.jp.normalize.common_tool.logic;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import java.time.LocalDate;
import java.util.Map;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import mitei.mitei.political.balancesheet.manage.kanrensha.dto.task.SearchTaskHistoryCapsuleDto;
import net.seijishikin.jp.normalize.common_tool.dto.paging.PeriodLocalDateCapsuleDtoInterface;

/**
 * CreatePeriodLoalDateConditionMapByYearLogic単体テスト
 */
class CreatePeriodLoalDateConditionMapByYearLogicTest {
    // CHECKSTYLE:OFF MagicNumber

    @Test
    @Tag("TableTruncate") // NOPMD
    void testSameYear() throws Exception {

        CreatePeriodLoalDateConditionMapByYearLogic logic = new CreatePeriodLoalDateConditionMapByYearLogic();

        SearchTaskHistoryCapsuleDto capsuleDto = new SearchTaskHistoryCapsuleDto();
        capsuleDto.setStartDate(LocalDate.of(2022, 4, 11));
        capsuleDto.setEndDate(LocalDate.of(2022, 8, 18));
        capsuleDto.setKeywords("検索語"); // NOPMD

        Map<Integer, PeriodLocalDateCapsuleDtoInterface> map = logic.practice(capsuleDto);

        assertEquals(1, map.size());
        // 指定期間は1年の間に収まっていいるので１年分を検索し、期間は指定条件通り
        PeriodLocalDateCapsuleDtoInterface dto = map.get(2022);
        assertTrue(dto instanceof SearchTaskHistoryCapsuleDto);
        assertEquals(LocalDate.of(2022, 4, 11), dto.getStartDate());
        assertEquals(LocalDate.of(2022, 8, 18), dto.getEndDate());

        if (dto instanceof SearchTaskHistoryCapsuleDto) {
            // キャストしてinterface以外の値が保たれていること
            SearchTaskHistoryCapsuleDto ansDto = (SearchTaskHistoryCapsuleDto) dto;
            assertEquals("検索語", ansDto.getKeywords());
        } else {
            fail("元の型が維持できていません"); // NOPMD
        }
    }

    @Test
    @Tag("TableTruncate")
    void testReverse() throws Exception {

        CreatePeriodLoalDateConditionMapByYearLogic logic = new CreatePeriodLoalDateConditionMapByYearLogic();

        SearchTaskHistoryCapsuleDto capsuleDto = new SearchTaskHistoryCapsuleDto();
        // 前後関係の考慮はない
        capsuleDto.setEndDate(LocalDate.of(2022, 4, 11));
        capsuleDto.setStartDate(LocalDate.of(2022, 8, 18));
        capsuleDto.setKeywords("検索語");

        Map<Integer, PeriodLocalDateCapsuleDtoInterface> map = logic.practice(capsuleDto);

        assertEquals(1, map.size());
        // 指定期間は1年の間に収まっていいるので１年分を検索し、期間は指定条件通り
        PeriodLocalDateCapsuleDtoInterface dto = map.get(2022);
        assertTrue(dto instanceof SearchTaskHistoryCapsuleDto);
        assertEquals(LocalDate.of(2022, 4, 11), dto.getEndDate());
        assertEquals(LocalDate.of(2022, 8, 18), dto.getStartDate());

        if (dto instanceof SearchTaskHistoryCapsuleDto) {
            // キャストしてinterface以外の値が保たれていること
            SearchTaskHistoryCapsuleDto ansDto = (SearchTaskHistoryCapsuleDto) dto;
            assertEquals("検索語", ansDto.getKeywords());
        } else {
            fail("元の型が維持できていません");
        }
    }

    @Test
    @Tag("TableTruncate")
    void testYear2() throws Exception {

        CreatePeriodLoalDateConditionMapByYearLogic logic = new CreatePeriodLoalDateConditionMapByYearLogic();

        SearchTaskHistoryCapsuleDto capsuleDto = new SearchTaskHistoryCapsuleDto();
        capsuleDto.setStartDate(LocalDate.of(2022, 4, 11));
        capsuleDto.setEndDate(LocalDate.of(2023, 8, 18));
        capsuleDto.setKeywords("検索語");

        Map<Integer, PeriodLocalDateCapsuleDtoInterface> map = logic.practice(capsuleDto);

        assertEquals(2, map.size());

        // 2022年(検索期間は年末まで)
        PeriodLocalDateCapsuleDtoInterface dto2022 = map.get(2022);
        assertTrue(dto2022 instanceof SearchTaskHistoryCapsuleDto);
        assertEquals(LocalDate.of(2022, 4, 11), dto2022.getStartDate());
        assertEquals(LocalDate.of(2022, 12, 31), dto2022.getEndDate());

        if (dto2022 instanceof SearchTaskHistoryCapsuleDto) {
            // キャストしてinterface以外の値が保たれていること
            SearchTaskHistoryCapsuleDto ansDto = (SearchTaskHistoryCapsuleDto) dto2022;
            assertEquals("検索語", ansDto.getKeywords());
        } else {
            fail("元の型が維持できていません");
        }

        // 2023年(年始は1月1日から)
        PeriodLocalDateCapsuleDtoInterface dto2023 = map.get(2023);
        assertTrue(dto2023 instanceof SearchTaskHistoryCapsuleDto);
        assertEquals(LocalDate.of(2023, 1, 1), dto2023.getStartDate());
        assertEquals(LocalDate.of(2023, 8, 18), dto2023.getEndDate());

        if (dto2023 instanceof SearchTaskHistoryCapsuleDto) {
            // キャストしてinterface以外の値が保たれていること
            SearchTaskHistoryCapsuleDto ansDto = (SearchTaskHistoryCapsuleDto) dto2023;
            assertEquals("検索語", ansDto.getKeywords());
        } else {
            fail("元の型が維持できていません");
        }
    }

    @Test
    @Tag("TableTruncate")
    void testYear3() throws Exception {

        CreatePeriodLoalDateConditionMapByYearLogic logic = new CreatePeriodLoalDateConditionMapByYearLogic();

        SearchTaskHistoryCapsuleDto capsuleDto = new SearchTaskHistoryCapsuleDto();
        capsuleDto.setStartDate(LocalDate.of(2022, 4, 11));
        capsuleDto.setEndDate(LocalDate.of(2024, 8, 18));
        capsuleDto.setKeywords("検索語");

        Map<Integer, PeriodLocalDateCapsuleDtoInterface> map = logic.practice(capsuleDto);

        assertEquals(3, map.size());

        // 2022年(検索期間は年末まで)
        PeriodLocalDateCapsuleDtoInterface dto2022 = map.get(2022);
        assertTrue(dto2022 instanceof SearchTaskHistoryCapsuleDto);
        assertEquals(LocalDate.of(2022, 4, 11), dto2022.getStartDate());
        assertEquals(LocalDate.of(2022, 12, 31), dto2022.getEndDate());

        if (dto2022 instanceof SearchTaskHistoryCapsuleDto) {
            // キャストしてinterface以外の値が保たれていること
            SearchTaskHistoryCapsuleDto ansDto = (SearchTaskHistoryCapsuleDto) dto2022;
            assertEquals("検索語", ansDto.getKeywords());
        } else {
            fail("元の型が維持できていません");
        }

        // 2023年(1年分検索)
        PeriodLocalDateCapsuleDtoInterface dto2023 = map.get(2023);
        assertTrue(dto2023 instanceof SearchTaskHistoryCapsuleDto);
        assertEquals(LocalDate.of(2023, 1, 1), dto2023.getStartDate());
        assertEquals(LocalDate.of(2023, 12, 31), dto2023.getEndDate());

        if (dto2023 instanceof SearchTaskHistoryCapsuleDto) {
            // キャストしてinterface以外の値が保たれていること
            SearchTaskHistoryCapsuleDto ansDto = (SearchTaskHistoryCapsuleDto) dto2023;
            assertEquals("検索語", ansDto.getKeywords());
        } else {
            fail("元の型が維持できていません");
        }

        // 2024年(年始は1月1日から)
        PeriodLocalDateCapsuleDtoInterface dto2024 = map.get(2024);
        assertTrue(dto2024 instanceof SearchTaskHistoryCapsuleDto);
        assertEquals(LocalDate.of(2024, 1, 1), dto2024.getStartDate());
        assertEquals(LocalDate.of(2024, 8, 18), dto2024.getEndDate());

        if (dto2024 instanceof SearchTaskHistoryCapsuleDto) {
            // キャストしてinterface以外の値が保たれていること
            SearchTaskHistoryCapsuleDto ansDto = (SearchTaskHistoryCapsuleDto) dto2024;
            assertEquals("検索語", ansDto.getKeywords());
        } else {
            fail("元の型が維持できていません");
        }
    }

}
