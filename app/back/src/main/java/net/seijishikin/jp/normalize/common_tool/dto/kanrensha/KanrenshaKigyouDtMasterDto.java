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
 * kanrensha_kigyou_dt_master接続用Entity
 */
@Entity
public class KanrenshaKigyouDtMasterDto // NOPMD DataClass
        implements Serializable, DtoEntityInitialValueInterface {

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /**
     * コンストラクタ
     */
    public KanrenshaKigyouDtMasterDto() {
        super();
    }

    /**
     * コンストラクタ
     * 
     * @param kanrenshaKigyouDtMasterId kanrenshaKigyouDtMasterId
     * @param kigyouDtKanrenshaCode     kigyouDtKanrenshaCode
     * @param houjinNo                  houjinNo
     * @param isLatest                  isLatest
     * @param kanrenshaName             kanrenshaName
     * @param allAddress                allAddress
     * @param kigyouDtDelegate          kigyouDtDelegate
     * @param compareNameText           compareNameText
     * @param insertUserId              insertUserId
     * @param insertUserCode            insertUserCode
     * @param insertUserName            insertUserName
     * @param insertTimestamp           insertTimestamp
     * @param deleteUserId              deleteUserId
     * @param deleteUserCode            deleteUserCode
     * @param deleteUserName            deleteUserName
     * @param deleteTimestamp           deleteTimestamp
     */
    public KanrenshaKigyouDtMasterDto(final Integer kanrenshaKigyouDtMasterId, final String kigyouDtKanrenshaCode,
            final String houjinNo, final Byte isLatest, final String kanrenshaName, final String allAddress,
            final String kigyouDtDelegate, final String compareNameText, final Integer insertUserId,
            final Integer insertUserCode, final String insertUserName, final LocalDateTime insertTimestamp,
            final Integer deleteUserId, final Integer deleteUserCode, final String deleteUserName,
            final LocalDateTime deleteTimestamp) {
        super();
        this.kanrenshaKigyouDtMasterId = kanrenshaKigyouDtMasterId;
        this.kigyouDtKanrenshaCode = kigyouDtKanrenshaCode;
        this.houjinNo = houjinNo;
        this.kanrenshaName = kanrenshaName;
        this.allAddress = allAddress;
        this.kigyouDtDelegate = kigyouDtDelegate;
        this.compareNameText = compareNameText;
    }

    /** テーブルId */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kanrensha_kigyou_dt_master_id")
    private Integer kanrenshaKigyouDtMasterId = INIT_INTEGER;

    /**
     * テーブルIdを取得する
     *
     * @return テーブルId
     */
    public Integer getKanrenshaKigyouDtMasterId() {
        return kanrenshaKigyouDtMasterId;
    }

    /**
     * テーブルIdを設定する
     *
     * @param kanrenshaKigyouDtMasterId テーブルId
     */
    public void setKanrenshaKigyouDtMasterId(final Integer kanrenshaKigyouDtMasterId) {
        this.kanrenshaKigyouDtMasterId = kanrenshaKigyouDtMasterId;
    }

    /** 企業・団体関連者コード */
    @Column(name = "kigyou_dt_kanrensha_code")
    private String kigyouDtKanrenshaCode = INIT_STRING;

    /**
     * 企業・団体関連者コードを取得する
     *
     * @return 企業・団体関連者コード
     */
    public String getKigyouDtKanrenshaCode() {
        return kigyouDtKanrenshaCode;
    }

    /**
     * 企業・団体関連者コードを設定する
     *
     * @param kigyouDtKanrenshaCode 企業・団体関連者コード
     */
    public void setKigyouDtKanrenshaCode(final String kigyouDtKanrenshaCode) {
        this.kigyouDtKanrenshaCode = kigyouDtKanrenshaCode;
    }

    /** 法人番号 */
    @Column(name = "houjin_no")
    private String houjinNo = INIT_STRING;

    /**
     * 法人番号を取得する
     *
     * @return 法人番号
     */
    public String getHoujinNo() {
        return houjinNo;
    }

    /**
     * 法人番号を設定する
     *
     * @param houjinNo 法人番号
     */
    public void setHoujinNo(final String houjinNo) {
        this.houjinNo = houjinNo;
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
    @Column(name = "kigyou_dt_delegate")
    private String kigyouDtDelegate = INIT_STRING;

    /**
     * 企業・団体代表者を取得する
     *
     * @return 企業・団体代表者
     */
    public String getKigyouDtDelegate() {
        return kigyouDtDelegate;
    }

    /**
     * 企業・団体代表者を設定する
     *
     * @param kigyouDtDelegate 企業・団体代表者
     */
    public void setKigyouDtDelegate(final String kigyouDtDelegate) {
        this.kigyouDtDelegate = kigyouDtDelegate;
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
