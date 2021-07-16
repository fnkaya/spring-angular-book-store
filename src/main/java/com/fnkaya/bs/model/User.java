package com.fnkaya.bs.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users", indexes = {@Index(name = "idx_username", columnList = "uname")})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "uname", length = 100, unique = true)
    private String username;

    @Column(name = "passwd", length = 100)
    private String password;

    @Column(length = 100)
    private String name;

    @Column(length = 100)
    private String email;

    private Boolean admin;

    private String city;

    private String state;

    private String address;

    private String zipcode;

    @Column(name = "phone_number")
    private String phoneNumber;
}
