package com.fnkaya.bs.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 100)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(length = 100)
    private String author;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "unit_in_stock")
    private int unitsInStock;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
