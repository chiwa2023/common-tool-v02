import { SnsServiceOptionDto, type SnsServiceOptionDtoInterface } from "../../../main/dto/sns_service/snsServiceOptionDto";

function mockGetSnsServiceOptions(): SnsServiceOptionDtoInterface[] {
    const list: SnsServiceOptionDtoInterface[] = [];

    list.push(createNotSet());
    list.push(createDto(1));
    list.push(createDto(2));
    list.push(createDto(3));

    return list;
}

function createDto(index: number) {

    const dto: SnsServiceOptionDtoInterface = new SnsServiceOptionDto();
    dto.value = index;
    dto.serviceCode = index;
    dto.text = "SNSサービス" + index;
    dto.portalUrl = "https://example.com/" + index;

    return dto;
}

function createNotSet() {

    const dto: SnsServiceOptionDtoInterface = new SnsServiceOptionDto();

    dto.value = 0;
    dto.serviceCode = 0;
    dto.text = "";
    dto.portalUrl = "";
    return dto;
}

export { mockGetSnsServiceOptions }