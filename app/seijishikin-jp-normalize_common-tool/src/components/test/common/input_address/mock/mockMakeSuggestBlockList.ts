import { PostalCodeBlockResultDto, type PostalCodeBlockResultDtoInterface } from "../../../../main/dto/postal/postalCodeBlockResultDto";
import { SelectOptionStringDto, type SelectOptionStringDtoInterface } from "../../../../main/dto/select_options/selectOptionStringDto";

export default function mockMakeSuggestBlockList(): PostalCodeBlockResultDtoInterface {

    const list: SelectOptionStringDtoInterface[] = [];

    const dto0: SelectOptionStringDtoInterface = new SelectOptionStringDto();

    const dto1: SelectOptionStringDtoInterface = new SelectOptionStringDto();
    dto1.value = "1番地2";
    dto1.text = "1番地2";

    const dto2: SelectOptionStringDtoInterface = new SelectOptionStringDto();
    dto2.value = "2番地3";
    dto2.text = "2番地3";

    const dto3: SelectOptionStringDtoInterface = new SelectOptionStringDto();
    dto3.value = "1990番地";
    dto3.text = "1990番地";

    list.push(dto0);
    list.push(dto1);
    list.push(dto2);
    list.push(dto3);

    const resultDto: PostalCodeBlockResultDtoInterface = new PostalCodeBlockResultDto();
    resultDto.isGyouseikuData = false;
    resultDto.listOptions = list;
    resultDto.lgCode = "123123";

    return resultDto;

}