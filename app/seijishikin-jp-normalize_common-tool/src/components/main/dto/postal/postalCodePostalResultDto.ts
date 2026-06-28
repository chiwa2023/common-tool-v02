import DtoEntityConstants from "../dtoEntityConstants";
import type { SelectOptionNumberDtoInterface } from "../select_options/selectOptionNumberDto";

interface PostalCodePostalResultDtoInterface {

    /** 行政区検索 */
    isGyouseikuData: boolean;

    /** 郵便番号住所までリスト */
    listOptions: SelectOptionNumberDtoInterface[];

}

class PostalCodePostalResultDto implements PostalCodePostalResultDtoInterface {

    /** 行政区検索 */
    isGyouseikuData: boolean;

    /** 郵便番号住所までリスト */
    listOptions: SelectOptionNumberDtoInterface[];

    constructor() {
        const INIT_BOOLEAN: boolean = DtoEntityConstants.INIT_BOOLEAN;

        this.isGyouseikuData = INIT_BOOLEAN;
        this.listOptions = [];

    }
}

export { PostalCodePostalResultDto, type PostalCodePostalResultDtoInterface }