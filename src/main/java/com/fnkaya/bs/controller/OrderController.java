package com.fnkaya.bs.controller;

import com.fnkaya.bs.model.Order;
import com.fnkaya.bs.service.IOrderService;
import com.fnkaya.bs.util.APIPath;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(APIPath.OrderPath.CTRL)
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class OrderController {

    private final IOrderService service;

    @GetMapping("/customer/{id}")
    public ResponseEntity<Page<Order>> getById(@PathVariable("id") Long id, Pageable pageable){
        Sort sort = Sort.by("date").descending();
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        return ResponseEntity.ok(service.getByCustomerId(id, pageable));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable("orderId") Long id){
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<Page<Order>> getAll(Pageable pageable){
        Sort sort = Sort.by("date").descending();
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        return ResponseEntity.ok(service.getAll(pageable));
    }

    @PostMapping
    public ResponseEntity<Order> save(@RequestBody Order order){
        return ResponseEntity.ok(service.save(order));
    }

}
