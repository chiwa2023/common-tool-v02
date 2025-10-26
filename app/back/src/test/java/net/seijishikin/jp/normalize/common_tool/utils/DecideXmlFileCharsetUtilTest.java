package net.seijishikin.jp.normalize.common_tool.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/**
 * DecideXmlFileCharsetUtil単体テスト
 */
class DecideXmlFileCharsetUtilTest {

    @Test
    @Tag("TableTruncate")
    void testPracticeBalancesheet() throws Exception {

        DecideXmlFileCharsetUtil decideXmlFileCharsetUtil = new DecideXmlFileCharsetUtil();
        final String keyword = "収支報告書作成ソフト";
        Path path00 = Paths.get(GetCurrentResourcePath.getBackTestResourcePath(), "file/balancesheet/judge_sjis.xml");
        assertEquals(Charset.forName("Shift_JIS"), decideXmlFileCharsetUtil.practice(path00, keyword));

        Path path01 = Paths.get(GetCurrentResourcePath.getBackTestResourcePath(), "file/balancesheet/judge_utf-8.xml");
        assertEquals(StandardCharsets.UTF_8, decideXmlFileCharsetUtil.practice(path01, keyword));

        Path path02 = Paths.get(GetCurrentResourcePath.getBackTestResourcePath(), "file/balancesheet/judge_utf-16.xml");
        assertEquals(StandardCharsets.UTF_16, decideXmlFileCharsetUtil.practice(path02, keyword));

        // ファイルが存在しないときはIoException
        assertThrows(IOException.class, () -> decideXmlFileCharsetUtil.practice(Paths.get("存在しないパス"), keyword));

        // 該当文字セットが見当たらないときはnullとする。不用意に読み取りを試みるととすると落ちるのが正解
        // このプロジェクトでは文字コード不明ファイルを一覧化し再アップロードを促す。
        Path path03 = Paths.get(GetCurrentResourcePath.getBackTestResourcePath(), "file/balancesheet/judge_euc-jp.xml");

        assertEquals(null, decideXmlFileCharsetUtil.practice(path03, keyword));
    }

    @Test
    @Tag("TableTruncate")
    void testPracticeUsage() throws Exception {

        DecideXmlFileCharsetUtil decideXmlFileCharsetUtil = new DecideXmlFileCharsetUtil();
        final String keyword = "使途等報告書作成ソフト";

        Path path00 = Paths.get(GetCurrentResourcePath.getBackTestResourcePath(), "file/usage/judge_sjis.xml");
        assertEquals(Charset.forName("Shift_JIS"), decideXmlFileCharsetUtil.practice(path00, keyword));

        Path path01 = Paths.get(GetCurrentResourcePath.getBackTestResourcePath(), "file/usage/judge_utf-8.xml");
        assertEquals(StandardCharsets.UTF_8, decideXmlFileCharsetUtil.practice(path01, keyword));

        Path path02 = Paths.get(GetCurrentResourcePath.getBackTestResourcePath(), "file/usage/judge_utf-16.xml");
        assertEquals(StandardCharsets.UTF_16, decideXmlFileCharsetUtil.practice(path02, keyword));

        // ファイルが存在しないときはIoException
        assertThrows(IOException.class, () -> decideXmlFileCharsetUtil.practice(Paths.get("存在しないパス"), keyword));

        // 該当文字セットが見当たらないときはnullとする。不用意に読み取りを試みるととすると落ちるのが正解
        // このプロジェクトでは文字コード不明ファイルを一覧化し再アップロードを促す。
        Path path03 = Paths.get(GetCurrentResourcePath.getBackTestResourcePath(), "file/usage/judge_euc-jp.xml");
        assertEquals(null, decideXmlFileCharsetUtil.practice(path03, keyword));

    }

}
