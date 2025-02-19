package com.ecommerce.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.model.MembershipClass;
import com.ecommerce.backend.repository.MembershipClassRepo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping(value = "/mem")
public class MembershipClassController {
    @Autowired
    MembershipClassRepo memRepo;

    @PostMapping("/add")
    public MembershipClass addMembership_class(@RequestBody MembershipClass mem) {
        memRepo.save(mem);
        return mem;
    }
    
    @GetMapping("/getAll")
    public List<MembershipClass> getMembership_class() {
        List<MembershipClass> membership = memRepo.findAll();
        return membership;
    }
    
}
