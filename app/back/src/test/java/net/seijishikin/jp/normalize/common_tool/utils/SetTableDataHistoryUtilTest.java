package net.seijishikin.jp.normalize.common_tool.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.HeuristicCompletionException;

import net.seijishikin.jp.normalize.common_tool.dto.LeastUserDto;

/**
 * SetTableDataHistoryUtil単体テスト
 */
class SetTableDataHistoryUtilTest {

    @Test
    @Tag("TableTruncate")
    void testInsert() {

        SetTableDataHistoryUtil util = new SetTableDataHistoryUtil();

        LeastUserDto userDto = CreateUserForTestUtil.practice();
        SetTableDataHistoryUtilTestEntity entity00 = new SetTableDataHistoryUtilTestEntity();
        util.practiceInsert(userDto, entity00);

        // insertにUserが最新で登録されていること
        assertEquals(userDto.getUserPersonId(), entity00.getInsertUserId());
        assertEquals(userDto.getUserPersonCode(), entity00.getInsertUserCode());
        assertEquals(userDto.getUserPersonName(), entity00.getInsertUserName());
        assertEquals(SetTableDataHistoryUtil.INSERT_STATE, entity00.getIsLatest());
    }

    @Test
    @Tag("TableTruncate")
    void testDelete() {

        SetTableDataHistoryUtilTestEntity entity00 = new SetTableDataHistoryUtilTestEntity();

        final int insertId = 246;
        final int insertCode = 231;
        final String insertName = "管理者　次郎";
        entity00.setInsertUserId(insertId);
        entity00.setInsertUserCode(insertCode);
        entity00.setInsertUserName(insertName);

        SetTableDataHistoryUtil util = new SetTableDataHistoryUtil();

        LeastUserDto userDto = CreateUserForTestUtil.practice();
        util.practiceDelete(userDto, entity00);

        // insertは入力が保持されていること
        assertEquals(insertId, entity00.getInsertUserId());
        assertEquals(insertCode, entity00.getInsertUserCode());
        assertEquals(insertName, entity00.getInsertUserName());

        // deleteにUserが履歴で登録されていること
        assertEquals(userDto.getUserPersonId(), entity00.getDeleteUserId());
        assertEquals(userDto.getUserPersonCode(), entity00.getDeleteUserCode());
        assertEquals(userDto.getUserPersonName(), entity00.getDeleteUserName());
        assertEquals(SetTableDataHistoryUtil.DELETE_STATE, entity00.getIsLatest());
        
        // すでに削除履歴をもう一度更新しようとすると、例外を返して処理中断(最後の排他確認)
        assertThrows(HeuristicCompletionException.class, () -> util.practiceDelete(userDto, entity00));
    }

}
