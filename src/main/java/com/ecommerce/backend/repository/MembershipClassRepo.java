package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.backend.model.MembershipClass;

public interface MembershipClassRepo extends JpaRepository<MembershipClass,Integer> {

     
}