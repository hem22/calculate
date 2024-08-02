package com.example.addcalculate;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
@Slf4j
public class Controller {
    @GetMapping("/")
    public String home() {
        return "list";
    }

    @GetMapping("/add")
    public String add() {
        return "addSik";
    }

    @GetMapping("/detail")
    public String detail() {
        return "detail";
    }

    @GetMapping("/snsLogin")
    public String snsLogin() {
        return "snsLogin";
    }

    @GetMapping("/info")
    public String info() {
        return "info";
    }


}
