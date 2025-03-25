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

    @GetMapping("/dev_dateFormat")
    public String dev_date1() {
        return "dev_dateFormat";
    }

    @GetMapping("/parking_01")
    public String parking_01() {
        return "parking_01";
    }

    @GetMapping("/parking_02")
    public String parking_02() {
        return "parking_02";
    }
    @GetMapping("/parking_03")
    public String parking_03() {
        return "parking_03";
    }


}
