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

    /** 一般例外メッセージ */
    public static final String MESSAGE_INTERNAL_ERROR = "例外が発生しました。システム担当者にお問い合わせください";

    /** 未取得メッセージ */
    public static final String MESSAGE_NO_CONTENT = "取得しようとした値は存在しませんでした";

    /** 未保存メッセージ */
    public static final String MESSAGE_NO_RECORD = "正常に保存できませんでした";

    /** 正常メッセージ */
    public static final String MESSAGE_EXPECTED = "正常に処理できました";

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
