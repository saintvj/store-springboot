package com.vedant.store.controller;

import com.vedant.store.dto.ProductRequest;
import com.vedant.store.model.Product;
import com.vedant.store.repository.ProductRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AdminController {

    private final ProductRepository productRepository;

    public AdminController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/admin")
    public String adminPage(Model model) {
        model.addAttribute("productRequest", new ProductRequest());
        model.addAttribute("products", productRepository.findAll());
        return "admin";
    }

    @GetMapping("/admin/edit/{id}")
    public String editProduct(@PathVariable long id, Model model) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product id"));

        ProductRequest productRequest = new ProductRequest();
        productRequest.setName(product.getName());
        productRequest.setPrice(product.getPrice());

        model.addAttribute("productRequest", productRequest);
        model.addAttribute("productId", id);
        model.addAttribute("products", productRepository.findAll()); // ✅ ADD


        return "admin";
    }

    @GetMapping("/admin/delete/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return "redirect:/";
    }

    @PostMapping("/admin/add")
    public String addOrUpdateProduct(
            @RequestParam(required = false) Long id,
            @jakarta.validation.Valid ProductRequest productRequest,
            org.springframework.validation.BindingResult bindingResult,
            Model model
    ) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("productId", id);
            return "admin";
        }

        Product product;

        if (id != null) {
            Product existing = productRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid product id"));

            product = Product.builder()
                    .name(productRequest.getName())
                    .price(productRequest.getPrice())
                    .build();

            product.setId(existing.getId());
        } else {
            product = Product.builder()
                    .name(productRequest.getName())
                    .price(productRequest.getPrice())
                    .build();
        }

        productRepository.save(product);
        return "redirect:/";
    }
}
