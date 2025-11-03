import { describe, it, expect } from 'vitest';
import { createPagingData } from '../../main/util/createPagingData';
import type { PagingDto } from '../../main/dto/paging/pagingDto';

describe('createPagingData', () => {

    it('allCountが0以下の時場合は空リスト', () => {
        const result1: PagingDto[] = createPagingData(0, 10, 0);
        expect(result1.length).toBe(0);

        const result: PagingDto[] = createPagingData(-1, 20, 15);
        expect(result.length).toBe(0);

    });

    it('十分なページ数があって、その中央付近であれば最初、経過、-2,-1,0,1,2,経過,最後', () => {
        const result: PagingDto[] = createPagingData(232, 10, 12); // 24ページの6ページ目
        expect(result.length).toBe(9);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)…3点リーダ
        const dto1 = result[1];
        expect(dto1?.pageNumber).toBe(-1);
        expect(dto1?.pageText).toBe("...");
        expect(dto1?.viewClass).toBe("dead");
        // (2)
        const dto2 = result[2];
        expect(dto2?.pageNumber).toBe(10);
        expect(dto2?.pageText).toBe("11");
        expect(dto2?.viewClass).toBe("");
        // (3)
        const dto3 = result[3];
        expect(dto3?.pageNumber).toBe(11);
        expect(dto3?.pageText).toBe("12");
        expect(dto3?.viewClass).toBe("");
        // (4)
        const dto4 = result[4];
        expect(dto4?.pageNumber).toBe(12);
        expect(dto4?.pageText).toBe("13");
        expect(dto4?.viewClass).toBe("active");
        // (5)
        const dto5 = result[5];
        expect(dto5?.pageNumber).toBe(13);
        expect(dto5?.pageText).toBe("14");
        expect(dto5?.viewClass).toBe("");
        // (6)
        const dto6 = result[6];
        expect(dto6?.pageNumber).toBe(14);
        expect(dto6?.pageText).toBe("15");
        expect(dto6?.viewClass).toBe("");
        // (7)
        const dto7 = result[7];
        expect(dto7?.pageNumber).toBe(-1);
        expect(dto7?.pageText).toBe("...");
        expect(dto7?.viewClass).toBe("dead");
        // (8)
        const dto8 = result[8];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });

    it('十分なページ数があるかつ最初のページを表示する場合、0,1,2,経過,最後', () => {
        const result: PagingDto[] = createPagingData(232, 10, 0); // 24ページの0ページ目
        expect(result.length).toBe(5);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("active");
        // (1)
        const dto2 = result[1];
        expect(dto2?.pageNumber).toBe(1);
        expect(dto2?.pageText).toBe("2");
        expect(dto2?.viewClass).toBe("");
        // (2)
        const dto3 = result[2];
        expect(dto3?.pageNumber).toBe(2);
        expect(dto3?.pageText).toBe("3");
        expect(dto3?.viewClass).toBe("");
        // (3)
        const dto7 = result[3];
        expect(dto7?.pageNumber).toBe(-1);
        expect(dto7?.pageText).toBe("...");
        expect(dto7?.viewClass).toBe("dead");
        // (4)
        const dto8 = result[4];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });

    it('十分なページ数がある、かつ最後のページの表示する場合、最初、経過、-2,-1,0', () => {
        const result: PagingDto[] = createPagingData(232, 10, 23); // 24ページの6ページ目
        expect(result.length).toBe(5);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)…3点リーダ
        const dto1 = result[1];
        expect(dto1?.pageNumber).toBe(-1);
        expect(dto1?.pageText).toBe("...");
        expect(dto1?.viewClass).toBe("dead");
        // (2)
        const dto5 = result[2];
        expect(dto5?.pageNumber).toBe(21);
        expect(dto5?.pageText).toBe("22");
        expect(dto5?.viewClass).toBe("");
        // (3)
        const dto6 = result[3];
        expect(dto6?.pageNumber).toBe(22);
        expect(dto6?.pageText).toBe("23");
        expect(dto6?.viewClass).toBe("");
        // (4)
        const dto8 = result[4];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("active");
    });

    it('十分なページ数があって、2ページ目であれば、-1,0,1,2,経過,最後', () => {
        const result: PagingDto[] = createPagingData(232, 10, 1); // 24ページの2ページ目
        expect(result.length).toBe(6);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)
        const dto2 = result[1];
        expect(dto2?.pageNumber).toBe(1);
        expect(dto2?.pageText).toBe("2");
        expect(dto2?.viewClass).toBe("active");
        // (2)
        const dto5 = result[2];
        expect(dto5?.pageNumber).toBe(2);
        expect(dto5?.pageText).toBe("3");
        expect(dto5?.viewClass).toBe("");
        // (3)
        const dto6 = result[3];
        expect(dto6?.pageNumber).toBe(3);
        expect(dto6?.pageText).toBe("4");
        expect(dto6?.viewClass).toBe("");
        // (4)
        const dto7 = result[4];
        expect(dto7?.pageNumber).toBe(-1);
        expect(dto7?.pageText).toBe("...");
        expect(dto7?.viewClass).toBe("dead");
        // (5)
        const dto8 = result[5];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });

    it('十分なページ数があって、後ろから２ページ目であれば、最初、経過、-2,-1,0,最後', () => {
        const result: PagingDto[] = createPagingData(232, 10, 22); // 24ページの22ページ目
        expect(result.length).toBe(6);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)…3点リーダ
        const dto1 = result[1];
        expect(dto1?.pageNumber).toBe(-1);
        expect(dto1?.pageText).toBe("...");
        expect(dto1?.viewClass).toBe("dead");
        // (2)
        const dto4 = result[2];
        expect(dto4?.pageNumber).toBe(20);
        expect(dto4?.pageText).toBe("21");
        expect(dto4?.viewClass).toBe("");
        // (3)
        const dto5 = result[3];
        expect(dto5?.pageNumber).toBe(21);
        expect(dto5?.pageText).toBe("22");
        expect(dto5?.viewClass).toBe("");
        // (4)
        const dto6 = result[4];
        expect(dto6?.pageNumber).toBe(22);
        expect(dto6?.pageText).toBe("23");
        expect(dto6?.viewClass).toBe("active");
        // (5)
        const dto8 = result[5];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });




    it('十分なページ数があって、最初から3ページ目であれば、最初、-2,-1,0,1,2,経過,最後', () => {
        const result: PagingDto[] = createPagingData(232, 10, 2); // 24ページの2ページ目
        expect(result.length).toBe(7);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)
        const dto2 = result[1];
        expect(dto2?.pageNumber).toBe(1);
        expect(dto2?.pageText).toBe("2");
        expect(dto2?.viewClass).toBe("");
        // (2)
        const dto3 = result[2];
        expect(dto3?.pageNumber).toBe(2);
        expect(dto3?.pageText).toBe("3");
        expect(dto3?.viewClass).toBe("active");
        // (3)
        const dto4 = result[3];
        expect(dto4?.pageNumber).toBe(3);
        expect(dto4?.pageText).toBe("4");
        expect(dto4?.viewClass).toBe("");
        // (4)
        const dto5 = result[4];
        expect(dto5?.pageNumber).toBe(4);
        expect(dto5?.pageText).toBe("5");
        expect(dto5?.viewClass).toBe("");
        // (5)
        const dto7 = result[5];
        expect(dto7?.pageNumber).toBe(-1);
        expect(dto7?.pageText).toBe("...");
        expect(dto7?.viewClass).toBe("dead");
        // (6)
        const dto8 = result[6];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });


    it('十分なページ数があって、最後から3ページ目であれば、最初、経過、-2,-1,0,1,2,最後', () => {
        const result: PagingDto[] = createPagingData(232, 10, 21); // 24ページの21ページ目
        expect(result.length).toBe(7);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)…3点リーダ
        const dto1 = result[1];
        expect(dto1?.pageNumber).toBe(-1);
        expect(dto1?.pageText).toBe("...");
        expect(dto1?.viewClass).toBe("dead");
        // (2)
        const dto3 = result[2];
        expect(dto3?.pageNumber).toBe(19);
        expect(dto3?.pageText).toBe("20");
        expect(dto3?.viewClass).toBe("");
        // (3)
        const dto4 = result[3];
        expect(dto4?.pageNumber).toBe(20);
        expect(dto4?.pageText).toBe("21");
        expect(dto4?.viewClass).toBe("");
        // (4)
        const dto5 = result[4];
        expect(dto5?.pageNumber).toBe(21);
        expect(dto5?.pageText).toBe("22");
        expect(dto5?.viewClass).toBe("active");
        // (5)
        const dto6 = result[5];
        expect(dto6?.pageNumber).toBe(22);
        expect(dto6?.pageText).toBe("23");
        expect(dto6?.viewClass).toBe("");
        // (6)
        const dto8 = result[6];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });

    it('十分なページ数があって、最後から4ページ目であれば、最初、経過、-2,-1,0,1,2,経過,最後', () => {
        const result: PagingDto[] = createPagingData(232, 10, 3); // 24ページの4ページ目
        expect(result.length).toBe(8);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)
        const dto2 = result[1];
        expect(dto2?.pageNumber).toBe(1);
        expect(dto2?.pageText).toBe("2");
        expect(dto2?.viewClass).toBe("");
        // (2)
        const dto3 = result[2];
        expect(dto3?.pageNumber).toBe(2);
        expect(dto3?.pageText).toBe("3");
        expect(dto3?.viewClass).toBe("");
        // (3)
        const dto4 = result[3];
        expect(dto4?.pageNumber).toBe(3);
        expect(dto4?.pageText).toBe("4");
        expect(dto4?.viewClass).toBe("active");
        // (4)
        const dto5 = result[4];
        expect(dto5?.pageNumber).toBe(4);
        expect(dto5?.pageText).toBe("5");
        expect(dto5?.viewClass).toBe("");
        // (5)
        const dto6 = result[5];
        expect(dto6?.pageNumber).toBe(5);
        expect(dto6?.pageText).toBe("6");
        expect(dto6?.viewClass).toBe("");
        // (6)
        const dto7 = result[6];
        expect(dto7?.pageNumber).toBe(-1);
        expect(dto7?.pageText).toBe("...");
        expect(dto7?.viewClass).toBe("dead");
        // (7)
        const dto8 = result[7];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });

    it('十分なページ数があって、最後から4ページ目であれば、最初、経過、-2,-1,0,1,2,最後', () => {
        const result: PagingDto[] = createPagingData(232, 10, 20); // 24ページの21ページ目
        expect(result.length).toBe(8);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)…3点リーダ
        const dto1 = result[1];
        expect(dto1?.pageNumber).toBe(-1);
        expect(dto1?.pageText).toBe("...");
        expect(dto1?.viewClass).toBe("dead");
        // (2)
        const dto2 = result[2];
        expect(dto2?.pageNumber).toBe(18);
        expect(dto2?.pageText).toBe("19");
        expect(dto2?.viewClass).toBe("");
        // (3)
        const dto3 = result[3];
        expect(dto3?.pageNumber).toBe(19);
        expect(dto3?.pageText).toBe("20");
        expect(dto3?.viewClass).toBe("");
        // (4)
        const dto4 = result[4];
        expect(dto4?.pageNumber).toBe(20);
        expect(dto4?.pageText).toBe("21");
        expect(dto4?.viewClass).toBe("active");
        // (5)
        const dto5 = result[5];
        expect(dto5?.pageNumber).toBe(21);
        expect(dto5?.pageText).toBe("22");
        expect(dto5?.viewClass).toBe("");
        // (6)
        const dto6 = result[6];
        expect(dto6?.pageNumber).toBe(22);
        expect(dto6?.pageText).toBe("23");
        expect(dto6?.viewClass).toBe("");
        // (7)
        const dto8 = result[7];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });

    it('十分なページ数があって、その５ページであれば、最初、経過,-2,-1,0,1,2,経過,最後となる。要素数9で、その他のいままでテストに上がっていないページ番号は一緒', () => {
        const result: PagingDto[] = createPagingData(232, 10, 4); // 24ページの5ページ目
        expect(result.length).toBe(9);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)…3点リーダ
        const dto1 = result[1];
        expect(dto1?.pageNumber).toBe(-1);
        expect(dto1?.pageText).toBe("...");
        expect(dto1?.viewClass).toBe("dead");

        // (2)
        const dto2 = result[2];
        expect(dto2?.pageNumber).toBe(2);
        expect(dto2?.pageText).toBe("3");
        expect(dto2?.viewClass).toBe("");
        // (3)
        const dto3 = result[3];
        expect(dto3?.pageNumber).toBe(3);
        expect(dto3?.pageText).toBe("4");
        expect(dto3?.viewClass).toBe("");
        // (4)
        const dto4 = result[4];
        expect(dto4?.pageNumber).toBe(4);
        expect(dto4?.pageText).toBe("5");
        expect(dto4?.viewClass).toBe("active");
        // (5)
        const dto5 = result[5];
        expect(dto5?.pageNumber).toBe(5);
        expect(dto5?.pageText).toBe("6");
        expect(dto5?.viewClass).toBe("");
        // (6)
        const dto6 = result[6];
        expect(dto6?.pageNumber).toBe(6);
        expect(dto6?.pageText).toBe("7");
        expect(dto6?.viewClass).toBe("");
        // (7)
        const dto7 = result[7];
        expect(dto7?.pageNumber).toBe(-1);
        expect(dto7?.pageText).toBe("...");
        expect(dto7?.viewClass).toBe("dead");
        // (8)
        const dto8 = result[8];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });

    it('十分なページ数があって、最後から５ページであれば、最初、経過、-2,-1,0,1,2,となる。最後要素数9で、その他のいままでテストに上がっていないページ番号は一緒', () => {
        const result: PagingDto[] = createPagingData(232, 10, 19); // 24ページの19ページ目
        expect(result.length).toBe(9);
        // (0)
        const dto0 = result[0];
        expect(dto0?.pageNumber).toBe(0);
        expect(dto0?.pageText).toBe("1");
        expect(dto0?.viewClass).toBe("");
        // (1)…3点リーダ
        const dto1 = result[1];
        expect(dto1?.pageNumber).toBe(-1);
        expect(dto1?.pageText).toBe("...");
        expect(dto1?.viewClass).toBe("dead");
        // (2)
        const dto2 = result[2];
        expect(dto2?.pageNumber).toBe(17);
        expect(dto2?.pageText).toBe("18");
        expect(dto2?.viewClass).toBe("");
        // (3)
        const dto3 = result[3];
        expect(dto3?.pageNumber).toBe(18);
        expect(dto3?.pageText).toBe("19");
        expect(dto3?.viewClass).toBe("");
        // (4)
        const dto4 = result[4];
        expect(dto4?.pageNumber).toBe(19);
        expect(dto4?.pageText).toBe("20");
        expect(dto4?.viewClass).toBe("active");
        // (5)
        const dto5 = result[5];
        expect(dto5?.pageNumber).toBe(20);
        expect(dto5?.pageText).toBe("21");
        expect(dto5?.viewClass).toBe("");
        // (6)
        const dto6 = result[6];
        expect(dto6?.pageNumber).toBe(21);
        expect(dto6?.pageText).toBe("22");
        expect(dto6?.viewClass).toBe("");

        // (7)
        const dto7 = result[7];
        expect(dto7?.pageNumber).toBe(-1);
        expect(dto7?.pageText).toBe("...");
        expect(dto7?.viewClass).toBe("dead");

        // (8)
        const dto8 = result[8];
        expect(dto8?.pageNumber).toBe(23);
        expect(dto8?.pageText).toBe("24");
        expect(dto8?.viewClass).toBe("");
    });

    it('limitが0以下の時場合エラー', () => {
        // ページ数を定数で指定しているのが誤り→実装段階で早く発覚したい
        expect(() => createPagingData(232, -5, 0)).toThrow();
    });


    it('pageNumberが妥当な範囲でない', () => {
        // ページがおかしい(backからはこういう値は返ってこないと思う、多分)
        const result1: PagingDto[] = createPagingData(36, 10, 121);
        expect(result1.length).toBe(0);

        // 境界(上)
        const result2: PagingDto[] = createPagingData(36, 10, 24);
        expect(result2.length).toBe(0);

        // 境界(下)
        const result3: PagingDto[] = createPagingData(36, 10, -1);
        expect(result3.length).toBe(0);
    });

});
