package net.seijishikin.jp.normalize.common_tool.dto.kanrensha;

import java.io.Serializable;

import net.seijishikin.jp.normalize.common_tool.dto.FrameworkCapsuleDto;

/**
 * 関連者政治団体格納Dto
 */
public class GetKanrenshaSeijidantaiCapsuleDto extends FrameworkCapsuleDto implements Serializable {

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /** 関連者政治団体マスタEntity */
    private KanrenshaSeijidantaiMasterDto masterSeijidantaiEntity = new KanrenshaSeijidantaiMasterDto();

    /**
     * 関連者政治団体マスタEntityを取得する
     * 
     * @return 関連者政治団体マスタEntity
     */
    public KanrenshaSeijidantaiMasterDto getMasterSeijidantaiEntity() {
        return masterSeijidantaiEntity;
    }

    /**
     * 関連者政治団体マスタEntityを設定する
     * 
     * @param masterSeijidantaiEntity 関連者政治団体マスタEntity
     */
    public void setMasterSeijidantaiEntity(final KanrenshaSeijidantaiMasterDto masterSeijidantaiEntity) {
        this.masterSeijidantaiEntity = masterSeijidantaiEntity;
    }

}
