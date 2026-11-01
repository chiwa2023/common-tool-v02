import { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface } from "../frameworkCapsuleDto";
import { KanrenshaPersonDto, type KanrenshaPersonDtoInterface } from "./kanrenshaPersonDto";

interface SaveKanrenshaPersonCapsuleDtoInterface extends FrameworkCapsuleDtoInterface {
    /** 関連者個人Dto */
    kanrenshaPersonDto: KanrenshaPersonDtoInterface;
}


class SaveKanrenshaPersonCapsuleDto extends FrameworkCapsuleDto
    implements SaveKanrenshaPersonCapsuleDtoInterface {

    /** 関連者個人Dto */
    kanrenshaPersonDto: KanrenshaPersonDtoInterface;

    constructor() {
        super()

        this.kanrenshaPersonDto = new KanrenshaPersonDto();
    }
}

export { type SaveKanrenshaPersonCapsuleDtoInterface, SaveKanrenshaPersonCapsuleDto }
