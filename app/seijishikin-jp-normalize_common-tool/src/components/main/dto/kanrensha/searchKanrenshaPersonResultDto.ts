import type { KanrenshaPersonMasterEntityInterface } from "../../entity/kanrenshaPersonMasterEntity";
import { FrameworkPagingDto, type FrameworkPagingDtoInterface } from "../paging/frameworkPagingDto";

interface SearchKanrenshaPersonResultDtoInterface extends FrameworkPagingDtoInterface {

    /** 関連者個人マスタリスト */
    listMasterPerson: KanrenshaPersonMasterEntityInterface[];
}

class SearchKanrenshaPersonResultDto extends FrameworkPagingDto implements SearchKanrenshaPersonResultDtoInterface {

    /** 関連者個人マスタリスト */
    listMasterPerson: KanrenshaPersonMasterEntityInterface[];

    constructor() {
        super();

        this.listMasterPerson = [];
    }
}

export { type SearchKanrenshaPersonResultDtoInterface, SearchKanrenshaPersonResultDto }
