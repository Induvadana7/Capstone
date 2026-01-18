package com.bank.pipeline.kafka.producer;

import com.bank.pipeline.deal.model.Deal;
import com.bank.pipeline.kafka.KafkaTopics;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DealProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public void sendDealCreatedEvent(Deal deal) {
        publish(KafkaTopics.DEAL_CREATED, deal);
    }
    public void sendDealStageUpdatedEvent(Deal deal) {
        publish(KafkaTopics.DEAL_STAGE_UPDATED, deal);
    }

    public void sendDealValueUpdatedEvent(Deal deal) {
        publish(KafkaTopics.DEAL_VALUE_UPDATED, deal);
    }

    public void sendDealTypeUpdatedEvent(Deal deal) {
        publish(KafkaTopics.DEAL_TYPE_UPDATED, deal);
    }

    public void sendDealSectorUpdatedEvent(Deal deal) {
        publish(KafkaTopics.DEAL_SECTOR_UPDATED, deal);
    }

    public void sendDealSummaryUpdatedEvent(Deal deal) {
        publish(KafkaTopics.DEAL_SUMMARY_UPDATED, deal);
    }

    public void sendDealNoteAddedEvent(Deal deal) {
        publish(KafkaTopics.DEAL_NOTE_ADDED, deal);
    }

    public void sendDealDeletedEvent(String dealId) {
        publish(KafkaTopics.DEAL_DELETED, dealId);
    }

    private void publish(String topic, Object payload) {
        try {
            kafkaTemplate.send(topic, objectMapper.writeValueAsString(payload));
        } catch (Exception e) {
            throw new RuntimeException("Kafka publish failed", e);
        }
    }

}

