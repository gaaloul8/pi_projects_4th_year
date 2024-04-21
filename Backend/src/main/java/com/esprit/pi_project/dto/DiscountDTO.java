package com.esprit.pi_project.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import java.util.Date;

@Data
public class DiscountDTO {
    private Integer idDiscount;

    @Temporal(TemporalType.DATE)
    private Date createdDiscount;

    @Temporal(TemporalType.DATE)
    private Date endDiscount;

    private String discountValue;
    private Integer rewardId;
}