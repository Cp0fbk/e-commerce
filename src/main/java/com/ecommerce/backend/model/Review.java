package com.ecommerce.backend.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Data
@Table(name = "review")
public class Review {
    @EmbeddedId
    private ReviewId id;

    @ManyToOne
    @MapsId("product_line_id")
    @JoinColumn(name = "product_line_id")
    private ProductLine product_line_id;

    @ManyToOne
    @MapsId("customer_id")
    @JoinColumn(name = "customer_id")
    private Customer customer_id;

    private LocalDate review_date;

    @Column(length = 20, nullable = false)
    private String approval_status;

    @Column(columnDefinition = "TEXT")
    private String review_text;

    @Column(nullable = false)
    private Short rating;
}
