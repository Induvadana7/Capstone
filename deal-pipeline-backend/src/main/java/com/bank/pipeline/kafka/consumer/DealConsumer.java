package com.bank.pipeline.kafka.consumer;

import com.bank.pipeline.kafka.KafkaTopics;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;


@Service
public class DealConsumer {

    @KafkaListener(
            topics = {
                    KafkaTopics.DEAL_CREATED,
                    KafkaTopics.DEAL_DELETED,
                    KafkaTopics.DEAL_TYPE_UPDATED,
                    KafkaTopics.DEAL_VALUE_UPDATED,
                    KafkaTopics.DEAL_SECTOR_UPDATED,
                    KafkaTopics.DEAL_STAGE_UPDATED,
                    KafkaTopics.DEAL_SUMMARY_UPDATED,
                    KafkaTopics.DEAL_NOTE_ADDED
            },
            groupId = "deal-pipeline-group"
    )
    public void consume(String message) {
        System.out.println("📩 Kafka Event Received: " + message);
    }
}

