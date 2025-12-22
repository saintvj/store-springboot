package com.vedant.store.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProductRequest {

    @NotBlank(message = "Product name cannot be empty")
    private  String name;

    @NotNull(message = "Price is required")
    @Min(value = 1, message = "Price must be greater than 0")
    private  Integer price;

    public String getName() {
        return name;
    }

    public Integer getPrice() {   // ✅ ONLY this getter
        return price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Integer price) { // ✅ Integer, not int
        this.price = price;
    }

}
