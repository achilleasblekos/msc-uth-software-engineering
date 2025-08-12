package com.uth.recipe_management_api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;

@Configuration
public class CorsConfig {
    private static final int CORS_MAX_AGE = 3600;
    private static final String[] CORS_ALLOWED_ORIGINS = {"*"};
    private static final String[] CORS_ALLOWED_METHODS = {
            "POST", "GET", "OPTIONS", "PUT", "DELETE"
    };
    private static final String[] CORS_ALLOWED_HEADERS = {
            "X-Requested-With", "content-type", "Authorization"
    };


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(CORS_ALLOWED_ORIGINS)
                        .allowedMethods(CORS_ALLOWED_METHODS)
                        .maxAge(CORS_MAX_AGE)
                        .allowedHeaders(CORS_ALLOWED_HEADERS)
                ;
            }

//            /**
//             * Intercept the HTTP request for implementations between and after each request
//             * @param registry interceptor to stub
//             */
//            @Override
//            public void addInterceptors(InterceptorRegistry registry) {
//                registry.addInterceptor(requestInterceptor);
//            }
        };
    }
}
