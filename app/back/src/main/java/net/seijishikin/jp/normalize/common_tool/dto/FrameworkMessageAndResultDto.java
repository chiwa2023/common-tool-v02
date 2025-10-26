package net.seijishikin.jp.normalize.common_tool.dto;

/**
 * メッセージと処理結果フラグを持つ処理結果のみ返却Dto
 */
public class FrameworkMessageAndResultDto // NOPMD DataClass
        implements DtoEntityInitialValueInterface {

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /** 出力メッセージ */
    private String message = INIT_STRING;

    /** 処理失敗フラグ */
    private Boolean isFailure = INIT_BOOLEAN;

    /**
     * メッセージを取得する
     */
    public String getMessage() {
        return message;
    }

    /**
     * メッセージを設定
     */
    public void setMessage(final String message) {
        this.message = message;
    }

    /**
     * 処理結果失敗フラグを取得する
     */
    public Boolean getIsFailure() {
        return isFailure;
    }

    /**
     * 処理結果失敗フラグを設定する
     */
    public void setIsFailure(final Boolean isFailure) {
        this.isFailure = isFailure;
    }

}
