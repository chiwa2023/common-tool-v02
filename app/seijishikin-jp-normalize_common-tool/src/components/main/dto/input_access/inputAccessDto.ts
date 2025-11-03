/** 連絡先Interface */
interface InputAccessDtoInterface {

    /** 電話番号1 */
    phon1: string;

    /** 電話番号2 */
    phon2: string;

    /** 電話番号3 */
    phon3: string;

    /** 電子メール */
    email: string;

    /** 代表(公式)サイトurl */
    myPortalUrl: string;

    /** SNSサービスId */
    snsServiceId: number;

    /** SNSサービスコード */
    snsServiceCode: number;

    /** SNSサービス名称 */
    snsServiceName: string;

    /** SNS玄関url */
    snsPortalUrl: string;

    /** SNSサービスアカウント */
    snsAccount: string;

}

/** 連絡先Dto */
class InputAccessDto implements InputAccessDtoInterface {

    /** 電話番号1 */
    phon1: string;

    /** 電話番号2 */
    phon2: string;

    /** 電話番号3 */
    phon3: string;

    /** 電子メール */
    email: string;

    /** 代表(公式)サイトurl */
    myPortalUrl: string;

    /** SNSサービスId */
    snsServiceId: number;

    /** SNSサービスコード */
    snsServiceCode: number;

    /** SNSサービス名称 */
    snsServiceName: string;

    /** SNS玄関url */
    snsPortalUrl: string;

    /** SNSサービスアカウント */
    snsAccount: string;

    constructor() {

        const INIT_STRING: string = "";
        const INIT_NUMBER: number = 0;

        this.phon1 = INIT_STRING;
        this.phon2 = INIT_STRING;
        this.phon3 = INIT_STRING;
        this.email = INIT_STRING;
        this.myPortalUrl = INIT_STRING;
        this.snsServiceId = INIT_NUMBER;
        this.snsServiceCode = INIT_NUMBER;
        this.snsServiceName = INIT_STRING;
        this.snsPortalUrl = INIT_STRING;
        this.snsAccount = INIT_STRING;
    }

}

export { InputAccessDto, type InputAccessDtoInterface }