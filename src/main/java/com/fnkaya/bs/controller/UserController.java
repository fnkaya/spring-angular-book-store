package com.fnkaya.bs.controller;

import com.fnkaya.bs.dto.CustomPage;
import com.fnkaya.bs.dto.UserDto;
import com.fnkaya.bs.service.IUserService;
import com.fnkaya.bs.util.APIPath;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(APIPath.UserPath.CTRL)
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class UserController {

    private final IUserService service;

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/username")
    public ResponseEntity<UserDto> getByUsername(@RequestParam("username") String username){
        return ResponseEntity.ok(service.getByUsername(username));
    }

    @GetMapping
    public ResponseEntity<CustomPage<UserDto>> getPage(Pageable pageable){
        Sort sort = Sort.by("admin").descending();
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        return ResponseEntity.ok(service.getPage(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<CustomPage<UserDto>> searchByName(@RequestParam("name") String name, Pageable pageable){
        return ResponseEntity.ok(service.getPageByName(name, pageable));
    }

    @PostMapping
    public ResponseEntity<UserDto> save(@RequestBody UserDto userDto){
        return ResponseEntity.ok(service.save(userDto));
    }

    @PutMapping
    public ResponseEntity<UserDto> update(@RequestBody UserDto userDto){
        return ResponseEntity.ok(service.update(userDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id){
        return ResponseEntity.ok(service.delete(id));
    }
}
