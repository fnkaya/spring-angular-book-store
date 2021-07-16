package com.fnkaya.bs.repository;

import com.fnkaya.bs.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> getByCustomerId(Long id, Pageable pageable);
}
