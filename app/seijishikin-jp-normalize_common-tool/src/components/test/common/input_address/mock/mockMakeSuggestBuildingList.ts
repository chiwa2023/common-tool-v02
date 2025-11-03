import { PostalCodeBuildingResultDto, type PostalCodeBuildingResultDtoInterface } from "../../../../main/dto/postal/postalCodeBuildingResultDto";
import { SelectOptionStringDto, type SelectOptionStringDtoInterface } from "../../../../main/dto/select_options/selectOptionStringDto";

export default function mockMakeSuggestBuildingList(): PostalCodeBuildingResultDtoInterface {

    const list: SelectOptionStringDtoInterface[] = [];

    const dto0: SelectOptionStringDtoInterface = new SelectOptionStringDto();

    const dto1: SelectOptionStringDtoInterface = new SelectOptionStringDto();
    dto1.value = "三角ビル1F";
    dto1.text = "三角ビル1F";

    const dto2: SelectOptionStringDtoInterface = new SelectOptionStringDto();
    dto2.value = "三角ビル屋上";
    dto2.text = "三角ビル屋上";

    list.push(dto0);
    list.push(dto1);
    list.push(dto2);

    const resultDto: PostalCodeBuildingResultDtoInterface = new PostalCodeBuildingResultDto();

    resultDto.listOptions = list;
    resultDto.lgCode = "123123";

    return resultDto;

}