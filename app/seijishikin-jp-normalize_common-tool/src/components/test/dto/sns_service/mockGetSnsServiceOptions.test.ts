import { describe, it, expect } from 'vitest';
import { mockGetSnsServiceOptions } from './mockGetSnsServiceOptions';
import { SnsServiceOptionDto } from '../../../main/dto/sns_service/snsServiceOptionDto';

describe('mockGetSnsServiceOptions', () => {
  it('should return an array of SnsServiceOptionDtoInterface', () => {
    const result = mockGetSnsServiceOptions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(4);

    // Test the "Not Set" DTO
    expect(result[0]).toBeInstanceOf(SnsServiceOptionDto);
    const notSetDto = result[0] as SnsServiceOptionDto;
    expect(notSetDto.value).toBe(0);
    expect(notSetDto.serviceCode).toBe(0);
    expect(notSetDto.text).toBe('');
    expect(notSetDto.portalUrl).toBe('');

    // Test a regular DTO
    expect(result[1]).toBeInstanceOf(SnsServiceOptionDto);
    const dto1 = result[1] as SnsServiceOptionDto;
    expect(dto1.value).toBe(1);
    expect(dto1.serviceCode).toBe(1);
    expect(dto1.text).toBe('SNSサービス1');
    expect(dto1.value).toBe(1);

    expect(result[3]).toBeInstanceOf(SnsServiceOptionDto);
    const dto3 = result[3] as SnsServiceOptionDto;
    expect(dto3.value).toBe(3);
    expect(dto3.serviceCode).toBe(3);
    expect(dto3.text).toBe('SNSサービス3');
  });
});
