package com.fnkaya.bs.service;

import com.fnkaya.bs.dto.BookDto;
import com.fnkaya.bs.dto.CustomPage;
import org.springframework.data.domain.Pageable;

public interface IBookService {

    BookDto save(BookDto bookDto);

    Boolean delete(Long id);

    BookDto getById(Long id);

    CustomPage<BookDto> getPage(Pageable pageable);

    CustomPage<BookDto> getPageByCategoryId(Integer categoryId, Pageable pageable);

    CustomPage<BookDto> getPageByName(String name, Pageable pageable);
}
