package com.ecommerce.backend.controller;

import java.util.*;

import com.ecommerce.backend.service.MembershipClassService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.backend.model.MembershipClass;
import com.ecommerce.backend.repository.MembershipClassRepository;


@RestController
@RequestMapping("/membership-class")
public class MembershipClassController {
    @Autowired
    MembershipClassRepository membershipClassRepository;
    @Autowired
    private MembershipClassService membershipClassService;

    // Using only for key attributes (primary key / unique)
    @GetMapping("/{name}")
    public ResponseEntity<MembershipClass> getMembership_classByName(@PathVariable("name") String name, HttpServletRequest request) {
        MembershipClass membership = membershipClassRepository.findByName(name);
        return ResponseEntity.ok(membership);
    }

    @GetMapping("")
    public ResponseEntity<List<MembershipClass>> getAllMembership_class(@RequestParam(value = "discount_percent", required = false, defaultValue = "0") int discountPercent) {
        List<MembershipClass> membership = membershipClassRepository.findAll();
        if (discountPercent > 0) {
            return ResponseEntity.ok(membershipClassRepository.findByDiscountPercent(discountPercent));
        }
        return ResponseEntity.ok(membership);
    }

    @PostMapping("")
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

            return ResponseEntity.status(400).body(errorResponse);
        }
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateMembership_class(@PathVariable("id") String id, @RequestBody MembershipClass membershipClass, HttpServletRequest request) {
//        try {
//            return membershipClassRepository.findById(Integer.parseInt(id)).map(membership -> {
//                    membership.setId(membershipClass.getId());
//                    return ResponseEntity.ok(membershipClassRepository.save(membership));
//                })
//                .orElseGet(() -> {
//                    Map<String, String> errorResponse = new HashMap<>();
//                    errorResponse.put("message", "Membership class not found");
//                    return ResponseEntity.status(404).body(errorResponse);
//                });
////            membershipClassRepository.save(membershipClass);
////            Map<String, String> response = new HashMap<>();
////            response.put("message", "Membership class updating successfully");
////
////            return ResponseEntity.status(201).body(response);
//        } catch (Exception e) {
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("message", "Error while updating membership class");
//            errorResponse.put("error", e.getMessage());
//
//            return ResponseEntity.status(500).body(errorResponse);
//        }
//    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateMembership_class(@PathVariable("id") int id, @RequestBody Map<String, Object> map, HttpServletRequest request) {
        return membershipClassService.updateFields(id, map);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<?> deleteMembership_class(@PathVariable("name") String name, HttpServletRequest request) {
        try {
            membershipClassService.deleteMembershipClass(name);

            return ResponseEntity.ok(name + " has been deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error deleting membership class: " + e.getMessage());
        }
    }
}
