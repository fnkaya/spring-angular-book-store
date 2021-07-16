package com.fnkaya.bs.service;

import com.fnkaya.bs.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IOrderService {

    Order save(Order order);

    Page<Order> getByCustomerId(Long id, Pageable pageable);

    Order getById(Long id);

    Page<Order> getAll(Pageable pageable);
}
