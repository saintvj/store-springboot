package com.vedant.store.model;

import jakarta.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int price;

    protected Product() {
        // Required by JPA
    }

    private Product(Builder builder) {
        this.name = builder.name;
        this.price = builder.price;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String name;
        private int price;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder price(int price) {
            this.price = price;
            return this;
        }

        public Product build() {
            // domain-level safety (optional but good)
            if (name == null || name.isBlank()) {
                throw new IllegalStateException("Product name cannot be empty");
            }
            if (price <= 0) {
                throw new IllegalStateException("Price must be greater than 0");
            }
            return new Product(this);
        }
    }

    // getters only (immutable-style)
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }
}
