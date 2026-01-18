package com.bank.pipeline.deal.dto;

import com.bank.pipeline.deal.model.DealNote;
import com.bank.pipeline.deal.model.DealStage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DealResponse {
    private String id;
    private String clientName;
    private String dealType;
    private String sector;
    private DealStage currentStage;
    private String summary;
    private Double dealValue; // will be null for USER
    private String createdBy;
    private Instant createdAt;
    private List<DealNote> notes;
    private Instant updatedAt;
}

