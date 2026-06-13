package net.seijishikin.jp.normalize.common_tool.dto.select_options;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

/**
 * 選択肢値文字列Dto
 */
public class SelectOptionStringDto implements Serializable { // NOPMD DataClass

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /**
     * コンストラクタ
     *
     * @param value 選択肢の値
     * @param text  選択肢表示テキスト
     */
    public SelectOptionStringDto(final String value, final String text) {
        super();
        this.value = value;
        this.text = text;
    }

    /** 選択肢値 */
    @Id
    @Column(name = "value")
    private String value;

    /** 選択肢表示テキスト */
    @Column(name = "text")
    private String text;

    /**
     * 値を取得する
     *
     * @return 値
     */
    public String getValue() {
        return value;
    }

    /**
     * 値を設定する
     *
     * @param value 値
     */
    public void setValue(final String value) {
        this.value = value;
    }

    /**
     * 表示テキストを取得する
     *
     * @return 表示テキスト
     */
    public String getText() {
        return text;
    }

    /**
     * 表示テキストを設定する
     *
     * @param text 表示テキスト
     */
    public void setText(final String text) {
        this.text = text;
    }

}
