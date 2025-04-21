package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.model.CartIncludesProductLineId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartIncludesProductLineRepository extends JpaRepository<CartIncludesProductLine, CartIncludesProductLineId> {
    @Query(value = "SELECT * FROM cart_includes_product_line WHERE customer_id = :id;", nativeQuery = true)
    List<CartIncludesProductLine> findByCustomer_id(@Param("id") Integer id);

    List<CartIncludesProductLine> findByProductLineId_Id(Integer productId);
}

