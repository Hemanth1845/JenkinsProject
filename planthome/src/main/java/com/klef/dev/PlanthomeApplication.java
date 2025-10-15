package com.klef.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class PlanthomeApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(PlanthomeApplication.class, args);
		System.out.println("Project is Running...!");
	}

}
