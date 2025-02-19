package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
public class AccessoryInStoreId {
    private Integer accessory_id;

    private Integer store_id;
}
