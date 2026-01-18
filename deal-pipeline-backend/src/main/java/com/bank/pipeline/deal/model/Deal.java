package com.bank.pipeline.deal.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


@Document(collection = "deals")
@Data
public class Deal {

    @Id
    private String id;

    @NotBlank
    private String clientName;

    @NotBlank
    private String dealType;

    @NotBlank
    private String sector;

    private Double dealValue;   // sensitive

    private DealStage currentStage;

    @NotBlank
    private String summary;

    private String createdBy;
    private Instant createdAt;

    private Instant updatedAt;



    private List<DealNote> notes = new ArrayList<>();
}


