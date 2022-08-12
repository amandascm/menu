package com.aps.menu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aps.menu.dto.MenuCreateRequest;

@RestController
@RequestMapping("item")
public class MenuController {
    
    @GetMapping()
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("Hello Menu");
    }
    @PostMapping(value = "/create")
    public ResponseEntity<MenuCreateRequest> create(@RequestBody MenuCreateRequest request) {
        return ResponseEntity.ok(request);
    }
        
        
        
}
