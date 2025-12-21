package com.vedant.store.controller;

import com.vedant.store.repository.ProductRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class HomeController {

    private final ProductRepository productRepository;

    public HomeController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("products", productRepository.findAll());
        return "home";

//        List<Product> products = List.of(
//                new Product("Tea Powder", 120),
//                new Product("Sugar", 50),
//                new Product("Coffee", 180)
//        );


    }
}
