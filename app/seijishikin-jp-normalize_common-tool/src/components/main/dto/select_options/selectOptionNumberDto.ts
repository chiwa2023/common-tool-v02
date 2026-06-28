import DtoEntityConstants from "../dtoEntityConstants";

/**
 * selectbox選択肢項目Interface(値number)
 */
interface SelectOptionNumberDtoInterface {

    /** 選択肢値 */
    value: number;

    /** 選択肢表示テキスト */
    text: string;

}

/**
 * selectbox選択肢項目Dto(値number)
 */
class SelectOptionNumberDto implements SelectOptionNumberDtoInterface {

    /** 選択肢値 */
    value: number;

    /** 選択肢表示テキスト */
    text: string;

    constructor() {

        const INIT_STRING: string = DtoEntityConstants.INIT_STRING;
        const INIT_NUMBER: number = DtoEntityConstants.INIT_NUMBER;

        this.value = INIT_NUMBER;
        this.text = INIT_STRING;
    }
}

export { SelectOptionNumberDto, type SelectOptionNumberDtoInterface }