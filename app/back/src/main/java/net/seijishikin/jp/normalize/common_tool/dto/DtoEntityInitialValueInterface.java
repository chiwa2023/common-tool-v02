package net.seijishikin.jp.normalize.common_tool.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * DtoとEntity共通初期設定Interface
 */
public interface DtoEntityInitialValueInterface extends Serializable { // SUPPRESS CHECKSTYLE InterfaceType

    /** 初期データ(String) */
    String INIT_STRING = ""; // NOPMD ConstantsInterface

    /** 初期データ(Integer) */
    int INIT_INTEGER = 0; // NOPMD ConstantsInterface

    /** 初期データ(Long) */
    long INIT_LONG = 0L; // NOPMD ConstantsInterface

    /** 初期データ(Short) */
    short INIT_SHORT = 0; // NOPMD ConstantsInterface

    /** 初期データ(Short) */
    boolean INIT_BOOLEAN = false; // NOPMD ConstantsInterface

    /** 初期データ(日付) */
    LocalDate INIT_DATE = LocalDate.of(1948, 7, 28); // NOPMD ConstantsInterface

    /** 初期データ(Timestamp) */
    LocalDateTime INIT_TIMESTAMP = LocalDateTime.of(INIT_DATE, LocalTime.MAX); // NOPMD ConstantsInterface

}
