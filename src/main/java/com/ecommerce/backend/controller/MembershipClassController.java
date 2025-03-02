package com.ecommerce.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ecommerce.backend.service.MembershipClassService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.backend.model.MembershipClass;
import com.ecommerce.backend.repository.MembershipClassRepository;


@RestController
@RequestMapping(value = "/mem")
public class MembershipClassController {
    @Autowired
    MembershipClassRepository membershipClassRepository;
    @Autowired
    private MembershipClassService membershipClassService;

    @PostMapping("/add")
    public ResponseEntity<?> addMembership_class(@RequestBody MembershipClass membershipClass, HttpServletRequest request) {
        try {
            membershipClassRepository.save(membershipClass);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Membership class created successfully");

            return ResponseEntity.status(201).body(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error while adding membership class");
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(500).body(errorResponse);
        }

    }
    
    @GetMapping("/getAll")
    public ResponseEntity<List<MembershipClass>> getMembership_class() {
        List<MembershipClass> membership = membershipClassRepository.findAll();
        return ResponseEntity.ok(membership);
    }

    @DeleteMapping("/delete/{membership}")
    public ResponseEntity<?> deleteMembership_class(@PathVariable String membership, HttpServletRequest request) {
        try {
            membershipClassService.deleteMembershipClass(membership);

            return ResponseEntity.ok(membership + " has been deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting trigger: " + e.getMessage());
        }
    }
}
