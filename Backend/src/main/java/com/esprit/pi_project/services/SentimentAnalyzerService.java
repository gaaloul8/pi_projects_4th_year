package com.esprit.pi_project.services;

import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.ling.CoreAnnotations.SentencesAnnotation;
import edu.stanford.nlp.ling.CoreAnnotations.*;
import edu.stanford.nlp.sentiment.SentimentCoreAnnotations;
import edu.stanford.nlp.util.CoreMap;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class SentimentAnalyzerService {

    private final StanfordCoreNLP pipeline;

    public SentimentAnalyzerService() {
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, parse, sentiment");
        pipeline = new StanfordCoreNLP(props);
    }

    public String analyzeSentiment(String text) {
        Annotation annotation = new Annotation(text);
        pipeline.annotate(annotation);

        int mainSentiment = 0;
        int sentenceCount = 0;
        for (CoreMap sentence : annotation.get(SentencesAnnotation.class)) {
            String sentiment = sentence.get(SentimentCoreAnnotations.SentimentClass.class);
            if (sentiment != null) {
                switch (sentiment) {
                    case "Very positive":
                        mainSentiment += 2; // Increase the sentiment score for "Very positive"
                        break;
                    case "Positive":
                        mainSentiment += 1; // Increase the sentiment score for "Positive"
                        break;
                    case "Very negative":
                        mainSentiment -= 2; // Decrease the sentiment score for "Very negative"
                        break;
                    case "Negative":
                        mainSentiment -= 1; // Decrease the sentiment score for "Negative"
                        break;
                    case "Neutral":
                        // No change in sentiment score for "Neutral"
                        break;
                }
                sentenceCount++;
            }
        }

        if (sentenceCount > 0) {
            if (mainSentiment > 0) {
                return "Positive";
            } else if (mainSentiment < 0) {
                return "Negative";
            } else {
                return "Neutral";
            }
        }
        return "Unknown";
    }

}
