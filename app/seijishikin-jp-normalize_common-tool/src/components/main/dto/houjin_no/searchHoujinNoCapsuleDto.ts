import DtoEntityConstants from "../dtoEntityConstants";
import { FrameworkPagingDto, type FrameworkPagingDtoInterface } from "../paging/frameworkPagingDto";

interface SearchHoujinNoCapsuleDtoInterface extends FrameworkPagingDtoInterface {

    /** アプリケーションId */
    appId: string;

    /** 名称 */
    name: string;

    /** 応答形式(CSV-Unicode) */
    type: string;

    /** 名称検索方式 */
    mode: string;

    /** 名称検索対象 */
    target: string;

    /** 市区町村コード */
    address: string;

    /** 法人種別(常に全検索 = 空文字) */
    kind: string;

    /** 履歴該否 */
    change: string;

    /** 登記記録の閉鎖該否(過去データを見る場合、閉鎖を使いうるので常にON) */
    close: string;

    /** 指定年月日開始 */
    from: Date;

    /** 指定年月日終了 */
    to: Date;

    /** 分割番号(ページングのページ番号) */
    divide: number;
}

class SearchHoujinNoCapsuleDto extends FrameworkPagingDto implements SearchHoujinNoCapsuleDtoInterface {

    /** アプリケーションId */
    appId: string;

    /** 名称 */
    name: string;

    /** 応答形式(CSV-Unicode) */
    type: string;

    /** 名称検索方式 */
    mode: string;

    /** 名称検索対象 */
    target: string;

    /** 市区町村コード */
    address: string;

    /** 法人種別(常に全検索 = 空文字) */
    kind: string;

    /** 履歴該否 */
    change: string;

    /** 登記記録の閉鎖該否(過去データを見る場合、閉鎖を使いうるので常にON) */
    close: string;

    /** 指定年月日開始 */
    from: Date;

    /** 指定年月日終了 */
    to: Date;

    /** 分割番号(ページングのページ番号) */
    divide: number;

    constructor() {
        super();

        const INIT_STRING: string = DtoEntityConstants.INIT_STRING;
        const INIT_NUMBER: number = DtoEntityConstants.INIT_NUMBER;
        const INIT_DATE: Date = DtoEntityConstants.INIT_DATE;

        this.appId = INIT_STRING;
        this.name = INIT_STRING;
        this.type = INIT_STRING;
        this.mode = INIT_STRING;
        this.target = INIT_STRING;
        this.address = INIT_STRING;
        this.kind = INIT_STRING;
        this.change = INIT_STRING;
        this.close = INIT_STRING;
        this.from = INIT_DATE;
        this.to = INIT_DATE;
        this.divide = INIT_NUMBER;
    }

}

export { type SearchHoujinNoCapsuleDtoInterface, SearchHoujinNoCapsuleDto }

