package com.vedant.store.controller;
import com.vedant.store.model.Product;
import com.vedant.store.repository.ProductRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AdminController {

    private final ProductRepository productRepository;

    public AdminController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @GetMapping("/admin")
    public String getAdmin(){
        return "admin";
    }

    @PostMapping("/admin/add")
    public String addProduct(
            @RequestParam String name,
            @RequestParam int price
    ){
        Product product = new Product(name,price);
        productRepository.save(product);

        return "redirect:/";
    }

}
