package net.seijishikin.jp.normalize.common_tool.dto.input;

import java.io.Serializable;
import net.seijishikin.jp.normalize.common_tool.dto.DtoEntityInitialValueInterface;

/**
 * 職業入力Dto
 */
public class InputShokugyouDto // NOPMD DataClass
        implements Serializable, DtoEntityInitialValueInterface {

    private static final long serialVersionUID = 1L;

    /** 職業全表記 */
    private String allShokugyou = INIT_STRING;

    /** 職業の業種 */
    private String gyoushu = INIT_STRING;

    /** 職業の役職 */
    private String yakushoku = INIT_STRING;

    /** ユーザ記述の職業 */
    private String shokugyouUserWrite = INIT_STRING;

    /** 法人番号 */
    private String houjinNo = INIT_STRING;
    /** 法人所在地 */
    private String houjinAddress = INIT_STRING;
    /** 法人名 */
    private String houjinName = INIT_STRING;

    /**
     * 職業全表記を取得する。
     * 
     * @return 職業全表記
     */
    public String getAllShokugyou() {
        return allShokugyou;
    }

    /**
     * 職業全表記を設定する。
     * 
     * @param allShokugyou 職業全表記
     */
    public void setAllShokugyou(final String allShokugyou) {
        this.allShokugyou = allShokugyou;
    }

    /**
     * 職業の業種を取得する。
     * 
     * @return 職業の業種
     */
    public String getGyoushu() {
        return gyoushu;
    }

    /**
     * 職業の業種を設定する。
     * 
     * @param gyoushu 職業の業種
     */
    public void setGyoushu(final String gyoushu) {
        this.gyoushu = gyoushu;
    }

    /**
     * 職業の役職を取得する。
     * 
     * @return 職業の役職
     */
    public String getYakushoku() {
        return yakushoku;
    }

    /**
     * 職業の役職を設定する。
     * 
     * @param yakushoku 職業の役職
     */
    public void setYakushoku(final String yakushoku) {
        this.yakushoku = yakushoku;
    }

    /**
     * ユーザ記述の職業を取得する。
     * 
     * @return ユーザ記述の職業
     */
    public String getShokugyouUserWrite() {
        return shokugyouUserWrite;
    }

    /**
     * ユーザ記述の職業を設定する。
     * 
     * @param shokugyouUserWrite ユーザ記述の職業
     */
    public void setShokugyouUserWrite(final String shokugyouUserWrite) {
        this.shokugyouUserWrite = shokugyouUserWrite;
    }

    /**
     * 法人番号を取得する。
     * 
     * @return 法人番号
     */
    public String getHoujinNo() {
        return houjinNo;
    }

    /**
     * 法人番号を設定する。
     * 
     * @param houjinNo 法人番号
     */
    public void setHoujinNo(final String houjinNo) {
        this.houjinNo = houjinNo;
    }

    /**
     * 法人所在地を取得する。
     * 
     * @return 法人所在地
     */
    public String getHoujinAddress() {
        return houjinAddress;
    }

    /**
     * 法人所在地を設定する。
     * 
     * @param houjinAddress 法人所在地
     */
    public void setHoujinAddress(final String houjinAddress) {
        this.houjinAddress = houjinAddress;
    }

    /**
     * 法人名を取得する。
     * 
     * @return 法人名
     */
    public String getHoujinName() {
        return houjinName;
    }

    /**
     * 法人名を設定する。
     * 
     * @param houjinName 法人名
     */
    public void setHoujinName(final String houjinName) {
        this.houjinName = houjinName;
    }
}
