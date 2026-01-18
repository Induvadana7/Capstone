package com.bank.pipeline.deal.dto;

import com.bank.pipeline.deal.model.DealStage;
import lombok.Data;

@Data
public class DealStageUpdateRequest {
    private DealStage stage;
}