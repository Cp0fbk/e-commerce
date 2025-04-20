package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Images;
import com.ecommerce.backend.model.ImagesId;
import com.ecommerce.backend.model.ProductLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagesRepository extends JpaRepository<Images, ImagesId> {
    List<Images> findByProductLine(ProductLine productLine);
    
    List<Images> findByIdProductLineId(Integer productLineId);
        
    void deleteByProductLine(ProductLine productLine);
    
    void deleteByIdProductLineId(Integer productLineId);
    
    boolean existsByIdProductLineIdAndIdImage(Integer productLineId, String image);
    
    long countByProductLine(ProductLine productLine);
}