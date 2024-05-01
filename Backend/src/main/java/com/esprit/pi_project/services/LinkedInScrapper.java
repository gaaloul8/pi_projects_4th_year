package com.esprit.pi_project.services;
import java.io.*;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

@Component
@Service
public class LinkedInScrapper {

    private static final int MAX_PAGES = 10;
    String baseUrl = "https://www.dabadoc.com/tn/psychiatre";
    String outputFile = "psychiatrist_data.csv";

@Scheduled(cron = "0 0 0 1 * *")
    //@Scheduled(cron = "* */2 * * * *")
    public void scrapeLinkedInData()  {

        System.out.println("hello");

        try {
            // Ouvrir le fichier CSV en écriture
            BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile));
            writer.write("Doctor Name,Profile URL,Description\n");
            System.out.println("hello");
            // Récupération des informations de la première page
            scrapePage(baseUrl, writer);

            // Récupération des informations des pages suivantes, s'il y en a jusqu'à la 10ème page
            String nextPageUrl;
            int pageCount = 1; // Initialiser le compteur de page
            do {
                nextPageUrl = getNextPageUrl(baseUrl);
                if (nextPageUrl != null) {
                    scrapePage(nextPageUrl, writer);
                    pageCount++; // Incrémenter le compteur de page
                }
            } while (nextPageUrl != null && pageCount < MAX_PAGES);

            // Fermer le fichier CSV
            writer.close();

            System.out.println("Les données ont été écrites dans le fichier " + outputFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void scrapePage(String url, BufferedWriter writer) throws IOException {
        Document doc = Jsoup.connect(url).get();

        Elements doctors = doc.select(".search_doc_row");

        for (Element doctor : doctors) {
            Element nameElement = doctor.selectFirst("h2 > a");
            String name = nameElement.text();
            String profileUrl = nameElement.attr("href");

            Element descriptionElement = doctor.selectFirst(".col-md-8.col-8 > p");
            String description = descriptionElement.text();
System.out.println(name+profileUrl+description);
            // Écrire les données dans le fichier CSV
            writer.write(name + "," + profileUrl + "," + description + "\n");
        }
    }

    private static String getNextPageUrl(String url) throws IOException {
        Document doc = Jsoup.connect(url).get();
        Element nextPageElement = doc.selectFirst(".pagination .next a");
        if (nextPageElement != null) {
            String nextPageUrl = nextPageElement.attr("abs:href");
            // Vérifier si la page suivante est la même que la page actuelle
            if (nextPageUrl.equals(url)) {
                return null; // Il n'y a pas de page suivante, sortir de la boucle
            }
            return nextPageUrl;
        } else {
            return null; // Il n'y a pas de page suivante, sortir de la boucle
        }
    }


    public String getDataFromCsv() throws IOException {
        // Charger le fichier CSV depuis la classepath
        String filePath = "../Backend/psychiatrist_data.csv";

        // Lire le contenu du fichier CSV en tant que chaîne de caractères
        FileSystemResource resource = new FileSystemResource(filePath);

        // Lire le contenu du fichier CSV en tant que chaîne de caractères
        BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));
        String csvContent = FileCopyUtils.copyToString(reader);

        // Fermer le lecteur
        reader.close();

        return csvContent;
    }


}
