package net.seijishikin.jp.normalize.common_tool.utils;

import java.time.LocalDate;
import java.time.chrono.JapaneseDate;
import java.time.chrono.JapaneseEra;
import java.util.Objects;

/**
 * 和暦から西暦日付に変更する
 */
public final class ConvertWarekiToSeirekiUtil {

    /** 和暦年桁終了位置 */
    private final static int DIGIT_END_YEAR = 2;
    /** 和暦月桁終了位置 */
    private final static int DIGIT_END_MONTH = 4;
    /** 和暦日桁終了位置 */
    private final static int DIGIT_END_DAY = 6;

    private ConvertWarekiToSeirekiUtil() {

    }

    /**
     * 和暦文字列をLoacalDateに変換する
     *
     * @param wareki 和暦文字列
     * @return ローカル日付
     */
    public static LocalDate practice(final String wareki) {

        // nullは処理できません
        if (Objects.isNull(wareki)) {
            throw new IllegalArgumentException("和暦文字列がnullです");
        }

        // 年月日がそろっていないと処理できません
        final int warekiDigit = 6;
        if (warekiDigit != wareki.length()) {
            throw new IllegalArgumentException("和暦文字列がYYMMDD形式(6文字)ではありません");
        }

        // 年月日を揃える
        int year = Integer.parseInt(wareki.substring(0, DIGIT_END_YEAR));
        int month = Integer.parseInt(wareki.substring(DIGIT_END_YEAR, DIGIT_END_MONTH));
        int date = Integer.parseInt(wareki.substring(DIGIT_END_MONTH, DIGIT_END_DAY));

        JapaneseEra[] eraGroup = JapaneseEra.values();

        JapaneseDate japaneseDateLast = JapaneseDate.of(eraGroup[eraGroup.length - 1], year, month, date);
        JapaneseDate japaneseDatePreLast = JapaneseDate.of(eraGroup[eraGroup.length - 2], year, month, date);

        long nowDateLong = JapaneseDate.now().toEpochDay();

        JapaneseDate japaneseDate;

        // TODO より良いロジックがあれば修正する
        // 現在日付と最新元号、ひとつ前の元号の日付の差が近い方が蓋然性が高いという論理
        // ex.令和3年段階で4年を指定する→まぁ平成4年を指していることはないよね?
        // ex.令和26年段階で27年を指定する→(1年の差である)令和27年←手形の振替日など将来日付は想定しなければならないので、これで大丈夫かな?
        // ex.令和04年段階で30年を指定する→(5年の差である)平成30年←この場合令和30年を指定していると可能性は低いという【推定】
        // 現段階で思いつくダメな例
        // 令和15-16年に30年近辺を指定すると、タイミングによっては平成30年が推定される
        // というか、超確率低いとはいえ、在位2年の元号が連続して存在したら、
        // 元号を指定しないデータ形式である限り何をどうしようとバッティングしてパニック・・・
        if (Math.abs(nowDateLong - japaneseDateLast.toEpochDay()) < Math
                .abs(nowDateLong - japaneseDatePreLast.toEpochDay())) {
            japaneseDate = japaneseDateLast;
        } else {
            japaneseDate = japaneseDatePreLast;
        }

        return LocalDate.from(japaneseDate);
    }
}
