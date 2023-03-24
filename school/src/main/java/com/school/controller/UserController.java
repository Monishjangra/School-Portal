package com.school.controller;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.school.entities.JwtRequest;
import com.school.entities.JwtResponse;
import com.school.entities.Role;
import com.school.entities.User;
import com.school.entities.UserRoles;
import com.school.security.JwtUtil;
import com.school.service.UserDetailService;
import com.school.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserDetailService userDetailService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtUtil jwtUtil;

//Add User
	@PostMapping("/addUser")
	public User create(@RequestBody User user) throws Exception {
		Set<UserRoles> roles = new HashSet<>();
		Role role = new Role();
		role.setRoleName("STUDENT");
		roles.add(new UserRoles(user, role));
		return userService.CreateUser(user, roles);
	}
	
//Show User
	@GetMapping("/{email}")
	public User getUser(@PathVariable String email) {
		return userService.getUser(email);
		}
			
//delete User
	@DeleteMapping("/{email}")
	public String deleteUser(@PathVariable String email) {
		return userService.deleteUser(email);
		}
	
//update User
	@PutMapping("/{email}")
	public User updateUserDetails(@RequestBody User user,@PathVariable String email) {
		return userService.updateUser(user, email);
		}
			
//login user
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> generateToken(@RequestBody JwtRequest request) throws Exception{
		try {
			authenticate(request.getEmail(),request.getPassword());
		}
		catch(UsernameNotFoundException exc) {
			exc.printStackTrace();
			throw new Exception("controller: User not found");
		}
		UserDetails user= userDetailService.loadUserByUsername(request.getEmail());
		String token = jwtUtil.generateToken(user.getUsername());
		System.out.println(token);
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
	public void authenticate(String email, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
			
		}catch(DisabledException e) {
			throw new Exception("user disabled" +e.getMessage());  
		}
		
		catch (BadCredentialsException e) {
				throw new Exception("Invalid credentials"+ e.getMessage());
		
		}
	}

//Home page
	@GetMapping("/welcome")
	public ResponseEntity<String> accessData(Principal principal){
		return ResponseEntity.ok("Hello User!" + principal.getName());
	}
	
}
