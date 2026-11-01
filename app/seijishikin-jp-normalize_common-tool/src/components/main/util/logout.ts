import { useUserInfoStoreCommon } from "../..";
import { JwtTokenDto } from "../dto/login/jwtTokenDto";
import { LeastUserDto } from "../dto/user/leastUserDto";

function logout() {
        const userInfo = useUserInfoStoreCommon();
        userInfo.jwtDto = new JwtTokenDto();
        userInfo.userDto = new LeastUserDto();
}

export { logout }