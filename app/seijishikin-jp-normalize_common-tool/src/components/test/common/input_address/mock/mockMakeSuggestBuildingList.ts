import { PostalCodeBuildingResultDto, type PostalCodeBuildingResultDtoInterface } from "../../../../main/dto/postal/postalCodeBuildingResultDto";
import { SelectOptionNumberDto, type SelectOptionNumberDtoInterface } from "../../../../main/dto/select_options/selectOptionNumberDto";

export default function mockMakeSuggestBuildingList(): PostalCodeBuildingResultDtoInterface {

    const list: SelectOptionNumberDtoInterface[] = [];

    const dto0: SelectOptionNumberDtoInterface = new SelectOptionNumberDto();

    const dto1: SelectOptionNumberDtoInterface = new SelectOptionNumberDto();
    dto1.value = 395;
    dto1.text = "三角ビル1F";

    const dto2: SelectOptionNumberDtoInterface = new SelectOptionNumberDto();
    dto2.value = 481;
    dto2.text = "三角ビル屋上";

    list.push(dto0);
    list.push(dto1);
    list.push(dto2);

    const resultDto: PostalCodeBuildingResultDtoInterface = new PostalCodeBuildingResultDto();

    resultDto.listOptions = list;
    resultDto.lgCode = "123123";

    return resultDto;

}