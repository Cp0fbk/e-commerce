package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.model.MembershipClass;

public interface MembershipClassRepository extends JpaRepository<MembershipClass,Integer> {
    public MembershipClass findByName(String name);
     
}