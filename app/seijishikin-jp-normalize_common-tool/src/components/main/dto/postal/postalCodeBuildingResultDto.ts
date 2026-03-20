import type { SelectOptionNumberDtoInterface } from "../select_options/selectOptionNumberDto";

interface PostalCodeBuildingResultDtoInterface {

    /** 地方自治体コード */
    lgCode: string;

    /** 建物選択肢リスト */
    listOptions: SelectOptionNumberDtoInterface[];

}

class PostalCodeBuildingResultDto implements PostalCodeBuildingResultDtoInterface {

    /** 地方自治体コード */
    lgCode: string;

    /** 建物選択肢リスト */
    listOptions: SelectOptionNumberDtoInterface[];

    constructor() {
        this.lgCode = "";
        this.listOptions = [];
    }

}

export { PostalCodeBuildingResultDto, type PostalCodeBuildingResultDtoInterface }