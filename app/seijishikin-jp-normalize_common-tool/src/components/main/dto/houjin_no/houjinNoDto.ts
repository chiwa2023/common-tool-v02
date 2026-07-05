import DtoEntityConstants from "../dtoEntityConstants";

interface HoujinNoDtoInterface {

    /** 法人番号 */
    houjinNo: string;

    /** 法人種別 */
    kind: string;

    /** 法人商号 */
    houjinName: string;

    /** 処理区分 */
    process: string;

    /** 所在地県名*/
    prefectureName: string;

    /** 所在地市町村 */
    cityName: string;

}


class HoujinNoDto implements HoujinNoDtoInterface {

    /** 法人番号 */
    houjinNo: string;

    /** 法人種別 */
    kind: string;

    /** 法人商号 */
    houjinName: string;

    /** 処理区分 */
    process: string;

    /** 所在地県名 */
    prefectureName: string;

    /** 所在地市町村 */
    cityName: string;

    constructor() {

        const INIT_STRING: string = DtoEntityConstants.INIT_STRING;

        this.houjinNo = INIT_STRING;
        this.kind = INIT_STRING;
        this.houjinName = INIT_STRING;
        this.process = INIT_STRING;
        this.prefectureName = INIT_STRING;
        this.cityName = INIT_STRING;
    }
}

export { HoujinNoDto, type HoujinNoDtoInterface }