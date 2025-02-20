package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "accessory_in_store")
public class AccessoryInStore {
    @EmbeddedId
    private AccessoryInStoreId id;

    @ManyToOne
    @MapsId("accessory_id")
    @JoinColumn(name = "accessory_id")
    private Accessory accessory_id;

    @ManyToOne
    @MapsId("store_id")
    @JoinColumn(name = "store_id")
    private Store store_id;

    @Column(nullable = false)
    private Integer stock_quantity;
}
