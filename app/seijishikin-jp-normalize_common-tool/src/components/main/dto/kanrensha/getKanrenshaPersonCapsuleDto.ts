import { KanrenshaPersonMasterEntity, type KanrenshaPersonMasterEntityInterface } from "../../entity/kanrenshaPersonMasterEntity";
import { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface } from "../frameworkCapsuleDto";

interface GetKanrenshaPersonCapsuleDtoInterface extends FrameworkCapsuleDtoInterface {
    /** 関連者個人マスタEntity */
    masterPersonEntity: KanrenshaPersonMasterEntityInterface;
}

class GetKanrenshaPersonCapsuleDto extends FrameworkCapsuleDto
    implements GetKanrenshaPersonCapsuleDtoInterface {

    /** 関連者個人マスタEntity */
    masterPersonEntity: KanrenshaPersonMasterEntityInterface;

    constructor() {
        super();

        this.masterPersonEntity = new KanrenshaPersonMasterEntity();
    }

}
export { type GetKanrenshaPersonCapsuleDtoInterface, GetKanrenshaPersonCapsuleDto }
