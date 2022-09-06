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
import org.springframework.stereotype.Component;

import java.net.URISyntaxException;

@Component
@Slf4j
@Data
public class GetOpponentInfo {
    HttpClientConnectionManager cm = null;

    public String callAPIGet(String url) throws URISyntaxException {
        String responseBody = null;
        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(cm).build(); //http 클라이언트 생성
        final HttpGet httpGet = new HttpGet(url); //url 명시

        //헤더 설정
        httpGet.setHeader(HttpHeaders.CONTENT_TYPE, "text/plain");

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
