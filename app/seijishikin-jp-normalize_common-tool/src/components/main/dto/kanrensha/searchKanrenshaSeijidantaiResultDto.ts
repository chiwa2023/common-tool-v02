import type { KanrenshaSeijidantaiMasterEntityInterface } from "../../entity/kanrenshaSeijidantaiMasterEntity";
import { FrameworkPagingDto, type FrameworkPagingDtoInterface } from "../paging/frameworkPagingDto";

interface SearchKanrenshaSeijidantaiResultDtoInterface extends FrameworkPagingDtoInterface {

    /** 関連者政治団体マスタリスト */
    listMasterSeijidantai: KanrenshaSeijidantaiMasterEntityInterface[];
}

class SearchKanrenshaSeijidantaiResultDto extends FrameworkPagingDto
    implements SearchKanrenshaSeijidantaiResultDtoInterface {

    /** 関連者政治団体マスタリスト */
    listMasterSeijidantai: KanrenshaSeijidantaiMasterEntityInterface[];

    constructor() {
        super();
        this.listMasterSeijidantai = [];
    }
}

export { type SearchKanrenshaSeijidantaiResultDtoInterface, SearchKanrenshaSeijidantaiResultDto }
