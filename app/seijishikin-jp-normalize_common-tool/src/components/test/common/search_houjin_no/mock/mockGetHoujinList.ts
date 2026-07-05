import { HoujinNoDto, type HoujinNoDtoInterface } from "../../../../main/dto/houjin_no/houjinNoDto";

export default function mockGetHoujinList(times: number): HoujinNoDtoInterface[] {
    const houjinList: HoujinNoDtoInterface[] = [];

    for (let i = 0; i < 2000; i++) {
        const houjin: HoujinNoDtoInterface = new HoujinNoDto();
        const cnt: number = times * 2000 + i + 1;
        houjin.houjinNo = "1234567890" + cnt;
        houjin.process = "11";
        houjin.kind = "401";
        houjin.houjinName = "法人株式会社" + cnt;
        houjin.prefectureName = "東京都" + cnt;
        houjin.cityName = "千代田区架空町" + cnt;
        houjinList.push(houjin);
    }

    return houjinList;
}
