import type { KanrenshaKigyouDtMasterEntityInterface } from "../../entity/kanrenshaKigyouDtMasterEntity";
import { FrameworkPagingDto, type FrameworkPagingDtoInterface } from "../paging/frameworkPagingDto";

interface SearchKanrenshaKigyouDtResultDtoInterface extends FrameworkPagingDtoInterface {
    /** 関連者企業団体マスタリスト */
    listMasterKigyouDt: KanrenshaKigyouDtMasterEntityInterface[];
}

class SearchKanrenshaKigyouDtResultDto extends FrameworkPagingDto implements SearchKanrenshaKigyouDtResultDtoInterface {

    /** 関連者企業団体マスタリスト */
    listMasterKigyouDt: KanrenshaKigyouDtMasterEntityInterface[];

    constructor() {
        super();
        this.listMasterKigyouDt = [];
    }
}

export { type SearchKanrenshaKigyouDtResultDtoInterface, SearchKanrenshaKigyouDtResultDto }
