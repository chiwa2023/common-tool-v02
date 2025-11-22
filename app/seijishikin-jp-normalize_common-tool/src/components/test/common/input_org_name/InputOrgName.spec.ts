import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import InputOrgName from '../../../main/common/input_org_name/InputOrgName.vue';
import type { InputOrgNameDtoInterface } from '../../../main/dto/input_org_name/inputOrgNameDto';

describe('InputOrgName.vue', () => {
  const mockEditDto: InputOrgNameDtoInterface = {
    orgNameKana: 'だんたいめいかな',
    orgName: '団体名',
  };

  it('renders correctly with initial props', () => {
    const wrapper = mount(InputOrgName, {
      props: {
        editDto: mockEditDto,
      },
    });

    expect(wrapper.find('h3').text()).toBe('組織名称入力');
    expect((wrapper.find('#org-name-kana').element as HTMLInputElement).value).toBe(mockEditDto.orgNameKana);
    expect((wrapper.find('#org-name').element as HTMLInputElement).value).toBe(mockEditDto.orgName);
  });

  it('emits "sendInputOrgNameInterface" with updated data on save', async () => {
    const wrapper = mount(InputOrgName, {
      props: {
        editDto: mockEditDto,
      },
    });

    const newOrgNameKana = 'あたらしいだんたいめいかな';
    const newOrgName = '新しい団体名';

    await wrapper.find('#org-name-kana').setValue(newOrgNameKana);
    await wrapper.find('#org-name').setValue(newOrgName);

    await wrapper.find('#on-save').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('sendInputOrgNameInterface');

    const emittedPayload: InputOrgNameDtoInterface = wrapper.emitted('sendInputOrgNameInterface')![0]![0] as InputOrgNameDtoInterface;
    expect(emittedPayload.orgNameKana).toBe(newOrgNameKana);
    expect(emittedPayload.orgName).toBe(newOrgName);
  });

  it('emits "sendCancelInputOrgName" on cancel', async () => {
    const wrapper = mount(InputOrgName, {
      props: {
        editDto: mockEditDto,
      },
    });

    await wrapper.find('#on-cancel').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('sendCancelInputOrgName');
    expect(wrapper.emitted('sendCancelInputOrgName')![0]).toEqual([]);
  });
});
