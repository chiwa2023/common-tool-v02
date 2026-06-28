import DtoEntityConstants from "../dtoEntityConstants";
import { FrameworkMessageAndResultDto, type FrameworkMessageAndResultDtoInterface } from "../frameworkMessageAndResultDto";
import type { FrameworkPagingDtoInterface } from "./frameworkPagingDto";

interface FrameworkPagingResultDtoInterface extends FrameworkMessageAndResultDtoInterface, FrameworkPagingDtoInterface {

}

class FrameworkPagingResultDto extends FrameworkMessageAndResultDto implements FrameworkPagingResultDtoInterface {

    /** 全件数  */
    allCount: number;

    /** ページ件数  */
    limit: number;

    /** ページ番号  */
    pageNumber: number;

    constructor() {
        super();

        const INIT_NUMBER = DtoEntityConstants.INIT_NUMBER;
        this.pageNumber = INIT_NUMBER;
        this.allCount = INIT_NUMBER;
        this.limit = INIT_NUMBER;
    }

}

export { type FrameworkPagingResultDtoInterface, FrameworkPagingResultDto }
