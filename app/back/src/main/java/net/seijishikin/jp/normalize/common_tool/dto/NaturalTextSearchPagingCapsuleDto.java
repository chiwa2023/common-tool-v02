package net.seijishikin.jp.normalize.common_tool.dto;

import net.seijishikin.jp.normalize.common_tool.dto.paging.PagingIntegerDtoInterface;

/**
 * 自然検索条件ページング格納Dto
 */
public class NaturalTextSearchPagingCapsuleDto // NOPMD DataClass
        implements DtoEntityInitialValueInterface, PagingIntegerDtoInterface {

    /** Serialize id */
    private static final long serialVersionUID = 1L;

    /** 初期データ(String) */
    private static final String INIT_String = "";

    /** 初期データ(Integer) */
    private static final Integer INIT_Integer = 0;

    /** 検索語自然検索 */
    private String searchNaturalWords = INIT_String;

    /**
     * 検索語自然検索を取得する
     *
     * @return 検索語自然検索
     */
    public String getSearchNaturalWords() {
        return searchNaturalWords;
    }

    /**
     * 検索語自然検索を設定する
     *
     * @param searchNaturalWords 検索語自然検索
     */
    public void setSearchNaturalWords(final String searchNaturalWords) {
        this.searchNaturalWords = searchNaturalWords;
    }

    /** 全件数 */
    private Integer allCount = INIT_Integer;

    /** 抽出件数 */
    private Integer limit = INIT_Integer;

    /** ページ番号 */
    private Integer pageNumber = INIT_Integer;

    /**
     * 全件数を取得する
     *
     * @return 全件数
     */
    @Override
    public Integer getAllCount() {
        return allCount;
    }

    /**
     * 全件数を設定する
     *
     * @param allCount 全件数全件数
     */
    @Override
    public void setAllCount(final Integer allCount) {
        this.allCount = allCount;
    }

    /**
     * 抽出件数を取得する
     *
     * @return 抽出件数
     */
    @Override
    public Integer getLimit() {
        return limit;
    }

    /**
     * 抽出件数を設定する
     *
     * @param limit 抽出件数
     */
    @Override
    public void setLimit(final Integer limit) {
        this.limit = limit;
    }

    /**
     * ページ番号を取得する
     *
     * @return ページ番号
     */
    @Override
    public Integer getPageNumber() {
        return pageNumber;
    }

    /**
     * ページ番号を設定する
     *
     * @param pageNumber ページ番号
     */
    @Override
    public void setPageNumber(final Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

}
