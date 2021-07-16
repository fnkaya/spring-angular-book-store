package com.fnkaya.bs.controller;

import com.fnkaya.bs.model.Category;
import com.fnkaya.bs.service.ICategoryService;
import com.fnkaya.bs.util.APIPath;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(APIPath.CategoryPath.CTRL)
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class CategoryController {

    private final ICategoryService service;

    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable("id") int id){
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAll(){
        return ResponseEntity.ok(service.getAll());
    }

    @PostMapping
    public ResponseEntity<Category> save(@RequestBody Category category){
        return ResponseEntity.ok(service.save(category));
    }

}
