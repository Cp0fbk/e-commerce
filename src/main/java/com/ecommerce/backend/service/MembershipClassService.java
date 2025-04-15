package com.ecommerce.backend.service;

import com.ecommerce.backend.model.MembershipClass;
import com.ecommerce.backend.repository.MembershipClassRepository;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@Service
public class MembershipClassService {

    @Autowired
    MembershipClassRepository membershipClassRepository;

    public ResponseEntity<?> updateFields(int id, Map<String, Object> map) {
        MembershipClass existingMembershipClass = membershipClassRepository.findById(id);
        try {
            if (existingMembershipClass != null) {
                map.forEach((key, value) -> {
                    switch (key) {
                        case "name":
                            existingMembershipClass.setName((String) value);
                            break;
                        case "discountPercent":
                            Integer value1 = (Integer) value;
                            existingMembershipClass.setDiscountPercent(value1.shortValue());
                            break;
                        case "minimumNoPoint":
                            existingMembershipClass.setMinimumNoPoint((Integer) value);
                            break;
                    }
                });
                membershipClassRepository.save(existingMembershipClass);
            }
            Map<String, String> response = new HashMap<>();
            response.put("message", "Membership class updated successfully");

            return ResponseEntity.status(201).body(response);
        }  catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("One or more keys are taken");
        }
    }

    public void deleteMembershipClass(String membership) {
        MembershipClass membershipClass = membershipClassRepository.findByName(membership);
        if (membershipClass != null) {
            membershipClassRepository.delete(membershipClass);
        }
    }
}
