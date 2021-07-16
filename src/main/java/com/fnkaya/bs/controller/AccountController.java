package com.fnkaya.bs.controller;

import com.fnkaya.bs.dto.LoginRequest;
import com.fnkaya.bs.dto.RegistrationRequest;
import com.fnkaya.bs.dto.TokenResponse;
import com.fnkaya.bs.model.User;
import com.fnkaya.bs.repository.UserRepository;
import com.fnkaya.bs.security.JwtTokenUtil;
import com.fnkaya.bs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/token")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class AccountController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;
    private final UserService userService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) throws AuthenticationException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        final User user = userRepository.findByUsername(request.getUsername());
        final String token = jwtTokenUtil.generateToken(user);
        return ResponseEntity.ok(new TokenResponse(user.getUsername(), token));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<Boolean> register(@RequestBody RegistrationRequest registrationRequest) throws AuthenticationException {
        return ResponseEntity.ok(userService.register(registrationRequest));
    }

    @RequestMapping(value = "/register/admin", method = RequestMethod.POST)
    public ResponseEntity<Boolean> registerAdmin(@RequestBody RegistrationRequest registrationRequest) throws AuthenticationException {
        return ResponseEntity.ok(userService.registerAdmin(registrationRequest));
    }
}
