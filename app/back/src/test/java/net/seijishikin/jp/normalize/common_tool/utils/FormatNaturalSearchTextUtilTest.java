package net.seijishikin.jp.normalize.common_tool.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/**
 * FormatNaturalSearchTextUtil単体テスト
 */
class FormatNaturalSearchTextUtilTest {

    @Test
    @Tag("NaturalTextSearch")
    void testPractice() {

        FormatNaturalSearchTextUtil formatNaturalSearchTextUtil = new FormatNaturalSearchTextUtil();

        // nullでも空文字を返して落とさない
        assertEquals("", formatNaturalSearchTextUtil.practice(null));

        // 半角スペース
        assertEquals("あいうえお", formatNaturalSearchTextUtil.practice("あい うえお"));

        // 全角スペース
        assertEquals("かきくけこ", formatNaturalSearchTextUtil.practice("か　きくけ　こ"));

        // 半角大文字英語
        assertEquals("abcabc", formatNaturalSearchTextUtil.practice("abcABC"));

        // 全角大文字英語数字
        assertEquals("abcabc123", formatNaturalSearchTextUtil.practice("ＡＢＣａｂｃ１２３"));

        // カタカナ全角
        assertEquals("パーティ", formatNaturalSearchTextUtil.practice("パーティ"));

        // カタカナ半角
        assertEquals("パーティ", formatNaturalSearchTextUtil.practice("ﾊﾟｰﾃｨ"));
    }
}
