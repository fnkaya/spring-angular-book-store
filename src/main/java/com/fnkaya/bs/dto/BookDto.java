package com.fnkaya.bs.dto;

import com.fnkaya.bs.model.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private Long id;
    private String name;
    private String description;
    private String author;
    private String imageUrl;
    private Double unitPrice;
    private int unitsInStock;
    private Category category;
}
