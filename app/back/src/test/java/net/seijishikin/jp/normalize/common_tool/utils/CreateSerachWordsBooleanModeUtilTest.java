package net.seijishikin.jp.normalize.common_tool.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

/**
 * CreateSerachWordsBooleanModeLogic単体テスト
 */
class CreateSerachWordsBooleanModeUtilTest {

    @Test
    @Tag("NaturalTextSearch")
    void testPractice() {

        CreateSerachWordsBooleanModeUtil createSerachWordsBooleanModeLogic = new CreateSerachWordsBooleanModeUtil();

        // 検索条件を指定しない場合は空文字を検索条件とします(検索結果が返りません)
        assertEquals("", createSerachWordsBooleanModeLogic.practice(null));
        assertEquals("", createSerachWordsBooleanModeLogic.practice(""));

        // 一単語だけの場合はその単語の制限を行う
        assertEquals("+パーティ", createSerachWordsBooleanModeLogic.practice("パーティ"));

        // 全角空白と半角スペースが混在している、あるある状態。単語語での区切りを作成
        assertEquals("+漢字1 +漢字2 +漢字3", createSerachWordsBooleanModeLogic.practice("漢字1　漢字2 漢字3"));

        // ()による構造化内の空白は+を付加すべき単語区切りとみなしません
        assertEquals("+漢字1 +(<漢字2 漢字3)", createSerachWordsBooleanModeLogic.practice("漢字1 (<漢字2 漢字3)"));

        // ()が入れ子構造でも機能します
        assertEquals("+漢字1 +(<漢字2 (漢字3 <カタカナ4))",
                createSerachWordsBooleanModeLogic.practice("漢字1 (<漢字2 (漢字3 <カタカナ4))"));

        // ()の数があっていない場合は仮でかっこを抹消する
        assertEquals("+漢字1 <漢字2 +漢字3 <カタカナ4", createSerachWordsBooleanModeLogic.practice("漢字1 (<漢字2 漢字3 <カタカナ4))"));

        // "演算子は除去する。検索対象カラムに空白を入れていないため 1)'"abcd"' は '+abcd'である、2)'"ab cd"'は絶対ヒットしない、ため
        assertEquals("+パーティ +東京", createSerachWordsBooleanModeLogic.practice("\"パーティ 東京\""));

        // すでに+演算子が付加されている場合には変更しない
        assertEquals("+パーティ", createSerachWordsBooleanModeLogic.practice("+パーティ"));

        // すでに-演算子が付加されている場合には変更しない
        assertEquals("-パーティ", createSerachWordsBooleanModeLogic.practice("-パーティ"));

        // 単語の中間に演算子が存在しても影響は受けません(記号は検索に？との噂も)
        assertEquals("+漢字1 +漢字+2 +漢字3", createSerachWordsBooleanModeLogic.practice("漢字1　漢字+2 漢字3"));

        // @distance演算子はInnoDBしか機能しないので削除する
        assertEquals("+漢字1 +漢字2 +漢字3", createSerachWordsBooleanModeLogic.practice("漢字1　@distance漢字2 漢字3"));

        // @でスタートしても通常通り扱う(実装の都合によるケース分け)
        assertEquals("+漢字1 +@mail漢字2 +漢字3", createSerachWordsBooleanModeLogic.practice("漢字1　@mail漢字2 漢字3"));

        // すでに~演算子が付加されている場合には変更しない
        assertEquals("+漢字1 ~漢字2 +漢字3", createSerachWordsBooleanModeLogic.practice("漢字1　~漢字2 漢字3"));

        // *演算子は+演算子を付加する
        assertEquals("+漢字1 +*漢字2 +漢字3", createSerachWordsBooleanModeLogic.practice("漢字1　*漢字2 漢字3"));

        // すでに+演算子と-演算子は末尾でも機能するので付加しない
        assertEquals("パーティ+", createSerachWordsBooleanModeLogic.practice("パーティ+"));
        assertEquals("パーティ-", createSerachWordsBooleanModeLogic.practice("パーティ-"));

    }

}
