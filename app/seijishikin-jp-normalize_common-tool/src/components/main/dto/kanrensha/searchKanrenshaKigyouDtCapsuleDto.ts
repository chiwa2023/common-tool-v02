import { FrameworkPagingDto, type FrameworkPagingDtoInterface } from "../paging/frameworkPagingDto";

interface SearchKanrenshaKigyouDtCapsuleDtoInterface extends FrameworkPagingDtoInterface {

    /** 法人番号 */
    houjinNo: string;

    /** 名称 */
    name: string;

    /** 住所 */
    address: string;

    /** 代表者 */
    delegate: string;

}

class SearchKanrenshaKigyouDtCapsuleDto extends FrameworkPagingDto implements SearchKanrenshaKigyouDtCapsuleDtoInterface {

    /** 法人番号 */
    houjinNo: string;

    /** 名称 */
    name: string;

    /** 住所 */
    address: string;

    /** 代表者 */
    delegate: string;

    constructor() {
        super();

        const INIT_STRING: string = "";

        this.houjinNo = INIT_STRING;
        this.name = INIT_STRING;
        this.address = INIT_STRING;
        this.delegate = INIT_STRING;

    }
}

export { type SearchKanrenshaKigyouDtCapsuleDtoInterface, SearchKanrenshaKigyouDtCapsuleDto }
