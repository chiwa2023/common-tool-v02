package net.seijishikin.jp.normalize.common_tool.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * ユーザ最低限Dto
 */
public class LeastUserDto implements DtoEntityInitialValueInterface, Serializable { // NOPMD DataClass

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /** ユーザId */
    private Integer userPersonId = INIT_INTEGER;

    /** ユーザコード */
    private Integer userPersonCode = INIT_INTEGER;

    /** ユーザ姓名 */
    private String userPersonName = INIT_STRING;

    /** 権限リスト */
    private List<String> listRoles = new ArrayList<>();

    /**
     * ユーザIdを取得する
     *
     * @return ユーザId
     */
    public Integer getUserPersonId() {
        return userPersonId;
    }

    /**
     * ユーザIdを設定する
     *
     * @param userPersonId ユーザId
     */
    public void setUserPersonId(final Integer userPersonId) {
        this.userPersonId = userPersonId;
    }

    /**
     * ユーザコードを取得する
     *
     * @return ユーザコード
     */
    public Integer getUserPersonCode() {
        return userPersonCode;
    }

    /**
     * ユーザコードを設定する
     *
     * @param userPersonCode ユーザコード
     */
    public void setUserPersonCode(final Integer userPersonCode) {
        this.userPersonCode = userPersonCode;
    }

    /**
     * ユーザ姓名を取得する
     *
     * @return ユーザ姓名
     */
    public String getUserPersonName() {
        return userPersonName;
    }

    /**
     * ユーザ姓名を設定する
     *
     * @param userPersonName ユーザ姓名
     */
    public void setUserPersonName(final String userPersonName) {
        this.userPersonName = userPersonName;
    }

    /**
     * 権限リストを取得する
     *
     * @return 権限リスト
     */
    public List<String> getListRoles() {
        return listRoles;
    }

    /**
     * 権限リストを設定する
     *
     * @param listRoles 権限リスト
     */
    public void setListRoles(final List<String> listRoles) {
        this.listRoles = listRoles;
    }

}
