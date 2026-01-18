package com.bank.pipeline.deal.mapper;
import com.bank.pipeline.deal.dto.DealResponse;
import com.bank.pipeline.deal.model.Deal;

public class DealMapper {

    public static DealResponse toResponse(Deal deal, boolean isAdmin) {

        DealResponse res = new DealResponse();
        res.setId(deal.getId());
        res.setClientName(deal.getClientName());
        res.setDealType(deal.getDealType());
        res.setSector(deal.getSector());
        res.setCurrentStage(deal.getCurrentStage());
        res.setSummary(deal.getSummary());


        res.setCreatedBy(deal.getCreatedBy());

        res.setNotes(deal.getNotes());

        if (isAdmin) {
            res.setDealValue(deal.getDealValue());
        } else {
            res.setDealValue(null);
        }

        res.setCreatedAt(deal.getCreatedAt());
        res.setUpdatedAt(deal.getUpdatedAt());

        return res;
    }
}


