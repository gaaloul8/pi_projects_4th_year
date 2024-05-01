package com.esprit.pi_project.controllers;

import com.esprit.pi_project.authentification.UserUpdateRequest;
import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.FaceComparisonService;
import com.esprit.pi_project.services.StringToTagListConverter;
import com.esprit.pi_project.services.TesseractOCRService;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.css.Rect;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
@CrossOrigin("*")

public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private TesseractOCRService tesseractOCRService;


    @Autowired
    private FaceComparisonService faceComparisonService;

    @GetMapping()
    public User getUserById(@PathVariable Integer id){
        return this.userService.findById(id);

    }
    @PutMapping("/update")
    public User UpdateUserInfo(@RequestBody User user){
        return this.userService.updateProfile(user);
    }
    @PutMapping("/my")
    public ResponseEntity<User> updateUser(@RequestParam("firstName") String firstName,
                                           @RequestParam("lastName") String lastName,
                                           @RequestParam("password") String password,
                                           @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture,
                                           HttpServletRequest request) throws IOException {
        Optional<User> optionalUser = userService.getUserFromJwt(request);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            UserUpdateRequest updateRequest = new UserUpdateRequest();
            updateRequest.setFirstName(firstName);
            updateRequest.setLastName(lastName);
            updateRequest.setPassword(password);
            updateRequest.setProfilePicture(profilePicture);

            User updatedUser = userService.updateUser(user.getId_user(), updateRequest);
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/complete")
    public ResponseEntity<Object> updateUserProfileWithTagsAndPicture(
            @RequestParam("tags") List<Tag> tags,
            @RequestParam("profilePicture") MultipartFile profilePicture,
            @RequestParam("niveau") String niveau,
            @RequestParam("Identifiant") String Identifiant,
            HttpServletRequest request

    ) throws IOException {


        Optional<User> optionalUser = userService.getUserFromJwt(request);
        System.out.println(optionalUser);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Proceed with your logic using the retrieved user
            //List<Tag> tagList = tagStringConverter.convert(tags);
            // System.out.println(tagList);

            userService.CompletePorofile(user.getId_user(), tags, profilePicture,niveau,Identifiant);

            Map<String, String> response = new HashMap<>();
            response.put("message", "User profile updated successfully.");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authorized.");
        }
    }
    @PostMapping("/upload")
    public Boolean recognizeText(@RequestParam("carte") MultipartFile file,HttpServletRequest request) throws IOException {
        Optional<User> optionalUser = userService.getUserFromJwt(request);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            //System.out.println(user +"printed now");
        }
        String extractedText = tesseractOCRService.recognizeText(file.getInputStream());

        TesseractOCRService.ExtractedData extractedData = tesseractOCRService.extractData(extractedText);

        User user = optionalUser.get();
            System.out.println(user.getIdentifiant());

        boolean isEqual = user.getIdentifiant().equals(extractedData.getIdentifiant());

        return isEqual;
    }

    @GetMapping("/totalUsers")
    public ResponseEntity<Long> getTotalUsers() {
        long totalUsers = userService.getTotalUsers();
        return ResponseEntity.ok(totalUsers);
    }
    @PostMapping("/compare-faces")
    public ResponseEntity<Object> compareFaces(@RequestParam("capturedImage") MultipartFile capturedImageBase64,HttpServletRequest request) {
        {
            Optional<User> optionalUser = userService.getUserFromJwt(request);
            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                //System.out.println(user +"printed now");

                try {

                    // Decode base64 strings to byte arrays
                    String dbImage = user.getProfilePicture();

                    boolean facesMatch = faceComparisonService.compareFaces(dbImage, capturedImageBase64);
                    Map<String, String> response = new HashMap<>();
                    if (facesMatch) {
                        String passwordHint = user.getPasswordHint();
                        response.put("message",""+ passwordHint);

                        return ResponseEntity.ok(response);
                    } else {

                        LocalDateTime lockTime = LocalDateTime.now().plusHours(1);
                        user.setAccountNonLocked(user.isAccountNonLocked());
                        userService.lockUserAccount(user, lockTime);
                        response.put("values",""+lockTime+user.isAccountNonLocked());
                        return ResponseEntity.ok(response);

                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
                }
            }
        }
        return  null;
    }
    @GetMapping("/usersByLevel")
    public ResponseEntity<Map<String, Long>> getUsersByLevel() {
        Map<String, Long> usersByLevel = userService.getUsersByLevel();
        return ResponseEntity.ok(usersByLevel);
    }
    @GetMapping("currUser")
    public ResponseEntity<User> getUserProfile(HttpServletRequest request) {
        Optional<User> userOptional = userService.getUserFromJwt(request);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/totalClubs")
    public int getTotalClubs() {
        return userService.getTotalClubs();
    }
}
