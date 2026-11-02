package net.seijishikin.jp.normalize.common_tool.dto.kanrensha;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import net.seijishikin.jp.normalize.common_tool.dto.DtoEntityInitialValueInterface;

/**
 * kanrensha_seijidantai_master接続用Entity
 */
@Entity
public class KanrenshaSeijidantaiMasterDto // NOPMD DataClass
        implements Serializable, DtoEntityInitialValueInterface {

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /**
     * コンストラクタ
     */
    public KanrenshaSeijidantaiMasterDto() {
        super();
    }

    /**
     * コンストラクタ
     * 
     * @param kanrenshaSeijidantaiMasterId kanrenshaSeijidantaiMasterId
     * @param seijidantaiKanrenshaCode     seijidantaiKanrenshaCode
     * @param poliOrgNo                    poliOrgNo
     * @param isLatest                     isLatest
     * @param kanrenshaName                kanrenshaName
     * @param allAddress                   allAddress
     * @param seijidantaiDelegate          seijidantaiDelegate
     * @param dantaiKbn                    dantaiKbn
     * @param compareNameText              compareNameText
     * @param insertUserId                 insertUserId
     * @param insertUserCode               insertUserCode
     * @param insertUserName               insertUserName
     * @param insertTimestamp              insertTimestamp
     * @param deleteUserId                 deleteUserId
     * @param deleteUserCode               deleteUserCode
     * @param deleteUserName               deleteUserName
     * @param deleteTimestamp              deleteTimestamp
     */
    public KanrenshaSeijidantaiMasterDto(final Integer kanrenshaSeijidantaiMasterId,
            final String seijidantaiKanrenshaCode, final String poliOrgNo, final Byte isLatest,
            final String kanrenshaName, final String allAddress, final String seijidantaiDelegate,
            final String dantaiKbn, final String compareNameText, final Integer insertUserId,
            final Integer insertUserCode, final String insertUserName, final LocalDateTime insertTimestamp,
            final Integer deleteUserId, final Integer deleteUserCode, final String deleteUserName,
            final LocalDateTime deleteTimestamp) {
        super();
        this.kanrenshaSeijidantaiMasterId = kanrenshaSeijidantaiMasterId;
        this.seijidantaiKanrenshaCode = seijidantaiKanrenshaCode;
        this.poliOrgNo = poliOrgNo;
        this.kanrenshaName = kanrenshaName;
        this.allAddress = allAddress;
        this.seijidantaiDelegate = seijidantaiDelegate;
        this.dantaiKbn = dantaiKbn;
        this.compareNameText = compareNameText;
    }

    /** テーブルId */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kanrensha_seijidantai_master_id")
    private Integer kanrenshaSeijidantaiMasterId = INIT_INTEGER;

    /**
     * テーブルIdを取得する
     *
     * @return テーブルId
     */
    public Integer getKanrenshaSeijidantaiMasterId() {
        return kanrenshaSeijidantaiMasterId;
    }

    /**
     * テーブルIdを設定する
     *
     * @param kanrenshaSeijidantaiMasterId テーブルId
     */
    public void setKanrenshaSeijidantaiMasterId(final Integer kanrenshaSeijidantaiMasterId) {
        this.kanrenshaSeijidantaiMasterId = kanrenshaSeijidantaiMasterId;
    }

    /** 政治団体関連者コード */
    @Column(name = "seijidantai_kanrensha_code")
    private String seijidantaiKanrenshaCode = INIT_STRING;

    /**
     * 政治団体関連者コードを取得する
     *
     * @return 政治団体関連者コード
     */
    public String getSeijidantaiKanrenshaCode() {
        return seijidantaiKanrenshaCode;
    }

    /**
     * 政治団体関連者コードを設定する
     *
     * @param seijidantaiKanrenshaCode 政治団体関連者コード
     */
    public void setSeijidantaiKanrenshaCode(final String seijidantaiKanrenshaCode) {
        this.seijidantaiKanrenshaCode = seijidantaiKanrenshaCode;
    }

    /** 政治団体番号 */
    @Column(name = "poli_org_no")
    private String poliOrgNo = INIT_STRING;

    /**
     * 政治団体番号を取得する
     *
     * @return 政治団体番号
     */
    public String getPoliOrgNo() {
        return poliOrgNo;
    }

    /**
     * 政治団体番号を設定する
     *
     * @param poliOrgNo 政治団体番号
     */
    public void setPoliOrgNo(final String poliOrgNo) {
        this.poliOrgNo = poliOrgNo;
    }

    /** 企業・団体名 */
    @Column(name = "kanrensha_name")
    private String kanrenshaName = INIT_STRING;

    /**
     * 企業・団体名を取得する
     *
     * @return 企業・団体名
     */
    public String getKanrenshaName() {
        return kanrenshaName;
    }

    /**
     * 企業・団体名を設定する
     *
     * @param kanrenshaName 企業・団体名
     */
    public void setKanrenshaName(final String kanrenshaName) {
        this.kanrenshaName = kanrenshaName;
    }

    /** 企業・団体全住所 */
    @Column(name = "all_address")
    private String allAddress = INIT_STRING;

    /**
     * 企業・団体全住所を取得する
     *
     * @return 企業・団体全住所
     */
    public String getAllAddress() {
        return allAddress;
    }

    /**
     * 企業・団体全住所を設定する
     *
     * @param allAddress 企業・団体全住所
     */
    public void setAllAddress(final String allAddress) {
        this.allAddress = allAddress;
    }

    /** 企業・団体代表者 */
    @Column(name = "seijidantai_delegate")
    private String seijidantaiDelegate = INIT_STRING;

    /**
     * 企業・団体代表者を取得する
     *
     * @return 企業・団体代表者
     */
    public String getSeijidantaiDelegate() {
        return seijidantaiDelegate;
    }

    /**
     * 企業・団体代表者を設定する
     *
     * @param seijidantaiDelegate 企業・団体代表者
     */
    public void setSeijidantaiDelegate(final String seijidantaiDelegate) {
        this.seijidantaiDelegate = seijidantaiDelegate;
    }

    /** 政治団体区分 */
    @Column(name = "dantai_kbn")
    private String dantaiKbn = INIT_STRING;

    /**
     * 政治団体区分を取得する
     *
     * @return 政治団体区分
     */
    public String getDantaiKbn() {
        return dantaiKbn;
    }

    /**
     * 政治団体区分を設定する
     *
     * @param dantaiKbn 政治団体区分
     */
    public void setDantaiKbn(final String dantaiKbn) {
        this.dantaiKbn = dantaiKbn;
    }

    /** 名称比較用 */
    @Column(name = "compare_name_text")
    private String compareNameText = INIT_STRING;

    /**
     * 名称比較用を取得する
     *
     * @return 名称比較用
     */
    public String getCompareNameText() {
        return compareNameText;
    }

    /**
     * 名称比較用を設定する
     *
     * @param compareNameText 名称比較用
     */
    public void setCompareNameText(final String compareNameText) {
        this.compareNameText = compareNameText;
    }

}
