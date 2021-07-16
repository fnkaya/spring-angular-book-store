package com.fnkaya.bs.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String name;
    private String username;
    private String email;
    private boolean admin;
    private String city;
    private String state;
    private String address;
    private String zipcode;
    private String phoneNumber;
}
