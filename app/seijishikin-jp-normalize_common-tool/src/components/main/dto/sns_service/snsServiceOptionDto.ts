import { SelectOptionNumberDto, type SelectOptionNumberDtoInterface } from "../select_options/selectOptionNumberDto";

interface SnsServiceOptionDtoInterface extends SelectOptionNumberDtoInterface {


    /** SNSサービスコード */
    serviceCode: number;


    /** SNS玄関url */
    portalUrl: string;

}

class SnsServiceOptionDto extends SelectOptionNumberDto implements SnsServiceOptionDtoInterface {


    /** SNSサービスコード */
    serviceCode: number;


    /** SNS玄関url */
    portalUrl: string;

    constructor() {
        super();

        const INIT_STRING: string = "";
        const INIT_NUMBER: number = 0;

        this.serviceCode = INIT_NUMBER;
        this.portalUrl = INIT_STRING;
    }
}

export { SnsServiceOptionDto, type SnsServiceOptionDtoInterface }