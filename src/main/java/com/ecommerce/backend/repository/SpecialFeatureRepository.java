package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Device;
import com.ecommerce.backend.model.SpecialFeature;
import com.ecommerce.backend.model.SpecialFeatureId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecialFeatureRepository extends JpaRepository<SpecialFeature, SpecialFeatureId> {
    List<SpecialFeature> findByDevice(Device device);
    
    List<SpecialFeature> findByIdDeviceId(Integer deviceId);
    
    List<SpecialFeature> findByIdSpecialFeatureContaining(String featureSubstring);
    
    void deleteByDevice(Device device);
    
    void deleteByIdDeviceId(Integer deviceId);
    
    boolean existsByIdDeviceIdAndIdSpecialFeature(Integer deviceId, String specialFeature);
    
    long countByDevice(Device device);
}