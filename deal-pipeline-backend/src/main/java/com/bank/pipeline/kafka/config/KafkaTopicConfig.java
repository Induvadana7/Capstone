package com.bank.pipeline.kafka.config;
import com.bank.pipeline.kafka.KafkaTopics;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic dealEventsTopic() {
        return TopicBuilder.name("deal-events").partitions(1).replicas(1).build();
    }

    @Bean
    public NewTopic dealCreatedTopic() {
        return TopicBuilder.name(KafkaTopics.DEAL_CREATED).partitions(1).replicas(1).build();
    }

    @Bean
    public NewTopic dealStageUpdatedTopic() {
        return TopicBuilder.name(KafkaTopics.DEAL_STAGE_UPDATED).partitions(1).replicas(1).build();
    }

    @Bean
    public NewTopic dealValueUpdatedTopic() {
        return TopicBuilder.name(KafkaTopics.DEAL_VALUE_UPDATED).partitions(1).replicas(1).build();
    }

    @Bean
    public NewTopic dealTypeUpdatedTopic() {
        return TopicBuilder.name(KafkaTopics.DEAL_TYPE_UPDATED).partitions(1).replicas(1).build();
    }

    @Bean
    public NewTopic dealSectorUpdatedTopic() {
        return TopicBuilder.name(KafkaTopics.DEAL_SECTOR_UPDATED).partitions(1).replicas(1).build();
    }

    @Bean
    public NewTopic dealSummaryUpdatedTopic() {
        return TopicBuilder.name(KafkaTopics.DEAL_SUMMARY_UPDATED).partitions(1).replicas(1).build();
    }

    @Bean
    public NewTopic dealNoteAddedTopic() {
        return TopicBuilder.name(KafkaTopics.DEAL_NOTE_ADDED).partitions(1).replicas(1).build();
    }

    @Bean
    public NewTopic dealDeletedTopic() {
        return TopicBuilder.name(KafkaTopics.DEAL_DELETED).partitions(1).replicas(1).build();
    }
}
