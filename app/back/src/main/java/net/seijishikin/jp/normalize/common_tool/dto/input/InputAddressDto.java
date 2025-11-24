package net.seijishikin.jp.normalize.common_tool.dto.input;

import java.io.Serializable;
import net.seijishikin.jp.normalize.common_tool.dto.DtoEntityInitialValueInterface;

/**
 * 住所入力Dto
 */
public class InputAddressDto // NOPMD DataClass
        implements Serializable, DtoEntityInitialValueInterface {

    private static final long serialVersionUID = 1L;

    /** 住所全体 */
    private String addressAll = INIT_STRING;
    /** 元住所全体 */
    private String orginAddressAll = INIT_STRING;
    /** 郵便番号1 */
    private String postalcode1 = INIT_STRING;
    /** 郵便番号2 */
    private String postalcode2 = INIT_STRING;
    /** 住所郵便番号まで */
    private String addressPostal = INIT_STRING;
    /** 住所番地 */
    private String addressBlock = INIT_STRING;
    /** 住所建物 */
    private String addressBuilding = INIT_STRING;

    /** 地方公共団体コード */
    private String lgCode = INIT_STRING;
    /** 町字Id */
    private String machiazaId = INIT_STRING;
    /** 街区Id */
    private String blkId = INIT_STRING;
    /** 地番Id */
    private String prcId = INIT_STRING;
    /** 住居Id */
    private String rsdtId = INIT_STRING;
    /** 住居2Id */
    private String rsdt2Id = INIT_STRING;

    /** 住所郵便番号まで編集有無 */
    private Boolean isPostalEdit = INIT_BOOLEAN;
    /** 住所番地編集有無 */
    private Boolean isBlockEdit = INIT_BOOLEAN;
    /** 住所建物編集有無 */
    private Boolean isBuildingEdit = INIT_BOOLEAN;

    /**
     * 住所全体を取得する。
     * 
     * @return 住所全体
     */
    public String getAddressAll() {
        return addressAll;
    }

    /**
     * 住所全体を設定する。
     * 
     * @param addressAll 住所全体
     */
    public void setAddressAll(final String addressAll) {
        this.addressAll = addressAll;
    }

    /**
     * 元住所全体を取得する。
     * 
     * @return 元住所全体
     */
    public String getOrginAddressAll() {
        return orginAddressAll;
    }

    /**
     * 元住所全体を設定する。
     * 
     * @param orginAddressAll 元住所全体
     */
    public void setOrginAddressAll(final String orginAddressAll) {
        this.orginAddressAll = orginAddressAll;
    }

    /**
     * 郵便番号1を取得する。
     * 
     * @return 郵便番号1
     */
    public String getPostalcode1() {
        return postalcode1;
    }

    /**
     * 郵便番号1を設定する。
     * 
     * @param postalcode1 郵便番号1
     */
    public void setPostalcode1(final String postalcode1) {
        this.postalcode1 = postalcode1;
    }

    /**
     * 郵便番号2を取得する。
     * 
     * @return 郵便番号2
     */
    public String getPostalcode2() {
        return postalcode2;
    }

    /**
     * 郵便番号2を設定する。
     * 
     * @param postalcode2 郵便番号2
     */
    public void setPostalcode2(final String postalcode2) {
        this.postalcode2 = postalcode2;
    }

    /**
     * 住所郵便番号まで1を取得する。
     * 
     * @return 住所郵便番号まで1
     */
    public String getAddressPostal() {
        return addressPostal;
    }

    /**
     * 住所郵便番号まで1を設定する。
     * 
     * @param addressPostal 住所郵便番号まで1
     */
    public void setAddressPostal(final String addressPostal) {
        this.addressPostal = addressPostal;
    }

    /**
     * 住所番地を取得する。
     * 
     * @return 住所番地
     */
    public String getAddressBlock() {
        return addressBlock;
    }

    /**
     * 住所番地を設定する。
     * 
     * @param addressBlock 住所番地
     */
    public void setAddressBlock(final String addressBlock) {
        this.addressBlock = addressBlock;
    }

    /**
     * 住所建物を取得する。
     * 
     * @return 住所建物
     */
    public String getAddressBuilding() {
        return addressBuilding;
    }

    /**
     * 住所建物を設定する。
     * 
     * @param addressBuilding 住所建物
     */
    public void setAddressBuilding(final String addressBuilding) {
        this.addressBuilding = addressBuilding;
    }

    /**
     * 地方公共団体コードを取得する。
     * 
     * @return 地方公共団体コード
     */
    public String getLgCode() {
        return lgCode;
    }

    /**
     * 地方公共団体コードを設定する。
     * 
     * @param lgCode 地方公共団体コード
     */
    public void setLgCode(final String lgCode) {
        this.lgCode = lgCode;
    }

    /**
     * 町字Idを取得する。
     * 
     * @return 町字Id
     */
    public String getMachiazaId() {
        return machiazaId;
    }

    /**
     * 町字Idを設定する。
     * 
     * @param machiazaId 町字Id
     */
    public void setMachiazaId(final String machiazaId) {
        this.machiazaId = machiazaId;
    }

    /**
     * 街区Idを取得する。
     * 
     * @return 街区Id
     */
    public String getBlkId() {
        return blkId;
    }

    /**
     * 街区Idを設定する。
     * 
     * @param blkId 街区Id
     */
    public void setBlkId(final String blkId) {
        this.blkId = blkId;
    }

    /**
     * 住居Idを取得する。
     * 
     * @return 住居Id
     */
    public String getRsdtId() {
        return rsdtId;
    }

    /**
     * 住居Idを設定する。
     * 
     * @param rsdtId 住居Id
     */
    public void setRsdtId(final String rsdtId) {
        this.rsdtId = rsdtId;
    }

    /**
     * 地番Idを取得する
     * 
     * @return 地番Id
     */
    public String getPrcId() {
        return prcId;
    }

    /**
     * 地番Idを設定する
     * 
     * @param prcId 地番Id
     */
    public void setPrcId(final String prcId) {
        this.prcId = prcId;
    }

    /**
     * 住居2Idを取得する
     * 
     * @return 住居2Id
     */
    public String getRsdt2Id() {
        return rsdt2Id;
    }

    /**
     * 住居2Idを設定する
     * 
     * @param rsdt2Id 住居2Id
     */
    public void setRsdt2Id(final String rsdt2Id) {
        this.rsdt2Id = rsdt2Id;
    }

    /**
     * 住所郵便番号まで編集有無
     * 
     * @return 住所郵便番号まで編集有無
     */
    public Boolean getIsPostalEdit() {
        return isPostalEdit;
    }

    /**
     * 住所郵便番号まで編集有無
     * 
     * @param isPostalEdit 住所郵便番号まで編集有無
     */
    public void setIsPostalEdit(final Boolean isPostalEdit) {
        this.isPostalEdit = isPostalEdit;
    }

    /**
     * 住所番地編集有無
     * 
     * @return 住所番地編集有無
     */
    public Boolean getIsBlockEdit() {
        return isBlockEdit;
    }

    /**
     * 住所番地編集有無
     * 
     * @param isBlockEdit 住所番地編集有無
     */
    public void setIsBlockEdit(final Boolean isBlockEdit) {
        this.isBlockEdit = isBlockEdit;
    }

    /**
     * 住所建物編集有無
     * 
     * @return 住所建物編集有無
     */
    public Boolean getIsBuildingEdit() {
        return isBuildingEdit;
    }

    /**
     * 住所建物編集有無
     * 
     * @param isBuildingEdit 住所建物編集有無
     */
    public void setIsBuildingEdit(final Boolean isBuildingEdit) {
        this.isBuildingEdit = isBuildingEdit;
    }

}