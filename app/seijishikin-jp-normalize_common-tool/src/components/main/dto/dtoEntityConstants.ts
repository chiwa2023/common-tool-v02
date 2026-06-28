export default class DtoEntityConstants {

    /** string初期値 */
    static readonly INIT_STRING: string = "";

    /** number初期値 */
    static readonly INIT_NUMBER: number = 0;

    /** boolean初期値 */
    static readonly INIT_BOOLEAN: boolean = false;

    /** 日付初期値(政治資金規正法施行前日) */
    static readonly INIT_DATE: Date = new Date(1948, 6, 28, 23, 59, 59);

    /** 日付入力初期値(システム日付) */
    static readonly INIT_DATE_SYSTEM: Date = new Date();

    /** 日時下限値(終戦前日) */
    static readonly INIT_DATETIME_LIMIT: Date = new Date(1945, 7, 14, 23, 59, 59);

    /** 日付下限値(終戦前日) */
    static readonly INIT_DATE_LIMIT: Date = new Date(1945, 7, 14);
}