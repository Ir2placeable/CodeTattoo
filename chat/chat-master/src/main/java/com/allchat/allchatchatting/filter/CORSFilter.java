package com.allchat.allchatchatting.filter;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.Arrays;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE) //제일 처음 필터
public class CORSFilter implements WebFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        ServerHttpResponse response = exchange.getResponse();
        HttpHeaders headers = response.getHeaders();

        headers.setAccessControlAllowOrigin("*");
        headers.setAccessControlAllowCredentials(true);
        headers.setAccessControlAllowMethods(Arrays.asList(HttpMethod.GET, HttpMethod.POST));
        headers.setAccessControlMaxAge(3600);
        headers.setAccessControlAllowHeaders(Arrays.asList("Origin, X-Requested-With, Content-Type, Accept, Key, Authorization, heartbeatTimeout"));

        ServerHttpRequest request = exchange.getRequest();
        if (request.getMethod() == HttpMethod.OPTIONS) {
            response.setStatusCode(HttpStatus.OK);
            return Mono.empty();
        }
        return chain.filter(exchange);
    }
}
