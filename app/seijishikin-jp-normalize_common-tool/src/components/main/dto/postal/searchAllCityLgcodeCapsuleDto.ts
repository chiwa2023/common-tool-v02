
interface SearchAllCityLgcodeCapsuleDtoInterface {

    /** 地方自治体コード */
    lgCode: string;

    /** 値5桁検索フラグ */
    isSearch5Digit: boolean;
}

class SearchAllCityLgcodeCapsuleDto implements SearchAllCityLgcodeCapsuleDtoInterface {

    /** 地方自治体コード */
    lgCode: string;

    /** 値5桁検索フラグ */
    isSearch5Digit: boolean;

    constructor() {

        const INIT_STRING: string = "";
        const INIT_BOOLEAN: boolean = false;

        this.lgCode = INIT_STRING;
        this.isSearch5Digit = INIT_BOOLEAN;

    }
}

export { type SearchAllCityLgcodeCapsuleDtoInterface, SearchAllCityLgcodeCapsuleDto }
