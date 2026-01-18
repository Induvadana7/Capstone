package com.bank.pipeline.deal.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DealCreateRequest {

    @NotBlank
    private String clientName;

    @NotBlank
    private String dealType;

    @NotBlank
    private String sector;

    @NotBlank
    private String summary;
}
