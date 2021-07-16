package com.fnkaya.bs.repository;

import com.fnkaya.bs.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Book> findByCategoryId(Integer categoryId, Pageable pageable);
}
