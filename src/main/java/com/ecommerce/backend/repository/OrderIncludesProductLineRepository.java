package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.OrderIncludesProductLine;
import com.ecommerce.backend.model.OrderIncludesProductLineId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderIncludesProductLineRepository extends JpaRepository<OrderIncludesProductLine, OrderIncludesProductLineId> {
}
