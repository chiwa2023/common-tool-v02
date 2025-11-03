import { SelectOptionNumberDto, type SelectOptionNumberDtoInterface } from "../select_options/selectOptionNumberDto";

interface SnsServiceOptionDtoInterface extends SelectOptionNumberDtoInterface {

    /** SNSサービスId */
    snsServiceId: number;

    /** SNSサービスコード */
    snsServiceCode: number;

    /** SNSサービス名称 */
    snsServiceName: string;

    /** SNS玄関url */
    snsPortalUrl: string;

}

class SnsServiceOptionDto extends SelectOptionNumberDto implements SnsServiceOptionDtoInterface {

    /** SNSサービスId */
    snsServiceId: number;

    /** SNSサービスコード */
    snsServiceCode: number;

    /** SNSサービス名称 */
    snsServiceName: string;

    /** SNS玄関url */
    snsPortalUrl: string;

    constructor() {
        super();

        const INIT_STRING: string = "";
        const INIT_NUMBER: number = 0;

        this.snsServiceId = INIT_NUMBER;
        this.snsServiceCode = INIT_NUMBER;
        this.snsServiceName = INIT_STRING;
        this.snsPortalUrl = INIT_STRING;
    }
}

export { SnsServiceOptionDto, type SnsServiceOptionDtoInterface }