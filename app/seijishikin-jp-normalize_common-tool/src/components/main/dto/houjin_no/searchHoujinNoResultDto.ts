import DtoEntityConstants from "../dtoEntityConstants";
import { FrameworkMessageAndResultDto, type FrameworkMessageAndResultDtoInterface } from "../frameworkMessageAndResultDto";
import type { HoujinNoDtoInterface } from "./houjinNoDto";

interface SearchHoujinNoResultDtoInterface extends FrameworkMessageAndResultDtoInterface {

    /** 最終更新年月日 (ヘッダ1項目目) */
    updateDate: string;

    /** 総件数 (ヘッダ2項目目) */
    totalCount: number;

    /** 分割番号 (ヘッダ3項目目) */
    divideNumber: number;

    /** 分割数 (ヘッダ4項目目) */
    divideCount: number;

    /** 法人番号情報リスト */
    houjinNoList: HoujinNoDtoInterface[];
}


class SearchHoujinNoResultDto extends FrameworkMessageAndResultDto implements SearchHoujinNoResultDtoInterface {

    /** 最終更新年月日 (ヘッダ1項目目) */
    updateDate: string;

    /** 総件数 (ヘッダ2項目目) */
    totalCount: number;

    /** 分割番号 (ヘッダ3項目目) */
    divideNumber: number;

    /** 分割数 (ヘッダ4項目目) */
    divideCount: number;

    /** 法人番号情報リスト */
    houjinNoList: HoujinNoDtoInterface[];

    constructor() {
        super();

        const INIT_STRING: string = DtoEntityConstants.INIT_STRING;
        const INIT_NUMBER: number = DtoEntityConstants.INIT_NUMBER;

        this.updateDate = INIT_STRING;
        this.totalCount = INIT_NUMBER;
        this.divideNumber = INIT_NUMBER;
        this.divideCount = INIT_NUMBER;
        this.houjinNoList = [];
    }

}

export { type SearchHoujinNoResultDtoInterface, SearchHoujinNoResultDto }
