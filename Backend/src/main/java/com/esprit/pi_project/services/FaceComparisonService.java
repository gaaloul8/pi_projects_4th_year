package com.esprit.pi_project.services;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.Map;

@Service
public class FaceComparisonService {


    public boolean compareFaces(String base64ImageFromDB, MultipartFile capturedImage) {
        try {
            String base64Image = Base64.getEncoder().encodeToString(capturedImage.getBytes());

            String url = "https://api-us.faceplusplus.com/facepp/v3/compare";

            String queryString = String.format("api_key=%s&api_secret=%s",
                    "QCxladAUsoVLDKhoI3KXfZVaGK0pwM6n", "kvtobV2sN-DTtYceGXSQTrPF57p4Ix5y");

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image_base64_1", base64Image);
            body.add("image_base64_2", base64ImageFromDB);

            byte[] response = post(url + "?" + queryString, body);
            String jsonResponse = new String(response);

            JSONObject jsonObject = new JSONObject(jsonResponse);
            double confidence = jsonObject.getDouble("confidence");
            System.out.println(confidence);

            double confidenceThreshold = 70.0; // Example threshold
            return confidence >= confidenceThreshold;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private byte[] post(String url, MultiValueMap<String, Object> body) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<byte[]> responseEntity = restTemplate.postForEntity(url, requestEntity, byte[].class);
        return responseEntity.getBody();
    }
}
