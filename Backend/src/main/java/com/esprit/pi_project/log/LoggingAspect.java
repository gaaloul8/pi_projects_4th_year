package com.esprit.pi_project.log;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;


@Aspect
@Component
public class LoggingAspect {
/*
    @Before("execution(* com.esprit.pi_project.services.*.*(..))")
    public void logBeforeServiceMethods(JoinPoint joinPoint) {
        System.out.println("Before method: " + joinPoint.getSignature().getName());
    }

    @After("execution(* com.esprit.pi_project.services.*.*(..))")
    public void logAfterServiceMethods(JoinPoint joinPoint) {
        System.out.println("After method: " + joinPoint.getSignature().getName());
    }


 */
}
