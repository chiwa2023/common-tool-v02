package net.seijishikin.jp.normalize.common_tool.utils;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;
import org.springframework.transaction.HeuristicCompletionException;

import net.seijishikin.jp.normalize.common_tool.dto.LeastUserDto;
import net.seijishikin.jp.normalize.common_tool.entity.AllTabeDataHistoryInterface;

/**
 * テーブルの更新履歴に必要なログインユーザ、更新時間情報をセットする
 */
@Component
public class SetTableDataHistoryUtil {

    /** 最新状態値 */
    public static final boolean INSERT_STATE = true;

    /** 履歴状態値 */
    public static final boolean DELETE_STATE = false;

    /** 未削除判定比較値 */
    LocalDateTime DELETE_LIMIT_TIMESTAMP = LocalDateTime.of(1948, 7, 29, 0, 0, 0); // SUPPRESS CHECKSTYLE MagicNumber

    /**
     * データ履歴カラムにデータを入力する
     *
     * @param userDto        ユーザDto
     * @param interfaceImple データ履歴カラムInterface
     */
    public void practiceInsert(final LeastUserDto userDto, final AllTabeDataHistoryInterface interfaceImple) {

        LocalDateTime timestamp = LocalDateTime.now();

        // Insert(初回)データセット
        interfaceImple.setIsLatest(INSERT_STATE);
        interfaceImple.setInsertUserId(userDto.getUserPersonId());
        interfaceImple.setInsertUserCode(userDto.getUserPersonCode());
        interfaceImple.setInsertUserName(userDto.getUserPersonName());
        interfaceImple.setInsertTimestamp(timestamp);
    }

    /**
     * データ履歴カラムにデータを入力する
     *
     * @param userDto        ユーザDto
     * @param interfaceImple データ履歴カラムInterface
     */
    public void practiceDelete(final LeastUserDto userDto, final AllTabeDataHistoryInterface interfaceImple) {

        // 変更前にすでに履歴になっている場合は、排他の失敗として作業を中断する
        if (DELETE_LIMIT_TIMESTAMP.isBefore(interfaceImple.getDeleteTimestamp())) {
            throw new HeuristicCompletionException(HeuristicCompletionException.STATE_UNKNOWN,
                    new Exception("このデータを変更したユーザがいました。更新内容を確認した後、必要に応じて再度編集をしてください")); // NOPMD
        }

        LocalDateTime timestamp = LocalDateTime.now();

        // Delete(無効)データセット
        interfaceImple.setIsLatest(DELETE_STATE);
        interfaceImple.setDeleteUserId(userDto.getUserPersonId());
        interfaceImple.setDeleteUserCode(userDto.getUserPersonCode());
        interfaceImple.setDeleteUserName(userDto.getUserPersonName());
        interfaceImple.setDeleteTimestamp(timestamp);
    }
}
