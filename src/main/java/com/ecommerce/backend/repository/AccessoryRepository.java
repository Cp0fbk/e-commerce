package com.ecommerce.backend.repository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.backend.model.Accessory;
import com.ecommerce.backend.model.ProductLine;

@Repository
public interface AccessoryRepository extends JpaRepository<Accessory, Integer> {
    List<Accessory> findByBatteryCapacity(String batteryCapacity);
    
    Optional<Accessory> findByProductLine(ProductLine productLine);
    
    Optional<Accessory> findByProductLineId(Integer productLineId);
    
    List<Accessory> findByBatteryCapacityContaining(String batteryCapacitySubstring);
    
    List<Accessory> findByBatteryCapacityContainingIgnoreCase(String batteryCapacitySubstring);
    
    boolean existsByProductLine(ProductLine productLine);
    
    long countByBatteryCapacity(String batteryCapacity);
}
