package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Embeddable
@Data
public class ConnectionsId {
    private Integer accessory_id;

    @Column(length = 30)
    private String connection;
}
