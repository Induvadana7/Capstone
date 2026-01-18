package com.bank.pipeline.kafka.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DealEvent {
    private String type;      // DEAL_CREATED, DEAL_UPDATED, STAGE_UPDATED etc
    private String dealId;
    private String username;
    private Instant timestamp;
    private String message;
}

