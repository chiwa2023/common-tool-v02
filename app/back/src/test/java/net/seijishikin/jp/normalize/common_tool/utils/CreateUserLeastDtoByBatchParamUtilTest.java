package net.seijishikin.jp.normalize.common_tool.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.test.MetaDataInstanceFactory;

import net.seijishikin.jp.normalize.common_tool.dto.LeastUserDto;

/**
 * CreateUserLeastDtoByBatchParamUtil単体テスト
 */
class CreateUserLeastDtoByBatchParamUtilTest {

    @Test
    @Tag("TableTruncate")
    void test() throws Exception {

        // 起動引数付きのStepExecutionを作成
        final int insertId = 246;
        final int insertCode = 231;
        final String insertName = "管理者　次郎";
        JobParameters jobParameters = new JobParametersBuilder() //
                .addLong(CreateUserLeastDtoByBatchParamUtil.USER_ID_PARAM, Long.valueOf(insertId))
                .addLong(CreateUserLeastDtoByBatchParamUtil.USER_CODE_PARAM, Long.valueOf(insertCode))
                .addString(CreateUserLeastDtoByBatchParamUtil.USER_NAME_PARAM, insertName) //
                .toJobParameters();
        StepExecution stepExecution = MetaDataInstanceFactory.createStepExecution(jobParameters);

        CreateUserLeastDtoByBatchParamUtil util = new CreateUserLeastDtoByBatchParamUtil();
        LeastUserDto userDto = util.practice(stepExecution);

        // 値がユーザDtoに変換されていること
        assertEquals(insertId, userDto.getUserPersonId());
        assertEquals(insertCode, userDto.getUserPersonCode());
        assertEquals(insertName, userDto.getUserPersonName());

    }

}
