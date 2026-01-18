package com.bank.pipeline.deal.repository;

import com.bank.pipeline.deal.model.Deal;
import com.bank.pipeline.deal.model.DealStage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface DealRepository extends MongoRepository<Deal, String> {

    List<Deal> findByCurrentStage(DealStage stage);

    List<Deal> findBySectorIgnoreCase(String sector);

    List<Deal> findByDealTypeIgnoreCase(String dealType);

    List<Deal> findByCurrentStageAndSectorIgnoreCaseAndDealTypeIgnoreCase(
            DealStage stage, String sector, String dealType
    );
}


