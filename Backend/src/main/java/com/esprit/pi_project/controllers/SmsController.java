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
    public static final String ACCOUNT_SID = "ACd683caf1e8421436c76bd0e110fa4c9a";
    public static final String AUTH_TOKEN = "41df0fcacde0c384ca308ba66cba5281";

    @GetMapping(value = "/reward/sendSMS")
    public ResponseEntity<String> sendSMS(HttpServletRequest request, @RequestParam("rewardName") String rewardName, @RequestParam("cost") float cost,@RequestParam("NbDispo") int NbDispo) throws IOException {

            // Process user data
            Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

            // Send message
            Message.creator(new PhoneNumber("+21625704316"), new PhoneNumber("+12569801290"), "Hello from EspritClaim 📞 the user  had buyed the reward " + rewardName + "with the price " + cost + " il vous reste " + NbDispo +" article dans cette reward").create();

            return new ResponseEntity<String>("Message sent successfully", HttpStatus.OK);


            // Handle the case where the Optional<User> is empty



    }

}
