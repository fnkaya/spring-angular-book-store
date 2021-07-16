package com.fnkaya.bs.service;

import com.fnkaya.bs.dto.BookDto;
import com.fnkaya.bs.dto.CustomPage;
import com.fnkaya.bs.model.Book;
import com.fnkaya.bs.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class BookService implements IBookService{

    private final BookRepository repository;
    private final ModelMapper modelMapper;

    @Override
    public BookDto save(BookDto bookDto) {
        if (bookDto.getName() == null)
            throw new IllegalArgumentException("Book name can not be null");
        Book book = modelMapper.map(bookDto, Book.class);
        book = repository.save(book);
        return modelMapper.map(book, BookDto.class);
    }

    @Override
    public Boolean delete(Long id) {
        if (repository.getOne(id) == null)
            throw new IllegalArgumentException("Book does not exist! ID: " + id);
        repository.deleteById(id);
        return Boolean.TRUE;
    }

    @Override
    public BookDto getById(Long id) {
        Book book = repository.getOne(id);
        if (book == null)
            throw new IllegalArgumentException("Book does not exist! ID: " + id);
        return modelMapper.map(book, BookDto.class);
    }

    @Override
    public CustomPage<BookDto> getPage(Pageable pageable) {
        Page<Book> bookPage = repository.findAll(pageable);
        CustomPage page = new CustomPage<BookDto>();
        BookDto[] bookDtos = modelMapper.map(bookPage.getContent(), BookDto[].class);
        page.setData(bookPage, Arrays.asList(bookDtos));
        return page;
    }

    @Override
    public CustomPage<BookDto> getPageByCategoryId(Integer categoryId, Pageable pageable) {
        Page<Book> bookPage = repository.findByCategoryId(categoryId, pageable);
        CustomPage page = new CustomPage<BookDto>();
        BookDto[] bookDtos = modelMapper.map(bookPage.getContent(), BookDto[].class);
        page.setData(bookPage, Arrays.asList(bookDtos));
        return page;
    }

    @Override
    public CustomPage<BookDto> getPageByName(String name, Pageable pageable){
        Page<Book> bookPage = repository.findByNameContainingIgnoreCase(name, pageable);
        System.out.println(bookPage.getContent().toString());
        CustomPage page = new CustomPage<BookDto>();
        BookDto[] bookDtos = modelMapper.map(bookPage.getContent(), BookDto[].class);
        page.setData(bookPage, Arrays.asList(bookDtos));
        return page;
    }
}
