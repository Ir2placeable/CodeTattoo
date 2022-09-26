package com.example.codetattoochat.service;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.client5.http.io.HttpClientConnectionManager;
import org.apache.hc.client5.http.protocol.HttpClientContext;
import org.apache.hc.core5.http.HttpHeaders;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.apache.hc.core5.net.URIBuilder;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.URISyntaxException;

@Component
@Slf4j
@Data
public class GetOpponentInfo {
    HttpClientConnectionManager cm = null;

    // 채팅방 리스트를 웹에 보내주기 위해서는, reservation_id와 confirmed 및 상대방 프로필 이미지와 닉네임이 필요하다.
    // 따라서, 메인 서버에 직접 REST API를 호출하여 요청해야 한다.
    // Apache Client5를 이용하여 GET API 구성
    public String callAPIGet(String url, String param1, String param2, String type) throws URISyntaxException {
        String responseBody = null;
        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(cm).build(); //http 클라이언트 생성
        final HttpGet httpGet = new HttpGet(url+type); //url 명시

        if (type.equals("user")) {
            URI uri = new URIBuilder(httpGet.getUri())
                    .addParameter("user_id", param1)
                    .addParameter("tattooist_id", param2)
                    .build();
            //헤더 설정
            httpGet.setHeader(HttpHeaders.CONTENT_TYPE, "text/plain");
            httpGet.setUri(uri);
        } else if (type.equals("tattooist")) {
            URI uri = new URIBuilder(httpGet.getUri())
                    .addParameter("tattooist_id", param1)
                    .addParameter("user_id", param2)
                    .build();
            //헤더 설정
            httpGet.setHeader(HttpHeaders.CONTENT_TYPE, "text/plain");
            httpGet.setUri(uri);
        }

        log.debug("----------------------------------------");
        log.debug("Executing request {} {}" , httpGet.getMethod() , httpGet.getUri());

        final HttpClientContext clientContext = HttpClientContext.create();
        try(CloseableHttpResponse response = httpClient.execute(httpGet, clientContext)) {
            responseBody = EntityUtils.toString(response.getEntity());
            log.debug("----------------------------------------");
            log.debug("{} ==> {}", response.getCode(), responseBody);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return responseBody;
    }

}
