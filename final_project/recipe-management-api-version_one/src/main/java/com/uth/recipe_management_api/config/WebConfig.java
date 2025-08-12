package com.uth.recipe_management_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String imagesPath = System.getProperty("user.dir") + "/images/"; // Διαδρομή σχετικά με τον φάκελο του project
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + imagesPath);
    }
}

