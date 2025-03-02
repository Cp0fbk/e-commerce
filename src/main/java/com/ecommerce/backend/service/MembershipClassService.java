package com.ecommerce.backend.service;

import com.ecommerce.backend.model.MembershipClass;
import com.ecommerce.backend.repository.MembershipClassRepository;
import jakarta.persistence.EntityNotFoundException;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

@Service
public class MembershipClassService {

    @Autowired
    MembershipClassRepository membershipClassRepository;

    public void deleteMembershipClass(String membership) {
        MembershipClass membershipClass = membershipClassRepository.findByName(membership);
        if (membershipClass != null) {
            membershipClassRepository.delete(membershipClass);
        } else {
            throw new EntityNotFoundException("Membership class " + membership + " not found");
        }
    }
}
