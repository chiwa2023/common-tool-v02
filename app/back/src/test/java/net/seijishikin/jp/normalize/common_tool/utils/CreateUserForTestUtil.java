package net.seijishikin.jp.normalize.common_tool.utils;

import net.seijishikin.jp.normalize.common_tool.dto.LeastUserDto;

/**
 * テスト用ユーザ作成Util
 */
public final class CreateUserForTestUtil {

    /**
     * コンストラクタ
     */
    private CreateUserForTestUtil() {

    }

    /**
     * 処理を行う
     *
     * @return 最低限ユーザ
     */
    public static LeastUserDto practice() {
        final int testId = 133;
        final int testCode = 124;
        LeastUserDto userDto = new LeastUserDto();
        userDto.setUserPersonId(testId); //
        userDto.setUserPersonCode(testCode);
        userDto.setUserPersonName("テスト　太郎");

        return userDto;
    }

}
