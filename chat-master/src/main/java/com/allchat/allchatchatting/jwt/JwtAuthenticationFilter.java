package com.allchat.allchatchatting.jwt;

import com.allchat.allchatchatting.dto.AuthFilterDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements WebFilter {

    private final JwtUtil jwtUtil;

    private ObjectMapper objectMapper = new ObjectMapper();

    @SneakyThrows
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        ServerHttpRequest request = exchange.getRequest();

        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {

            //jwt 토큰 검증
            String username = jwtUtil.validateAndExtract(authHeader.substring(7));
            System.out.println(username);

            //request header 에 username 값 넣기  - jwt claims
            if (username != null) {
                ServerHttpRequest mutateRequest = exchange.getRequest().mutate().header("username", username).build();
                ServerWebExchange mutatedExchange = exchange.mutate().request(mutateRequest).build();

                return chain.filter(mutatedExchange);
            }
        }

        //인증 되지 않은 사용자 접근 시
        ServerHttpResponse response = exchange.getResponse();

        AuthFilterDTO authFilterDTO = AuthFilterDTO.builder()
                .timestamp(LocalDateTime.now().toString())
                .status(401)
                .error("Unauthorized")
                .message("Unauthorized")
                .path(request.getPath().toString())
                .build();

        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().add(HttpHeaders.CONTENT_TYPE, "application/json");
        DataBuffer dataBuffer = response.bufferFactory().wrap(objectMapper.writeValueAsBytes(authFilterDTO));

        return response.writeWith(Mono.just(dataBuffer));
    }
}
