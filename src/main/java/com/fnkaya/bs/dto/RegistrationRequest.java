package com.fnkaya.bs.dto;

import lombok.Data;

@Data
public class RegistrationRequest {

    private String name;
    private String username;
    private String email;
    private String password;
}
