package net.seijishikin.jp.normalize.common_tool.utils;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/**
 * ConvertWarekiToSeirekiUtil単体テスト
 */
class ConvertWarekiToSeirekiUtilTest {
//CHECKSTYLE:OFF MagicNumber

    @Test
    @Tag("TableTruncate")
    void testPractice() {

        assertThrows(IllegalArgumentException.class, () -> ConvertWarekiToSeirekiUtil.practice(null), "文字列nullは例外");
        assertThrows(IllegalArgumentException.class, () -> ConvertWarekiToSeirekiUtil.practice("abcd"),
                "6文字以外は指定形式ではありません");
        assertThrows(NumberFormatException.class, () -> ConvertWarekiToSeirekiUtil.practice("03xx18"),
                "正常に分割しても数字に変換できなければ例外");
        
        assertEquals(LocalDate.of(2021, 9, 18), ConvertWarekiToSeirekiUtil.practice("030918"));
        assertEquals(LocalDate.of(2016, 9, 18),ConvertWarekiToSeirekiUtil.practice("280918") );
    }

}
