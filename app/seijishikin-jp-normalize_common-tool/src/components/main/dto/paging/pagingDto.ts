import DtoEntityConstants from "../dtoEntityConstants";

/**
 * ページングDto
 * API間の伝達Dtoとして使用しないのでInterface不要
 */
class PagingDto {

    /** ページ番号  */
    pageNumber: number;

    /** ページ番号表示  */
    pageText: string;

    /** 表示クラス  */
    viewClass: string;

    /** 使用フラグ  */
    disabled: boolean;

    constructor() {
        const INIT_STRING: string = DtoEntityConstants.INIT_STRING;
        const INIT_NUMBER: number = DtoEntityConstants.INIT_NUMBER;
        const INIT_BOOLEAN: boolean = DtoEntityConstants.INIT_BOOLEAN;

        this.pageNumber = INIT_NUMBER;
        this.pageText = INIT_STRING;
        this.viewClass = INIT_STRING;
        this.disabled = INIT_BOOLEAN;
    }
}

export { PagingDto }