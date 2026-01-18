package com.bank.pipeline.deal.service;

import com.bank.pipeline.deal.model.Deal;
import com.bank.pipeline.deal.model.DealNote;
import com.bank.pipeline.deal.model.DealStage;
import com.bank.pipeline.deal.repository.DealRepository;
import com.bank.pipeline.kafka.producer.DealProducer;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class DealService {

    private final DealRepository dealRepository;
    private final DealProducer dealProducer;

    public DealService(DealRepository dealRepository, DealProducer dealProducer) {
        this.dealRepository = dealRepository;
        this.dealProducer = dealProducer;
    }

    public Deal createDeal(Deal deal, String createdBy) {
        deal.setCreatedBy(createdBy);
        deal.setCreatedAt(Instant.now());
        deal.setUpdatedAt(Instant.now());
        deal.setCurrentStage(DealStage.Prospect);
        Deal saved = dealRepository.save(deal);

        dealProducer.sendDealCreatedEvent(saved);

        return saved;


    }


    public Deal getDealById(String id) {
        return dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));
    }

    public Deal updateStage(String id, DealStage stage) {
        Deal deal = getDealById(id);
        deal.setCurrentStage(stage);
        deal.setUpdatedAt(Instant.now());
        Deal updated = dealRepository.save(deal);
        dealProducer.sendDealStageUpdatedEvent(updated);

        return updated;
    }

    public Deal addNote(String id, String username, String noteText) {
        Deal deal = getDealById(id);

        DealNote note = new DealNote();
        note.setUser(username);
        note.setNote(noteText);
        note.setTimestamp(Instant.now());

        deal.getNotes().add(note);
        deal.setUpdatedAt(Instant.now());
        Deal updated = dealRepository.save(deal);
        dealProducer.sendDealNoteAddedEvent(updated);

        return updated;

    }

    public Deal updateDealValue(String id, Double value) {
        Deal deal = getDealById(id);
        deal.setDealValue(value);
        deal.setUpdatedAt(Instant.now());
        Deal updated = dealRepository.save(deal);
        dealProducer.sendDealValueUpdatedEvent(updated);

        return updated;

    }

    public void deleteDeal(String id) {
        if (!dealRepository.existsById(id)) {
            throw new RuntimeException("Deal not found");
        }
        dealRepository.deleteById(id);

        dealProducer.sendDealDeletedEvent(id);

    }

}

