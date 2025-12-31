interface FrameworkPagingDtoInterface {

    /** 全件数  */
    allCount: number;

    /** ページ件数  */
    limit: number;

    /** ページ番号  */
    pageNumber: number;

}

/**
 * ページングDto
 */
class FrameworkPagingDto implements FrameworkPagingDtoInterface {

    /** 全件数  */
    allCount: number;

    /** ページ件数  */
    limit: number;

    /** ページ番号  */
    pageNumber: number;

    constructor() {
        const INIT_NUMBER = 0;
        this.pageNumber = INIT_NUMBER;
        this.allCount = INIT_NUMBER;
        this.limit = INIT_NUMBER;
    }
}

export { type FrameworkPagingDtoInterface, FrameworkPagingDto }