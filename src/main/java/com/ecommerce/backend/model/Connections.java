package com.ecommerce.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "connections")
public class Connections {
    @EmbeddedId
    private ConnectionsId id;

    @ManyToOne
    @JoinColumn(name = "id")
    private Accessory accessory_id;
}
