import DtoEntityConstants from "../dtoEntityConstants";
import type { SelectOptionStringDtoInterface } from "../select_options/selectOptionStringDto";

interface PostalCodeBlockResultDtoInterface {

    /** 行政区検索 */
    isGyouseikuData: boolean;

    /** 地方自治体コード */
    lgCode: string;

    /** 住所番地まで選択肢 */
    listOptions: SelectOptionStringDtoInterface[];
}

class PostalCodeBlockResultDto implements PostalCodeBlockResultDtoInterface {

    /** 行政区検索 */
    isGyouseikuData: boolean;

    /** 地方自治体コード */
    lgCode: string;

    /** 住所番地まで選択肢 */
    listOptions: SelectOptionStringDtoInterface[];

    constructor() {
        const INIT_STRING: string = DtoEntityConstants.INIT_STRING;
        const INIT_BOOLEAN: boolean = DtoEntityConstants.INIT_BOOLEAN;

        this.isGyouseikuData = INIT_BOOLEAN;
        this.lgCode = INIT_STRING;
        this.listOptions = [];

    }
}

export { PostalCodeBlockResultDto, type PostalCodeBlockResultDtoInterface }