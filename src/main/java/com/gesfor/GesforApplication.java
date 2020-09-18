package com.gesfor;

import com.gesfor.email.EmailService;
import com.gesfor.email.Mail;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GesforApplication implements ApplicationRunner {
    
    @Autowired
    private EmailService emailService;
    
    public static void main(String[] args) {
        SpringApplication.run(GesforApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        
        Mail mail = new Mail();
        mail.setFrom("sudtecnologia@gmail.com");//replace with your desired email
        mail.setMailTo("brunohallef@gmail.com");//replace with your desired email
        mail.setSubject("Email with Spring boot and thymeleaf template!");
        Map<String, Object> model = new HashMap<>();
        model.put("name", "Developer!");
        model.put("location", "United States");
        model.put("sign", "Java Developer");
        mail.setProps(model);
        emailService.sendEmail(mail);
        
    }

}
