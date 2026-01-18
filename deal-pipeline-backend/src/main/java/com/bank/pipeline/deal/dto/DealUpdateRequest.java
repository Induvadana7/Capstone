package com.bank.pipeline.deal.dto;

import lombok.Data;

@Data
public class DealUpdateRequest {
    private String summary;
    private String sector;
    private String dealType;
}
