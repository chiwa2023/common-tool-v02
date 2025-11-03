/**
 * 団体名Interface
 */
interface InputOrgNameDtoInterface {

    /** 団体名かな */
    orgNameKana: string;

    /** 団体名 */
    orgName: string;
}

/**
 * 団体名Dto
 */
class InputOrgNameDto implements InputOrgNameDtoInterface {

    /** 団体名かな */
    orgNameKana: string;

    /** 団体名 */
    orgName: string;

    constructor() {
        const INIT_STRING: string = "";
        this.orgNameKana = INIT_STRING;
        this.orgName = INIT_STRING;
    }
}

export { InputOrgNameDto, type InputOrgNameDtoInterface }