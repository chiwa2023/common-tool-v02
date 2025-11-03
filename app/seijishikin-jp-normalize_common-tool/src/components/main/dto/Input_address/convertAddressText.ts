import type { InputAddressDtoInterface } from "./inputAddressDto";

export default function convertAddressText(dto: InputAddressDtoInterface): string {

    let text: string = "〒" + dto.postalcode1 + "-" + dto.postalcode1 + "\n"
        + dto.addressPostal + dto.addressBlock + "　" + dto.addressBuilding;

    return text;
}