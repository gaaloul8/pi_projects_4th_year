package com.esprit.pi_project.services;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.hibernate.internal.util.config.ConfigurationHelper.extractValue;

@Service
public class TesseractOCRService {

    @Autowired
    private Tesseract tesseract;

    public String recognizeText(InputStream inputStream) throws IOException {
        BufferedImage image = ImageIO.read(inputStream);

        Rectangle nomRegion = new Rectangle(31, 546, 1153, 699); // Example coordinates (adjust as needed)
        String data = extractTextFromRegion(image, nomRegion);

        System.out.println(data);

        return data;
       // return nom;

    }

    private String extractTextFromRegion(BufferedImage image, Rectangle region) {
        try {
            BufferedImage regionImage = image.getSubimage(region.x, region.y, region.width, region.height);

            return tesseract.doOCR(regionImage).trim();
        } catch (TesseractException e) {
            e.printStackTrace();
            return "Error occurred during OCR";
        }
    }
    public ExtractedData extractData(String text) {
        String nom = extractValue(text, "NOM\\s*:\\s*(\\w+)");
        String prenom = extractValue(text, "PRÉNOM\\s*:\\s*(\\w+)");
        String identifiant = extractValue(text, "IDENTIFIANT\\s*:\\s*([\\w\\d]+)");

        return new ExtractedData(nom, prenom, identifiant);
    }

    private String extractValue(String input, String pattern) {
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(input);
        if (m.find()) {
            return m.group(1);
        }
        return null;
    }

    public static class ExtractedData {
        private String nom;
        private String prenom;
        private String identifiant;

        public ExtractedData(String nom, String prenom, String identifiant) {
            this.nom = nom;
            this.prenom = prenom;
            this.identifiant = identifiant;
        }

        public String getNom() {
            return nom;
        }

        public String getPrenom() {
            return prenom;
        }

        public String getIdentifiant() {
            return identifiant;
        }
    }





    }
