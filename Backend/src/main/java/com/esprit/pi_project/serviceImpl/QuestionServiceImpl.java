package com.esprit.pi_project.serviceImpl;

import com.esprit.pi_project.dao.QuestionDao;
import com.esprit.pi_project.entities.Question;
import com.esprit.pi_project.services.QuestionService;
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    private QuestionDao questionDao;

    public QuestionServiceImpl(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public Question saveQuestion(Question question) throws ParseException {
        Date currentDateTime = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
        String formattedDate = dateFormat.format(currentDateTime);
        Date parsedDate = dateFormat.parse(formattedDate);
        question.setCreatedAt(parsedDate);
        return questionDao.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return questionDao.save(question);
    }

    @Override
    public void deleteQuestion(Integer questionId) {
        questionDao.deleteById(questionId);
    }

    @Override
    public Question getQuestionById(Integer questionId) {
        Optional<Question> optionalQuestion = questionDao.findById(questionId);
        return optionalQuestion.orElse(null);
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionDao.findAll();
    }

    @Override
    public List<Question> searchQuestions(String keyword) {
        return questionDao.findByTitleContainingOrContentContaining(keyword);
    }

    @Override
    public Question upvoteQuestion(Integer questionId) {
        Question question = questionDao.findById(questionId).orElse(null);
        if (question != null) {
            question.setUpvotes(question.getUpvotes() + 1);
            if(question.getDownvotes() != 0){
                question.setDownvotes(question.getDownvotes()-1);
            }
            return questionDao.save(question);
        }
        return null;
    }

    @Override
    public Question downvoteQuestion(Integer questionId) {
        Question question = questionDao.findById(questionId).orElse(null);
        if (question != null) {
            if(question.getUpvotes() != 0) {
                question.setUpvotes(question.getUpvotes() - 1);
            }
            question.setDownvotes(question.getDownvotes()+1);
            return questionDao.save(question);
        }
        return null;    }

    @Override
    public Question closeQuestion(Integer questionId) {
        Question question = questionDao.findById(questionId).orElse(null);
        if (question != null) {
            question.setClosed(true);
            return questionDao.save(question);
        }
        return null;
        }

    @Override
    public List<Question> getAllQuestionsByForumId(Integer forumId) {
        return questionDao.findByForumId(forumId);

    }
    @Value("${webpurify.api.key}")
    private String apiKey;
    private final RestTemplate restTemplate;
    @Override
    public ResponseEntity<String> filterText(String text) {
        String url = "https://api.webpurify.com/services/rest/";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("api_key", apiKey);
        params.add("method", "webpurify.live.replace");
        params.add("text", text);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        return response;
    }
    @Override
    public List<String> getTags(String text) {
        List<String> tags = new ArrayList<>();
        Annotation document = new Annotation(text);
        StanfordCoreNLP pipeline = createPipeline();
        pipeline.annotate(document);

        Map<String, Integer> wordFrequency = new HashMap<>();

        // Extract part-of-speech tags for each word and count their frequency
        List<CoreLabel> tokens = document.get(CoreAnnotations.TokensAnnotation.class);
        for (CoreLabel token : tokens) {
            String word = token.get(CoreAnnotations.TextAnnotation.class);
            String pos = token.get(CoreAnnotations.PartOfSpeechAnnotation.class);

            // Filter out words that are too short or not nouns
            if (word.length() > 2 && pos.startsWith("NN")) {
                wordFrequency.put(word.toLowerCase(), wordFrequency.getOrDefault(word.toLowerCase(), 0) + 1);
            }
        }

        // Exclude words with frequency greater than a threshold
        int frequencyThreshold = 2;
        for (Map.Entry<String, Integer> entry : wordFrequency.entrySet()) {
            if (entry.getValue() <= frequencyThreshold) {
                tags.add(entry.getKey());
            }
        }

        return tags;
    }
    public static StanfordCoreNLP createPipeline() {
        // Load the Stanford NLP pipeline with the specified properties
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize,ssplit,pos");
        return new StanfordCoreNLP(props);
    }
}
