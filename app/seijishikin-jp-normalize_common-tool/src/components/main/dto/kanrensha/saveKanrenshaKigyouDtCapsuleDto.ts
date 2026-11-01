import { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface } from "../frameworkCapsuleDto";
import { KanrenshaKigyouDtDto, type KanrenshaKigyouDtDtoInterface } from "./kanrenshaKigyouDtDto";

interface SaveKanrenshaKigyouDtCapsuleDtoInterface extends FrameworkCapsuleDtoInterface {

    /** 関連者企業団体Dto */
    kanrenshaKigyouDtDto: KanrenshaKigyouDtDtoInterface;
}

class SaveKanrenshaKigyouDtCapsuleDto extends FrameworkCapsuleDto
    implements SaveKanrenshaKigyouDtCapsuleDtoInterface {

    /** 関連者企業団体Dto */
    kanrenshaKigyouDtDto: KanrenshaKigyouDtDtoInterface;

    constructor() {
        super();

        this.kanrenshaKigyouDtDto = new KanrenshaKigyouDtDto();
    }
}

export { type SaveKanrenshaKigyouDtCapsuleDtoInterface, SaveKanrenshaKigyouDtCapsuleDto }
