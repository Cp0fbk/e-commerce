package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.model.CartIncludesProductLineId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartIncludesProductLineRepository extends JpaRepository<CartIncludesProductLine, CartIncludesProductLineId> {
    List<CartIncludesProductLine> findByProductLineId_Id(Integer productId);
}

