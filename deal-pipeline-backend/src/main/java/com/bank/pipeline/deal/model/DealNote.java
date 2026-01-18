package com.bank.pipeline.deal.model;

import lombok.Data;

import java.time.Instant;

@Data
public class DealNote {
    private String user;
    private String note;
    private Instant timestamp;
}

