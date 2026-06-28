import DtoEntityConstants from "../dtoEntityConstants";

interface HoujinNoDtoInterface {

    /** 法人番号 */
    houjinNo: string;

    /** 処理区分 */
    shoriKbn: string;

    /** 更新日 */
    updateDate: Date;

    /** 法人種別 */
    houjinSbts: string;

    /** 法人商号カナ */
    houjinNameKana: string;

    /** 法人商号 */
    houjinName: string;

    /**　郵便番号  */
    postalcode: string;

    /**　住所・都道府県  */
    addressPrefecture: string;

    /** 住所・市  */
    addressCity: string;

    /** 住所・街区建物  */
    addressBlock: string;

}


class HoujinNoDto implements HoujinNoDtoInterface {

    /** 法人番号 */
    houjinNo: string;

    /** 処理区分 */
    shoriKbn: string;

    /** 更新日 */
    updateDate: Date;

    /** 法人種別 */
    houjinSbts: string;

    /** 法人商号カナ */
    houjinNameKana: string;

    /** 法人商号 */
    houjinName: string;

    /**　郵便番号  */
    postalcode: string;

    /**　住所・都道府県  */
    addressPrefecture: string;

    /** 住所・市  */
    addressCity: string;

    /** 住所・街区建物  */
    addressBlock: string;

    constructor() {

        const INIT_STRING: string = DtoEntityConstants.INIT_STRING;
        const INIT_DATE: Date = DtoEntityConstants.INIT_DATE_SYSTEM;

        this.houjinNo = INIT_STRING;
        this.shoriKbn = INIT_STRING;
        this.updateDate = INIT_DATE; // リスト表示用：意味としては初期値だが、法人番号更新日初期値との乖離がありすぎ
        this.houjinSbts = INIT_STRING;
        this.houjinNameKana = INIT_STRING;
        this.houjinName = INIT_STRING;
        this.postalcode = INIT_STRING;
        this.addressPrefecture = INIT_STRING;
        this.addressCity = INIT_STRING;
        this.addressBlock = INIT_STRING;
    }
}

export { HoujinNoDto, type HoujinNoDtoInterface }