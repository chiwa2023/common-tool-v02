interface ListEntityInterface {
    abolishDate: Date | null;
    addressAllCityId: number;
    addressNameKana: string;
    city: string;
    county: string;
    deleteTimestamp: Date | null;
    deleteUserCode: number;
    deleteUserId: number;
    deleteUserName: string;
    effectDate: Date | null;
    insertTimestamp: Date | null;
    insertUserCode: number;
    insertUserId: number;
    insertUserName: string;
    isLatest: boolean;
    lgCode: string;
    pref: string;
    ward: string;
}

class ListEntity implements ListEntityInterface {
    abolishDate: Date | null;
    addressAllCityId: number;
    addressNameKana: string;
    city: string;
    county: string;
    deleteTimestamp: Date | null;
    deleteUserCode: number;
    deleteUserId: number;
    deleteUserName: string;
    effectDate: Date | null;
    insertTimestamp: Date | null;
    insertUserCode: number;
    insertUserId: number;
    insertUserName: string;
    isLatest: boolean;
    lgCode: string;
    pref: string;
    ward: string;

    constructor() {
        const INIT_STRING: string = "";
        const INIT_NUMBER: number = 0;

        this.abolishDate = null;
        this.addressAllCityId = INIT_NUMBER;
        this.addressNameKana = INIT_STRING;
        this.city = INIT_STRING;
        this.county = INIT_STRING;
        this.deleteTimestamp = null;
        this.deleteUserCode = INIT_NUMBER;
        this.deleteUserId = INIT_NUMBER;
        this.deleteUserName = INIT_STRING;
        this.effectDate = null;
        this.insertTimestamp = null;
        this.insertUserCode = INIT_NUMBER;
        this.insertUserId = INIT_NUMBER;
        this.insertUserName = INIT_STRING;
        this.isLatest = false;
        this.lgCode = INIT_STRING;
        this.pref = INIT_STRING;
        this.ward = INIT_STRING;
    }
}

interface ResponseBodyDtoInterface {
    allCount: number;
    isFailure: boolean;
    limit: number;
    listEntity: ListEntityInterface[];
    message: string;
    pageNumber: number;
}

class ResponseBodyDto implements ResponseBodyDtoInterface {
    allCount: number;
    isFailure: boolean;
    limit: number;
    listEntity: ListEntityInterface[];
    message: string;
    pageNumber: number;

    constructor() {
        this.allCount = 0;
        this.isFailure = false;
        this.limit = 0;
        this.listEntity = [];
        this.message = "";
        this.pageNumber = 0;
    }
}

export { ResponseBodyDto, type ResponseBodyDtoInterface, type ListEntityInterface, ListEntity };
