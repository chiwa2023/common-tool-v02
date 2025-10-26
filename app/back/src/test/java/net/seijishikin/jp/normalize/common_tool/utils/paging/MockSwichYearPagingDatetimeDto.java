package net.seijishikin.jp.normalize.common_tool.utils.paging;

import net.seijishikin.jp.normalize.common_tool.dto.paging.FrameworkSwitchYearPagingIntegerDatetimeDto;

/**
 * テスト用年切替
 */
public class MockSwichYearPagingDatetimeDto extends FrameworkSwitchYearPagingIntegerDatetimeDto {

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /** 検索語 */
    private String searchWords = INIT_STRING;

    /**
     * 検索語を取得する
     *
     * @return 検索語
     */
    public String getSearchWords() {
        return searchWords;
    }

    /**
     * 検索語を設定する
     *
     * @param searchWords 検索語
     */
    public void setSearchWords(final String searchWords) {
        this.searchWords = searchWords;
    }

}
