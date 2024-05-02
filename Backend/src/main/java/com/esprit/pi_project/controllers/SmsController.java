package com.esprit.pi_project.controllers;



import com.esprit.pi_project.entities.Reward;
import com.esprit.pi_project.entities.User;
import com.esprit.pi_project.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class SmsController {
    @Autowired
    UserService userService;
    // Hard-coded Twilio credentials
    public static final String ACCOUNT_SID = "AC2dfad6d935e79825c66b24df8a2d9e1a";
    public static final String AUTH_TOKEN = "4580ae8756b6a3850b4da744bbeaaea3";

    @GetMapping(value = "/reward/sendSMS")
    public ResponseEntity<String> sendSMS(HttpServletRequest request, @RequestParam("rewardName") String rewardName, @RequestParam("cost") float cost,@RequestParam("NbDispo") int NbDispo) throws IOException {
        Optional<User> optionalUser = userService.getUserFromJwt(request);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Process user data
            System.out.println(user);
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

            // Send message
            Message.creator(new PhoneNumber("+21625704316"), new PhoneNumber("+14053344110"), "Hello from EspritClaim 📞 the user " + user.getLastName() + " "+user.getFirstName()+" had buyed the reward " + rewardName + "with the price " + cost + " il vous reste " + NbDispo +" article dans cette reward").create();

            return new ResponseEntity<String>("Message sent successfully", HttpStatus.OK);

        } else {
            // Handle the case where the Optional<User> is empty
            System.out.println("User not found");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update reward");

        }

    }

}
