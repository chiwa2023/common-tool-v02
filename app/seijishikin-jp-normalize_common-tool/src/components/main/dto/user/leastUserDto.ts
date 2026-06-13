/**
 * ユーザ最小限DtoInterface
 */
interface LeastUserDtoInterface {

    /** ユーザId  */
    userPersonId: number;

    /** ユーザコード */
    userPersonCode: number;

    /** ユーザ姓名 */
    userPersonName: string;

    /** 権限リスト */
    listRoles: string[];

    /** 利用者コード */
    riyoushaCode: number;

    /** 利用者権限 */
    riyoushaRole: string;

    /** 関連者権限 */
    kanrenshaRole: string;

    /** 関連者コード */
    kanrenshaCode: string;
}

/**
 * ユーザ最小限Dto
 */
class LeastUserDto implements LeastUserDtoInterface {

    /** ユーザId  */
    userPersonId: number;

    /** ユーザコード */
    userPersonCode: number;

    /** ユーザ姓名 */
    userPersonName: string;

    /** 権限リスト */
    listRoles: string[];

    /** 利用者コード */
    riyoushaCode: number;

    /** 利用者権限 */
    riyoushaRole: string;

    /** 関連者権限 */
    kanrenshaRole: string;

    /** 関連者コード */
    kanrenshaCode: string;

    constructor() {

        const INIT_NUMBER: number = 0;
        const INIT_STRING: string = "";

        this.userPersonId = INIT_NUMBER;
        this.userPersonCode = INIT_NUMBER;
        this.userPersonName = INIT_STRING;
        this.listRoles = [];
        this.riyoushaCode = INIT_NUMBER;
        this.riyoushaRole = INIT_STRING;
        this.kanrenshaRole = INIT_STRING;
        this.kanrenshaCode = INIT_STRING;

    }

}

export { LeastUserDto, type LeastUserDtoInterface }
