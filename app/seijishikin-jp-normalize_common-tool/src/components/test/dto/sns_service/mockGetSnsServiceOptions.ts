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
    dto.snsServiceId = index;
    dto.snsServiceCode = index;
    dto.snsServiceName = "SNSサービス" + index;
    dto.snsPortalUrl = "https://example.com/" + index;

    dto.value = dto.snsServiceId;
    dto.text =  dto.snsServiceName;
    return dto;
}

function createNotSet() {

    const dto: SnsServiceOptionDtoInterface = new SnsServiceOptionDto();

    dto.snsServiceId = 0;
    dto.snsServiceCode = 0;
    dto.snsServiceName = "";
    dto.snsPortalUrl = "";

    dto.value = dto.snsServiceId;
    dto.text =  dto.snsServiceName;
    return dto;
}

export { mockGetSnsServiceOptions }