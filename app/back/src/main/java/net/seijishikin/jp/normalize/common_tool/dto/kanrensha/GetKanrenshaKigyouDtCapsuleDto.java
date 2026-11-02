package net.seijishikin.jp.normalize.common_tool.dto.kanrensha;

import java.io.Serializable;

import net.seijishikin.jp.normalize.common_tool.dto.FrameworkCapsuleDto;

/**
 * 関連者企業団体格納Dto
 */
public class GetKanrenshaKigyouDtCapsuleDto extends FrameworkCapsuleDto implements Serializable {

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /** 関連者企業団体マスタEntity */
    private KanrenshaKigyouDtMasterDto masterKigyouDtEntity = new KanrenshaKigyouDtMasterDto();

    /**
     * 関連者企業団体マスタEntityを取得する
     * 
     * @return 関連者企業団体マスタEntity
     */
    public KanrenshaKigyouDtMasterDto getMasterKigyouDtEntity() {
        return masterKigyouDtEntity;
    }

    /**
     * 関連者企業団体マスタEntityを設定する
     * 
     * @param masterKigyouDtEntity 関連者企業団体マスタEntity
     */
    public void setMasterKigyouDtEntity(final KanrenshaKigyouDtMasterDto masterKigyouDtEntity) {
        this.masterKigyouDtEntity = masterKigyouDtEntity;
    }

}
