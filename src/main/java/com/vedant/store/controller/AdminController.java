package com.vedant.store.controller;
import com.vedant.store.dto.ProductRequest;
import com.vedant.store.model.Product;
import com.vedant.store.repository.ProductRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AdminController {

    private final ProductRepository productRepository;

    public AdminController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @GetMapping("/admin")
    public String adminPage(Model model) {
        model.addAttribute("productRequest", new ProductRequest());
        return "admin";
    }



    @PostMapping("/admin/add")
    public String addProduct(
            @jakarta.validation.Valid ProductRequest productRequest,
            org.springframework.validation.BindingResult bindingResult,
            org.springframework.ui.Model model
    ){

        if (bindingResult.hasErrors()) {
            model.addAttribute("productRequest", productRequest);
            return "admin";
        }


        Product product = Product.builder()
                .name(productRequest.getName())
                                    .price(productRequest.getPrice())
                                            .build();

        productRepository.save(product);

        return "redirect:/";
    }

}
