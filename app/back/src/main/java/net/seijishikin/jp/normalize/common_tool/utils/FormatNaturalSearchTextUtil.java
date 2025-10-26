package net.seijishikin.jp.normalize.common_tool.utils;

import java.text.Normalizer;
import java.util.Locale;
import java.util.Objects;

import org.springframework.stereotype.Component;

/**
 * 全文検索に適した比較対象テキストに成形する
 */
@Component
public class FormatNaturalSearchTextUtil {

    /** 空文字 */
    private static final String BLANK = "";

    /**
     * 成形処理を行う。現在の処理は空白削除、小文字化
     *
     * @param data 登録予定文字列
     * @return フォーマット後文字列
     */
    public String practice(final String data) {

        // なんかの都合でnullがきても空文字でおかえりいただく
        if (Objects.isNull(data)) {
            return BLANK;
        }

        // スペース削除
        String answer = data.replaceAll(" ", BLANK).replaceAll("　", BLANK);

        // JavaのNormalizerを使用全大文字英数→半小文字英数。
        return Normalizer.normalize(answer, Normalizer.Form.NFKC).toLowerCase(Locale.JAPANESE);
    }
}
