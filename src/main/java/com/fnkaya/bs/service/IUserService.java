package com.fnkaya.bs.service;

import com.fnkaya.bs.dto.CustomPage;
import com.fnkaya.bs.dto.RegistrationRequest;
import com.fnkaya.bs.dto.UserDto;
import org.springframework.data.domain.Pageable;

public interface IUserService {

    UserDto save(UserDto userDto);

    UserDto update(UserDto userDto);

    Boolean delete(Long id);

    UserDto getById(Long id);

    UserDto getByUsername(String username);

    CustomPage<UserDto> getPage(Pageable pageable);

    CustomPage<UserDto> getPageByName(String name, Pageable pageable);

    Boolean register(RegistrationRequest registrationRequest);

    Boolean registerAdmin(RegistrationRequest registrationRequest);
}
