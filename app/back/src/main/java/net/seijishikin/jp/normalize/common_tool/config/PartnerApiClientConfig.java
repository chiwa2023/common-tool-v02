package net.seijishikin.jp.normalize.common_tool.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * APIパートナー接続クライアントConfig
 */
@Configuration
public class PartnerApiClientConfig {

    /** ベースURL */
    @Value("${partner.api.base-url:http://localhost:6180}")
    private String baseUrl;

    /** トークン */
    @Value("${partner.api.token:your-token}")
    private String partnerApiToken;

    /** 接続タイムアウト時間 */
    @Value("${partner.api.timeout.connect-ms:5000}")
    private int connectTimeoutMs;

    /** 読み出しタイムアウト時間 */
    @Value("${partner.api.timeout.read-ms:10000}")
    private int readTimeoutMs;

    /** 最大メモリサイズ */
    @Value("${partner.api.max-in-memory-size-mb:16}")
    private int maxInMemorySizeMb;

    /**
     * クライアントBeanを作成する
     * 
     * @return WebClient
     */
    @Bean(name = "partnerApiWebClient")
    WebClient partnerApiWebClient() { // NOPMD DefaultAccessModifier
        HttpClient httpClient = HttpClient.create().option(ChannelOption.CONNECT_TIMEOUT_MILLIS, connectTimeoutMs)
                .responseTimeout(Duration.ofMillis(readTimeoutMs))
                .doOnConnected(conn -> conn.addHandlerLast(new ReadTimeoutHandler(readTimeoutMs, TimeUnit.MILLISECONDS))
                        .addHandlerLast(new WriteTimeoutHandler(readTimeoutMs, TimeUnit.MILLISECONDS)));

        return WebClient.builder().baseUrl(baseUrl).clientConnector(new ReactorClientHttpConnector(httpClient))
                .codecs(configurer -> configurer.defaultCodecs(). //
                        maxInMemorySize(maxInMemorySizeMb * 1024 * 1024)) // SUPPRESS CHECKSTYLE MagicNUmber
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // 長期トークンを自動でX-AUTH-TOKENヘッダーへ付与
                .defaultHeader("X-AUTH-TOKEN", "Bearer " + partnerApiToken).build();
    }

}
