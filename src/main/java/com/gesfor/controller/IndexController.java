package com.gesfor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author hallef
 */
@Controller
public class IndexController {
    
    @RequestMapping("/")
    public ModelAndView index() {
        return new ModelAndView("Index2");
    }
}
