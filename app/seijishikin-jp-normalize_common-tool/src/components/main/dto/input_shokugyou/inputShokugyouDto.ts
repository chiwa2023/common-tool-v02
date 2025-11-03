/**
 * 職業入力Interface
 */
interface InputShokugyouDtoInterface {
    /** 職業全表記 */
    allShokugyou: string;

    /** 職業の業種 */
    gyoushu: string;

    /** 職業の役職 */
    yakushoku: string;

    /** ユーザ記述の職業 */
    shokugyouUserWrite: string;

    /** 法人番号 */
    houjinNo: string;
    /** 法人所在地 */
    houjinAddress: string;
    /** 法人名 */
    houjinName: string;
}

/**
 * 職業入力Dto
 */
class InputShokugyouDto implements InputShokugyouDtoInterface {

    /** 職業全表記 */
    allShokugyou: string;

    /** 職業の業種 */
    gyoushu: string;

    /** 職業の役職 */
    yakushoku: string;

    /** ユーザ記述の職業 */
    shokugyouUserWrite: string;

    /** 法人番号 */
    houjinNo: string;
    /** 法人所在地 */
    houjinAddress: string;
    /** 法人名称 */
    houjinName: string;

    constructor() {
        const INIT_STRING: string = "";

        this.allShokugyou = INIT_STRING;
        this.gyoushu = INIT_STRING;
        this.yakushoku = INIT_STRING;
        this.shokugyouUserWrite = INIT_STRING;
        this.houjinNo = INIT_STRING;
        this.houjinAddress = INIT_STRING;
        this.houjinName = INIT_STRING;
    }

}

export { InputShokugyouDto, type InputShokugyouDtoInterface }