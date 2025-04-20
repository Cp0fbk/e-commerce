package com.ecommerce.backend.repository;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.Store;
import com.ecommerce.backend.model.Device;
import com.ecommerce.backend.model.GoodsDeliveryNote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByStore(Store store);

    List<Product> findByStore_StoreId(Integer storeId);

    List<Product> findByDevice(Device device);

    List<Product> findByDevice_Id(Integer deviceId);

    List<Product> findByGoodsDeliveryNote(GoodsDeliveryNote note);

    List<Product> findByGoodsDeliveryNote_Id(Integer noteId);

    List<Product> findByGoodsDeliveryNoteIsNull();
}