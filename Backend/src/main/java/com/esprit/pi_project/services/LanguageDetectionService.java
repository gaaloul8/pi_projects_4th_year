package com.esprit.pi_project.services;

import org.springframework.stereotype.Service;

import com.github.pemistahl.lingua.api.*;
import com.github.pemistahl.lingua.api.Language;
import org.springframework.stereotype.Service;

@Service
public class LanguageDetectionService {

    private final LanguageDetector languageDetector;

    public LanguageDetectionService() {
        languageDetector = LanguageDetectorBuilder.fromAllLanguages().build();
    }

    public String detectLanguage(String text) {
        Language language = languageDetector.detectLanguageOf(text);
        return language.toString();
    }
}
