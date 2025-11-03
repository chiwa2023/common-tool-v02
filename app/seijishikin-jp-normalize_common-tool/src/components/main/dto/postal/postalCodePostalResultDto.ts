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

        this.isGyouseikuData = false;
        this.listOptions = [];

    }
}

export { PostalCodePostalResultDto, type PostalCodePostalResultDtoInterface }