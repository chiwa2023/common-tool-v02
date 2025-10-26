package net.seijishikin.jp.normalize.common_tool.utils;

import org.springframework.batch.core.StepExecution;
import org.springframework.stereotype.Component;

import net.seijishikin.jp.normalize.common_tool.dto.LeastUserDto;

/**
 * バッチ起動条件からユーザ最低限を作成する
 */
@Component
public class CreateUserLeastDtoByBatchParamUtil {

    /** ユーザIdJobParameter名 */
    public static final String USER_ID_PARAM = "userId";

    /** ユーザコードJobParameter名 */
    public static final String USER_CODE_PARAM = "userCode";

    /** ユーザ氏名JobParameter名 */
    public static final String USER_NAME_PARAM = "userName";

    
    /**
     * 処理を行う
     *
     * @param stepExecution StepExecution
     * @return ユーザ最低限Dto
     */
    public LeastUserDto practice(final StepExecution stepExecution) {
        LeastUserDto userDto = new LeastUserDto();

        userDto.setUserPersonId(Math.toIntExact(stepExecution.getJobParameters().getLong("userId")));
        userDto.setUserPersonCode(Math.toIntExact(stepExecution.getJobParameters().getLong("userCode")));
        userDto.setUserPersonName(stepExecution.getJobParameters().getString("userName"));

        return userDto;
    }

}
