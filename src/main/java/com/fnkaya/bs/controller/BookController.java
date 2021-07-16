package com.fnkaya.bs.controller;

import com.fnkaya.bs.dto.BookDto;
import com.fnkaya.bs.dto.CustomPage;
import com.fnkaya.bs.service.IBookService;
import com.fnkaya.bs.util.APIPath;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(APIPath.BookPath.CTRL)
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class BookController {

    private final IBookService service;

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getById(@PathVariable("id") Long id){
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<CustomPage<BookDto>> getPage(Pageable pageable){
        return ResponseEntity.ok(service.getPage(pageable));
    }

    @PostMapping
    public ResponseEntity<BookDto> save(@RequestBody BookDto bookDto){
        return ResponseEntity.ok(service.save(bookDto));
    }

    @PutMapping
    public ResponseEntity<BookDto> update(@RequestBody BookDto bookDto){
        return ResponseEntity.ok(service.save(bookDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable("id") Long id){
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/category")
    public ResponseEntity<CustomPage<BookDto>> getPageByCategoryId(@RequestParam("id") Integer categoryId, Pageable pageable){
        return ResponseEntity.ok(service.getPageByCategoryId(categoryId, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<CustomPage<BookDto>> getPageByName(@RequestParam("name") String name, Pageable pageable){
        return ResponseEntity.ok(service.getPageByName(name, pageable));
    }
}
