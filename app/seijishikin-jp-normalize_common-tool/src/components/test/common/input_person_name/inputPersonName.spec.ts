import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import InputPersonName from '../../../main/common/input_person_name/InputPersonName.vue';
import { InputPersonNameDto, type InputPersonNameDtoInterface } from '../../../main/dto/input_person_name/inputPersonNameDto';


describe('inputPersonName', () => {

    it('コンポーネントにpropsの値が設定されていること', async () => {

        const dto: InputPersonNameDtoInterface = new InputPersonNameDto();
        dto.lastName = "aaa";
        dto.firstName = "bbb";
        dto.middleName = "ccc";

        dto.lastNameKana = "111";
        dto.firstNameKana = "222";
        dto.middleNameKana = "333";

        const wrapper = mount(InputPersonName, {
            props: {
                editDto: dto
            }
        })

        expect(wrapper.find<HTMLInputElement>('#last-name').element.value).toBe(dto.lastName);
        expect(wrapper.find<HTMLInputElement>('#first-name').element.value).toBe(dto.firstName);
        expect(wrapper.find<HTMLInputElement>('#middle-name').element.value).toBe(dto.middleName);

        expect(wrapper.find<HTMLInputElement>('#last-name-kana').element.value).toBe(dto.lastNameKana);
        expect(wrapper.find<HTMLInputElement>('#first-name-kana').element.value).toBe(dto.firstNameKana);
        expect(wrapper.find<HTMLInputElement>('#middle-name-kana').element.value).toBe(dto.middleNameKana);
    });


    it('emitで必要な値が取得できること', async () => {

        const dto: InputPersonNameDtoInterface = new InputPersonNameDto();
        dto.lastName = "aaa";
        dto.firstName = "bbb";
        dto.middleName = "ccc";

        dto.lastNameKana = "111";
        dto.firstNameKana = "222";
        dto.middleNameKana = "333";

        const wrapper = mount(InputPersonName, {
            props: {
                editDto: dto
            }
        })

        const newLastNameKana = 'かんりにん';
        const newLastName = '管理人';
        const newFirstNameKana = 'たろう';
        const newFirstName = '太郎';
        const newMiddleNameKana = 'みかえる';
        const newMiddleName = 'ミカエル';

        await wrapper.find('#first-name-kana').setValue(newFirstNameKana);
        await wrapper.find('#first-name').setValue(newFirstName);
        await wrapper.find('#last-name-kana').setValue(newLastNameKana);
        await wrapper.find('#last-name').setValue(newLastName);
        await wrapper.find('#middle-name-kana').setValue(newMiddleNameKana);
        await wrapper.find('#middle-name').setValue(newMiddleName);
        0
        // 保存ボタンクリック
        wrapper.find<HTMLButtonElement>('#on-save').trigger('click');

        const emittedPayload: InputPersonNameDtoInterface = wrapper.emitted('sendInputPersonNameInterface')![0]![0] as InputPersonNameDtoInterface;

        expect(emittedPayload.lastName).toBe(newLastName);
        expect(emittedPayload.lastNameKana).toBe(newLastNameKana);
        expect(emittedPayload.firstName).toBe(newFirstName);
        expect(emittedPayload.firstNameKana).toBe(newFirstNameKana);
        expect(emittedPayload.middleName).toBe(newMiddleName);
        expect(emittedPayload.middleNameKana).toBe(newMiddleNameKana);

        const allNameKana = newLastNameKana + "　" + newMiddleNameKana + newFirstNameKana;
        const allName = newLastName + "　" + newMiddleName + newFirstName;

        expect(emittedPayload.allName).toBe(allName);
        expect(emittedPayload.allNameKana).toBe(allNameKana);
    });

    it('各入力欄にmaxlength（桁数制限）が正しく設定されていること', () => {
        const dto: InputPersonNameDtoInterface = new InputPersonNameDto();
        const wrapper = mount(InputPersonName, {
            props: {
                editDto: dto
            }
        });

        expect(wrapper.find('#last-name').attributes('maxlength')).toBe('40');
        expect(wrapper.find('#first-name').attributes('maxlength')).toBe('40');
        expect(wrapper.find('#middle-name').attributes('maxlength')).toBe('20');

        expect(wrapper.find('#last-name-kana').attributes('maxlength')).toBe('40');
        expect(wrapper.find('#first-name-kana').attributes('maxlength')).toBe('40');
        expect(wrapper.find('#middle-name-kana').attributes('maxlength')).toBe('20');
    });
});