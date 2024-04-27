package com.esprit.pi_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@EnableAspectJAutoProxy
@EnableScheduling

public class PiProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(PiProjectApplication.class,args);
    }

}
