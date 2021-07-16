package com.fnkaya.bs.repository;

import com.fnkaya.bs.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    Page<User> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
