package com.esprit.pi_project.services;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    public static final String ACCOUNT_SID = "ACc822d8b2d4c6b3d5bfed4e562389a347";
    public static final String AUTH_TOKEN = "ce19b5ec17d535fa4c37cc40e351da23";

    public void sendSMS(String to, String messageBody) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message message = Message.creator(
                        new PhoneNumber(to),
                        new PhoneNumber("+12014853675"),
                        messageBody)
                .create();

        System.out.println("Message SID: " + message.getSid());
    }
}
