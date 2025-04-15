package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.model.MembershipClass;

import java.util.List;

public interface MembershipClassRepository extends JpaRepository<MembershipClass,Integer> {
    MembershipClass findByName(String name);
    MembershipClass findById(int id);
    List<MembershipClass> findByDiscountPercent(int percent);
}