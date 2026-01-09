package com.vedant.store.controller;

import com.vedant.store.repository.ProductRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

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
    }


    @GetMapping("/product/{id}")
    public String productDetails(@PathVariable Long id, Model model) {

        var product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product ID"));

        model.addAttribute("product", product);
        return "product";
    }

    @GetMapping("/order/{id}")
    public String orderOnWhatsApp(
            @PathVariable Long id,
            @RequestParam int qty
    ) {

        var product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product ID"));

        int totalPrice = (product.getPrice() * qty) / 1000;

        String quantityLabel =
                qty >= 1000 ? (qty / 1000) + " kg" : qty + " g";

        String message = String.format(
                "Hi, I want to order:%n" +
                        "Product: %s%n" +
                        "Quantity: %s%n" +
                        "Total Price: ₹%d",
                product.getName(),
                quantityLabel,
                totalPrice
        );

        String encodedMessage = java.net.URLEncoder.encode(
                message,
                java.nio.charset.StandardCharsets.UTF_8
        );

        return "redirect:https://wa.me/8446861047?text=" + encodedMessage;
    }


}
