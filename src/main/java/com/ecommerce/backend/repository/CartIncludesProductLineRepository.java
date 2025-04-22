package com.ecommerce.backend.repository;

import com.ecommerce.backend.dtos.cartDTO.CartDTO;
import com.ecommerce.backend.model.CartIncludesProductLine;
import com.ecommerce.backend.model.CartIncludesProductLineId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartIncludesProductLineRepository extends JpaRepository<CartIncludesProductLine, CartIncludesProductLineId> {
    @Query(value = "SELECT new com.ecommerce.backend.dtos.cartDTO.CartDTO(c.productLineId, c.quantity, c.price) FROM CartIncludesProductLine c WHERE c.id.customer_id = :id")
    List<CartDTO> findByCustomerId(@Param("id") Integer id);

    boolean existsByCustomerId_Id(Integer id);

    List<CartIncludesProductLine> findByProductLineId_Id(Integer productId);

    @Query(value = "SELECT new com.ecommerce.backend.dtos.cartDTO.CartDTO(c.productLineId, c.quantity, c.price) FROM CartIncludesProductLine c WHERE c.id.customer_id = :id")
    Page<CartDTO> findByCustomerId(@Param("id") Integer id, Pageable pageable);

    void deleteByCustomerId_Id(Integer id);
}

