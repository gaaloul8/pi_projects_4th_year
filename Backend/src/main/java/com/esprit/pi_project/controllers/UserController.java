package com.esprit.pi_project.controllers;

import com.esprit.pi_project.entities.Tag;
import com.esprit.pi_project.entities.User;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
@CrossOrigin("*")

public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private TesseractOCRService tesseractOCRService;

    @GetMapping()
    public User getUserById(@PathVariable Integer id){
        return this.userService.findById(id);

    }
    @PutMapping("/update")
    public User UpdateUserInfo(@RequestBody User user){
        return this.userService.updateProfile(user);
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
            System.out.println(tags +"ttttttttttttttttttttttttttttttttttttttttttt");
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
        System.out.println(extractedData.getIdentifiant());
        System.out.println(extractedData.getNom());
        System.out.println(extractedData.getPrenom());
        User user = optionalUser.get();
            System.out.println(user.getIdentifiant());

        boolean isEqual = user.getIdentifiant().equals(extractedData.getIdentifiant());
        System.out.println(isEqual);

        return isEqual;
    }

    @GetMapping("/totalUsers")
    public ResponseEntity<Long> getTotalUsers() {
        long totalUsers = userService.getTotalUsers();
        return ResponseEntity.ok(totalUsers);
    }

    @GetMapping("/usersByLevel")
    public ResponseEntity<Map<String, Long>> getUsersByLevel() {
        Map<String, Long> usersByLevel = userService.getUsersByLevel();
        return ResponseEntity.ok(usersByLevel);
    }

    @GetMapping("/totalClubs")
    public int getTotalClubs() {
        return userService.getTotalClubs();
    }
}
