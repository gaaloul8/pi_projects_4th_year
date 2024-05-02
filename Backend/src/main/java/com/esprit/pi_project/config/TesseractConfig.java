package com.esprit.pi_project.config;

import net.sourceforge.tess4j.Tesseract;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TesseractConfig {

    @Bean
    Tesseract tesseract() {
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("src/main/resources/tessdata");
        tesseract.setLanguage("fra");
        tesseract.setTessVariable("user_defined_api","300");
        return tesseract;
    }

}