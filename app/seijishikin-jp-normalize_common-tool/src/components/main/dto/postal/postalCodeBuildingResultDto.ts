import type { SelectOptionStringDtoInterface } from "../select_options/selectOptionStringDto";

interface PostalCodeBuildingResultDtoInterface {

    /** 地方自治体コード */
    lgCode: string;

    /** 建物選択肢リスト */
    listOptions: SelectOptionStringDtoInterface[];

}

class PostalCodeBuildingResultDto implements PostalCodeBuildingResultDtoInterface {

    /** 地方自治体コード */
    lgCode: string;

    /** 建物選択肢リスト */
    listOptions: SelectOptionStringDtoInterface[];

    constructor() {
        this.lgCode = "";
        this.listOptions = [];
    }

}

export { PostalCodeBuildingResultDto, type PostalCodeBuildingResultDtoInterface }