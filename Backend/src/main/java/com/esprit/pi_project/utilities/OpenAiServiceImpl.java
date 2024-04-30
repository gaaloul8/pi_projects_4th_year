
package com.esprit.pi_project.utilities;

import java.util.ArrayList;
import java.util.List;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
public class OpenAiServiceImpl {

    public static void main(String[] args) {
        List<String> questions = new ArrayList<>();

        // Ajout des questions à la liste
        questions.add("Comment vous sentez-vous généralement sur une échelle de 1 à 10, où 1 est très mal et 10 est très bien ?");
        questions.add("Avez-vous récemment ressenti une tristesse, une nervosité ou une anxiété persistante ?");
        questions.add("Avez-vous des difficultés à entretenir des relations avec votre famille, vos amis ou vos collègues ?");
        questions.add("Avez-vous des pensées négatives ou des sentiments d'insécurité à propos de vous-même ou de votre avenir ?");

        // Affichage des questions
        for (int i = 0; i < questions.size(); i++) {
            System.out.println("Question " + (i + 1) + ": " + questions.get(i));
        }

        List<String> reponses = new ArrayList<>();

        // Ajout des réponses à la liste
        reponses.add("Je me sens à 7 aujourd'hui.");
        reponses.add("Oui, je me sens souvent anxieux ces derniers temps.");
        reponses.add("Oui, j'ai du mal à entretenir des relations avec ma famille.");
        reponses.add("Oui, je lutte souvent avec des pensées négatives à propos de moi-même.");

        // Affichage des réponses
        for (int i = 0; i < reponses.size(); i++) {
            System.out.println("Réponse " + (i + 1) + ": " + reponses.get(i));


        }
        System.out.println(chatGPT("je vais te fournir une liste de question "+questions.toString()+"et de reponse "+reponses.toString()+" je veux que tu fais l'interpretation de l'etat psychologique et repns comme si tu repdons à la personne qui a passe le questionnaire  "));
    }




            public static String chatGPT(String message) {
                String url = "https://api.openai.com/v1/chat/completions";

                String model = "gpt-3.5-turbo"; // current model of chatgpt api

                String apiKey="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"; // API key goes here
                try {
                    // Create the HTTP POST request
                    URL obj = new URL(url);
                    HttpURLConnection con = (HttpURLConnection) obj.openConnection();
                    con.setRequestMethod("POST");
                    con.setRequestProperty("Authorization", "Bearer " + apiKey);
                    con.setRequestProperty("Content-Type", "application/json");

                    // Build the request body
                    String body = "{\"model\": \"" + model + "\", \"messages\": [{\"role\": \"user\", \"content\": \"" + message + "\"}]}";
                    con.setDoOutput(true);
                    OutputStreamWriter writer = new OutputStreamWriter(con.getOutputStream());
                    writer.write(body);
                    writer.flush();
                    writer.close();

                    // Get the response
                    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                    String inputLine;
                    StringBuffer response = new StringBuffer();
                    while ((inputLine = in.readLine()) != null) {
                        response.append(inputLine);
                    }
                    in.close();

                    // returns the extracted contents of the response.
                    return extractContentFromResponse(response.toString());

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            // This method extracts the response expected from chatgpt and returns it.
            public static String extractContentFromResponse(String response) {
                int startMarker = response.indexOf("content")+11; // Marker for where the content starts.
                int endMarker = response.indexOf("\"", startMarker); // Marker for where the content ends.
                return response.substring(startMarker, endMarker); // Returns the substring containing only the response.
            }
        }




