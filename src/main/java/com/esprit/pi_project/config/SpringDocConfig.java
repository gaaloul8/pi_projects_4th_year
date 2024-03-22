package com.esprit.pi_project.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfig {
    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(infoAPI());
    }
    public Info infoAPI() {
        return new Info().title("Esprit Claim")
                .description("Pi Project")
                .contact(contactAPI());
    }
    public Contact contactAPI() {
        Contact contact = new Contact().name("Esprit Claim")
                .email("esprit.claim@esprit.tn")
                ;
        return contact;
    }

    @Bean
    public GroupedOpenApi clubPublicApi() {
        return GroupedOpenApi.builder()
                .group("Club Management API")
                .pathsToMatch("/clubs/**")
                .pathsToExclude("**")
                .build();

    }

    @Bean
    public GroupedOpenApi commentPublicApi() {
        return GroupedOpenApi.builder()
                .group("Comment Management API")
                .pathsToMatch("/comments/**")
                .pathsToExclude("**")
                .build();

    }

    @Bean
    public GroupedOpenApi postPublicApi() {
        return GroupedOpenApi.builder()
                .group("Post Management API")
                .pathsToMatch("/posts/**")
                .pathsToExclude("**")
                .build();

    }






}

