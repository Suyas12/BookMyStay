package com.book.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.book.DTO.ForgotPassword;
import com.book.entities.User;
import com.book.jwt.util.JwtUtil;
import com.book.service.EmailService;
import com.book.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

	@Autowired
	private UserService userService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private AuthenticationManager manager;

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) throws Exception {
		String email = credentials.get("email");
		String password = credentials.get("password");
		try {
			User user = userService.findByEmail(email);
			UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);
			Authentication authenticatedDetails = manager.authenticate(authToken);
			String jwt = jwtUtil.generateJwtToken(authenticatedDetails);
			if (user.isEnabled()) {
				Map<String, Object> response = new HashMap<>();
				response.put("message", "Login successful");
				response.put("user", user); // Return the role to determine navigation
				response.put("token", jwt);
				return ResponseEntity.ok(response);
			} else {
				Map<String, Object> response = new HashMap<>();
				response.put("message", "Invalid email or password");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}
		} catch (Exception ex) {

			throw new Exception("inavalid username/password");
		}
	}

	@PostMapping("/register")
	public Map<String, String> register(@RequestBody User user) {
		Map<String, String> response = new HashMap<>();
		if (userService.findByEmail(user.getEmail()) != null) {
			response.put("message", "User already exists");
			return response;
		} else {
			userService.save(user);
			response.put("message", "User registered successfully");
			return response;
		}

	}

	@PostMapping("/forgotPassword")
	public String forgotPassword(@RequestBody ForgotPassword fp) {
		User user = userService.findByEmail(fp.getEmail());
		if (user != null) {
			String recipient = user.getEmail();
			String subject = "Your credentials for the Payment reminder app";
			String text = String.format(
					"Your login credentials \nEmail : " + user.getEmail() + "\nPassword : " + user.getPassword() + ".");

			emailService.sendEmail(recipient, subject, text);

			return "Your password has been sent on your email";
		} else
			return "Account not exist";

	}
}
