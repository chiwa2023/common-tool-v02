import { LeastUserDto } from "./user/leastUserDto";

interface FrameworkCapsuleDtoInterface {

    /** 最低限ユーザDto */
    userDto: LeastUserDto;

}


class FrameworkCapsuleDto implements FrameworkCapsuleDtoInterface {

    /** 最低限ユーザDto */
    userDto: LeastUserDto;

    constructor() {

        this.userDto = new LeastUserDto();
    }
}

export { FrameworkCapsuleDto, type FrameworkCapsuleDtoInterface }