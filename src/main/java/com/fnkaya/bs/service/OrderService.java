package com.fnkaya.bs.service;

import com.fnkaya.bs.model.Order;
import com.fnkaya.bs.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService{

    private final OrderRepository repository;

    @Override
    public Order save(Order order) {
        order.setDate(new Date());
        return repository.save(order);
    }

    @Override
    public Page<Order> getByCustomerId(Long id, Pageable pageable) {
        return repository.getByCustomerId(id, pageable);
    }

    @Override
    public Order getById(Long id) {
        return repository.getOne(id);
    }

    @Override
    public Page<Order> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
