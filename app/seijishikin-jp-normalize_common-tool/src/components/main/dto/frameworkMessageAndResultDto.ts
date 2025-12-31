interface FrameworkMessageAndResultDtoInterface {

    /** 出力メッセージ */
    message: string;

    /** 処理失敗フラグ */
    isFailure: boolean;
}



class FrameworkMessageAndResultDto implements FrameworkMessageAndResultDtoInterface {

    /** 出力メッセージ */
    message: string;

    /** 処理失敗フラグ */
    isFailure: boolean;

    constructor() {
        const INIT_STRING: string = "";
        const INIT_BOOLEAN: boolean = false;
        this.message = INIT_STRING;
        this.isFailure = INIT_BOOLEAN;
    }
}

export { type FrameworkMessageAndResultDtoInterface, FrameworkMessageAndResultDto }
