import { KanrenshaSeijidantaiMasterEntity, type KanrenshaSeijidantaiMasterEntityInterface } from "../../entity/kanrenshaSeijidantaiMasterEntity";
import { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface } from "../frameworkCapsuleDto";

interface GetKanrenshaSeijidantaiCapsuleDtoInterface extends FrameworkCapsuleDtoInterface {

    /** 関連者政治団体マスタEntity */
    masterSeijidantaiEntity: KanrenshaSeijidantaiMasterEntityInterface;
}

class GetKanrenshaSeijidantaiCapsuleDto extends FrameworkCapsuleDto implements GetKanrenshaSeijidantaiCapsuleDtoInterface {

    /** 関連者政治団体マスタEntity */
    masterSeijidantaiEntity: KanrenshaSeijidantaiMasterEntityInterface;

    constructor() {
        super();

        this.masterSeijidantaiEntity = new KanrenshaSeijidantaiMasterEntity();
    }

}

export { type GetKanrenshaSeijidantaiCapsuleDtoInterface, GetKanrenshaSeijidantaiCapsuleDto }
