package net.seijishikin.jp.normalize.common_tool.dto.input;

import java.io.Serializable;
import net.seijishikin.jp.normalize.common_tool.dto.DtoEntityInitialValueInterface;

/**
 * 団体名Dto
 */
public class InputOrgNameDto // NOPMD DataClass
        implements Serializable, DtoEntityInitialValueInterface {

    private static final long serialVersionUID = 1L;

    /** 団体名かな */
    private String orgNameKana = INIT_STRING;

    /** 団体名 */
    private String orgName = INIT_STRING;

    /**
     * 団体名かなを取得する。
     * 
     * @return 団体名かな
     */
    public String getOrgNameKana() {
        return orgNameKana;
    }

    /**
     * 団体名かなを設定する。
     * 
     * @param orgNameKana 団体名かな
     */
    public void setOrgNameKana(final String orgNameKana) {
        this.orgNameKana = orgNameKana;
    }

    /**
     * 団体名を取得する。
     * 
     * @return 団体名
     */
    public String getOrgName() {
        return orgName;
    }

    /**
     * 団体名を設定する。
     * 
     * @param orgName 団体名
     */
    public void setOrgName(final String orgName) {
        this.orgName = orgName;
    }
}