import DtoEntityConstants from "../dtoEntityConstants";
import { FrameworkPagingDto, type FrameworkPagingDtoInterface } from "../paging/frameworkPagingDto";

interface SearchKanrenshaSeijidantaiCapsuleDtoInterface extends FrameworkPagingDtoInterface {

    /** 政治団体番号 */
    poliOrgNo: string;

    /** 名称 */
    name: string;

    /** 住所 */
    address: string;

    /** 代表者 */
    delegate: string;

    /** 団体区分リスト */
    listDantaiKbn: string[];

}

class SearchKanrenshaSeijidantaiCapsuleDto extends FrameworkPagingDto implements SearchKanrenshaSeijidantaiCapsuleDtoInterface {

    /** 政治団体番号 */
    poliOrgNo: string;

    /** 名称 */
    name: string;

    /** 住所 */
    address: string;

    /** 代表者 */
    delegate: string;

    /** 団体区分リスト */
    listDantaiKbn: string[];

    constructor() {
        super();
        const INIT_STRING: string = DtoEntityConstants.INIT_STRING;

        this.poliOrgNo = INIT_STRING;
        this.name = INIT_STRING;
        this.address = INIT_STRING;
        this.delegate = INIT_STRING;
        this.listDantaiKbn = [];
    }
}


export { type SearchKanrenshaSeijidantaiCapsuleDtoInterface, SearchKanrenshaSeijidantaiCapsuleDto }
