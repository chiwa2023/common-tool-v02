import { FrameworkPagingDto, type FrameworkPagingDtoInterface } from "../paging/frameworkPagingDto";

interface SearchKanrenshaPersonCapsuleDtoInterface extends FrameworkPagingDtoInterface {

    /** 名称 */
    name: string;

    /** 住所 */
    address: string;

    /** 職業 */
    shokugyou: string;

}

class SearchKanrenshaPersonCapsuleDto extends FrameworkPagingDto implements SearchKanrenshaPersonCapsuleDtoInterface {

    /** 名称 */
    name: string;

    /** 住所 */
    address: string;

    /** 職業 */
    shokugyou: string;

    constructor() {
        super();
        const INIT_STRING: string = "";

        this.name = INIT_STRING;
        this.address = INIT_STRING;
        this.shokugyou = INIT_STRING;
    }
}

export { type SearchKanrenshaPersonCapsuleDtoInterface, SearchKanrenshaPersonCapsuleDto }
