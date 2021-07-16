package com.fnkaya.bs.service;

import com.fnkaya.bs.model.Category;
import com.fnkaya.bs.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService{

    private final CategoryRepository repository;

    @Override
    public Category save(Category category) {
        if (category.getName() == null)
            throw new IllegalArgumentException("Category name cannot be null");
        return repository.save(category);
    }

    @Override
    public Boolean delete(Integer id) {
        repository.deleteById(id);
        return true;
    }

    @Override
    public Category getById(Integer id) {
        return repository.getOne(id);
    }

    @Override
    public List<Category> getAll() {
        return repository.findAll();
    }
}
