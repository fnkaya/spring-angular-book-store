package com.fnkaya.bs.service;

import com.fnkaya.bs.model.Category;

import java.util.List;

public interface ICategoryService {

    Category save(Category category);

    Boolean delete(Integer id);

    Category getById(Integer id);

    List<Category> getAll();
}
