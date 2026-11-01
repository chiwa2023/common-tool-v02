import { useUserInfoStoreCommon } from "../..";
import type { LeastUserDto } from "../dto/user/leastUserDto";

function getLoginUser(): LeastUserDto {

    const userInfo = useUserInfoStoreCommon();
    return userInfo.userDto;
}

export { getLoginUser }