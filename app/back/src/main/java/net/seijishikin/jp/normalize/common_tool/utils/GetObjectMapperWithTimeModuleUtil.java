package net.seijishikin.jp.normalize.common_tool.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * LocalDate対応ObectMapperを取得する
 */
public final class GetObjectMapperWithTimeModuleUtil {

    /** インスタンス生成避け */
    private GetObjectMapperWithTimeModuleUtil() {
        
    }

    /**
     * LocalDate対応ObectMapperを取得する
     *
     * @return LocalDate対応ObectMapper
     */
    public static ObjectMapper practice() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        return mapper;
    }
}

