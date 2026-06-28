import DtoEntityConstants from "../dtoEntityConstants";

interface AddressRsdtTemplateDtoInterface {

    /** テーブルId */
    addressRsdtId: number;

    /** 住所全体 */
    addressAll: string;
    /** 元住所全体 */
    orginAddressAll: string;

    /** 郵便番号1 */
    postalcode1: string;
    /** 郵便番号2 */
    postalcode2: string;
    /** 住所郵便番号まで1 */
    addressPostal: string;
    /** 住所番地 */
    addressBlock: string;
    /** 住所建物 */
    addressBuilding: string;

    /** 地方公共団体コード */
    lgCode: string;
    /** 町字Id */
    machiazaId: string;
    /** 街区Id */
    blkId: string;
    /** 地番Id */
    prcId: string;
    /** 住居Id */
    rsdtId: string;
    /** 住居Id */
    rsdt2Id: string;

    /** 効力発生日 */
    effectDate: Date;

    /** 廃止日 */
    abolishDate: Date | null;

}

class AddressRsdtTemplateDto implements AddressRsdtTemplateDtoInterface {

    /** テーブルId */
    addressRsdtId: number;

    /** 住所全体 */
    addressAll: string;
    /** 元住所全体 */
    orginAddressAll: string;

    /** 郵便番号1 */
    postalcode1: string;
    /** 郵便番号2 */
    postalcode2: string;
    /** 住所郵便番号まで1 */
    addressPostal: string;
    /** 住所番地 */
    addressBlock: string;
    /** 住所建物 */
    addressBuilding: string;

    /** 地方公共団体コード */
    lgCode: string;
    /** 町字Id */
    machiazaId: string;
    /** 街区Id */
    blkId: string;
    /** 地番Id */
    prcId: string;
    /** 住居Id */
    rsdtId: string;
    /** 住居Id */
    rsdt2Id: string;

    /** 適用開始日 */
    effectDate: Date;

    /** 廃止日 */
    abolishDate: Date | null;

    constructor() {

        const INIT_STRING: string = DtoEntityConstants.INIT_STRING;
        const INIT_NUMBER: number = DtoEntityConstants.INIT_NUMBER;
        const INIT_DATE: Date = DtoEntityConstants.INIT_DATE_SYSTEM;

        this.addressRsdtId = INIT_NUMBER;

        this.addressAll = INIT_STRING;
        this.orginAddressAll = INIT_STRING;

        this.postalcode1 = INIT_STRING;
        this.postalcode2 = INIT_STRING;
        this.addressPostal = INIT_STRING;
        this.addressBlock = INIT_STRING;
        this.addressBuilding = INIT_STRING;

        this.lgCode = INIT_STRING;
        this.machiazaId = INIT_STRING;
        this.blkId = INIT_STRING;
        this.prcId = INIT_STRING;
        this.rsdtId = INIT_STRING;
        this.rsdt2Id = INIT_STRING;

        this.effectDate = INIT_DATE; // 入力窓編集前提
        this.abolishDate = null; // 廃止日未決定が基本
    }
}

export { type AddressRsdtTemplateDtoInterface, AddressRsdtTemplateDto }