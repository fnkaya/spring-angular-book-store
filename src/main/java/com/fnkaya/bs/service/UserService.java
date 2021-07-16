package com.fnkaya.bs.service;

import com.fnkaya.bs.dto.CustomPage;
import com.fnkaya.bs.dto.RegistrationRequest;
import com.fnkaya.bs.dto.UserDto;
import com.fnkaya.bs.model.User;
import com.fnkaya.bs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService implements IUserService {

    private final UserRepository repository;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDto save(UserDto userDto) {
        if (userDto.getUsername() == null)
            throw new IllegalArgumentException("Username can not be null");
        User user = modelMapper.map(userDto, User.class);
        user = repository.save(user);
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto update(UserDto userDto) {
        if (userDto.getUsername() == null)
            throw new IllegalArgumentException("Username can not be null");
        User user = repository.getOne(userDto.getId());
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setCity(userDto.getCity());
        user.setState(userDto.getState());
        user.setAddress(userDto.getAddress());
        user.setZipcode(userDto.getZipcode());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user = repository.save(user);
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public Boolean delete(Long id) {
        if (repository.getOne(id) == null)
            throw new IllegalArgumentException("User does not exist");
        repository.deleteById(id);
        return Boolean.TRUE;
    }

    @Override
    public UserDto getById(Long id) {
        User user = repository.getOne(id);
        if (user == null)
            throw new IllegalArgumentException("User does not exist");
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto getByUsername(String username) {
        User user = repository.findByUsername(username);
        if (user == null)
            throw new IllegalArgumentException("User does not exist");
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public CustomPage<UserDto> getPage(Pageable pageable) {
        Page<User> userPage = repository.findAll(pageable);
        CustomPage page = new CustomPage<UserDto>();
        UserDto[] userDtos = modelMapper.map(userPage.getContent(), UserDto[].class);
        page.setData(userPage, Arrays.asList(userDtos));
        return page;
    }

    @Override
    public CustomPage<UserDto> getPageByName(String name, Pageable pageable) {
        Page<User> userPage = repository.findByNameContainingIgnoreCase(name, pageable);
        CustomPage page = new CustomPage<UserDto>();
        UserDto[] userDtos = modelMapper.map(userPage.getContent(), UserDto[].class);
        page.setData(userPage, Arrays.asList(userDtos));
        return page;
    }

    @Override
    public Boolean register(RegistrationRequest registrationRequest) {
        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setName(registrationRequest.getName());
            user.setUsername(registrationRequest.getUsername());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setAdmin(false);
            repository.save(user);
            return Boolean.TRUE;
        }
        catch (Exception e){
            log.error("REGISTRATION :", e);
            return Boolean.FALSE;
        }
    }

    @Override
    public Boolean registerAdmin(RegistrationRequest registrationRequest) {
        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setName(registrationRequest.getName());
            user.setUsername(registrationRequest.getUsername());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setAdmin(true);
            repository.save(user);
            return Boolean.TRUE;
        }
        catch (Exception e){
            log.error("REGISTRATION :", e);
            return Boolean.FALSE;
        }
    }
}
