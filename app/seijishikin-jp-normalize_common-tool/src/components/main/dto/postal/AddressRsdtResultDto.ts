import { AddressRsdtTemplateEntity, type AddressRsdtTemplateEntityInterface } from "../../entity/addressRsdtTemplateEntity";
import { FrameworkMessageAndResultDto, type FrameworkMessageAndResultDtoInterface } from "../frameworkMessageAndResultDto";

interface AddressRsdtResultDtoInterface extends FrameworkMessageAndResultDtoInterface {

    /** 住所住居詳細 */
    addressRsdtEntity: AddressRsdtTemplateEntityInterface;
}


class AddressRsdtResultDto extends FrameworkMessageAndResultDto implements AddressRsdtResultDtoInterface {

    /** 住所住居詳細 */
    addressRsdtEntity: AddressRsdtTemplateEntityInterface;

    constructor() {
        super();
        this.addressRsdtEntity = new AddressRsdtTemplateEntity();
    }
}

export { type AddressRsdtResultDtoInterface, AddressRsdtResultDto }