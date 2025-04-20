package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface CategoryTypeRepository extends JpaRepository<CategoryType, Integer> {
   Optional<CategoryType> findByName(String name);
   
   boolean existsByName(String name);
   
   List<CategoryType> findByNameContaining(String nameSubstring);
   
   List<CategoryType> findByNameContainingIgnoreCase(String nameSubstring);
   
   Optional<CategoryType> findByCategoryTypeId(Integer categoryTypeId);
}