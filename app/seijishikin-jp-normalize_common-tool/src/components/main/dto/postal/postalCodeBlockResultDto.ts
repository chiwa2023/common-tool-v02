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

        this.isGyouseikuData = false;
        this.lgCode = "";
        this.listOptions = [];

    }
}

export { PostalCodeBlockResultDto, type PostalCodeBlockResultDtoInterface }