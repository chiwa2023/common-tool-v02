package net.seijishikin.jp.normalize.common_tool.utils;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import net.seijishikin.jp.normalize.common_tool.dto.DtoEntityInitialValueInterface;

/**
 * DateConvertUtil単体テスト
 */
class DateConvertUtilTest {
    // CHECKSTYLE:OFF MagicNumber

    @Test
    @Tag("TableTruncate")
    void testPracticeWarekiToLocalDate() throws Exception {

        DateConvertUtil dateConvertUtil = new DateConvertUtil();
        // 正常処理
        assertEquals(LocalDate.of(2022, 12, 1), dateConvertUtil.practiceWarekiToLocalDate("R4/12/1"));

        // 空文字=初期処理の場合は初期値を返す
        assertEquals(DtoEntityInitialValueInterface.INIT_DATE, dateConvertUtil.practiceWarekiToLocalDate(""));

        // 文字列が和暦短縮形でない
        assertThrows(DateTimeParseException.class, () -> dateConvertUtil.practiceWarekiToLocalDate("2022.12.01"));
    }

    @Test
    @Tag("TableTruncate")
    void testPracticeLocalDateToWareki() throws Exception {

        DateConvertUtil dateConvertUtil = new DateConvertUtil();
        assertEquals("R4/12/1", dateConvertUtil.practiceLocalDateToWareki(LocalDate.of(2022, 12, 1)));
    }

}
