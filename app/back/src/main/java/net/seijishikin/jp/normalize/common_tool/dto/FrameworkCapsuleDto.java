package net.seijishikin.jp.normalize.common_tool.dto;

import java.io.Serializable;

/**
 * (Frameworkという名称だが実態は仮)CapsuleDto
 */
public class FrameworkCapsuleDto implements Serializable {

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /** 最小限ユーザDto */
    private LeastUserDto userDto = new LeastUserDto();

    /**
     * 最小限ユーザDtoを取得する
     *
     * @return 最小限ユーザDto
     */
    public LeastUserDto getUserDto() {
        return userDto;
    }

    /**
     * 最小限ユーザDtoを設定する
     *
     * @param userDto 最小限ユーザDto
     */
    public void setUserDto(final LeastUserDto userDto) {
        this.userDto = userDto;
    }

}
