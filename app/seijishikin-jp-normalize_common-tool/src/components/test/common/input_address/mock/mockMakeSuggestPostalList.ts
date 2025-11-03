import { PostalCodePostalResultDto, type PostalCodePostalResultDtoInterface } from "../../../../main/dto/postal/postalCodePostalResultDto";
import { SelectOptionNumberDto, type SelectOptionNumberDtoInterface } from "../../../../main/dto/select_options/selectOptionNumberDto";

export default function mockMakeSuggestPostalList():PostalCodePostalResultDtoInterface{

    const list:SelectOptionNumberDtoInterface[] = [];

    const dto0:SelectOptionNumberDtoInterface = new SelectOptionNumberDto();

    const dto1:SelectOptionNumberDtoInterface = new SelectOptionNumberDto();
    dto1.value = 291;
    dto1.text= "山形県実在市岸辺町";

     const dto2:SelectOptionNumberDtoInterface = new SelectOptionNumberDto();
     dto2.value = 845;
     dto2.text= "山形県実在市山麓町";

    const dto3:SelectOptionNumberDtoInterface = new SelectOptionNumberDto();
    dto3.value = 348;
    dto3.text= "山形県実在市湖畔町";

    list.push(dto0);
    list.push(dto1);
    list.push(dto2);
    list.push(dto3);

    const resultDto:PostalCodePostalResultDtoInterface = new PostalCodePostalResultDto();
    resultDto.listOptions = list;
    resultDto.isGyouseikuData = true;

    return resultDto;
}