package com.bank.pipeline.deal.service;

import com.bank.pipeline.deal.model.Deal;
import com.bank.pipeline.deal.model.DealStage;
import com.bank.pipeline.deal.repository.DealRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DealServiceTest {

    @Mock
    private DealRepository dealRepository;

    @InjectMocks
    private DealService dealService;

    @Test
    void createDeal_shouldSetDefaults_andSave() {

        Deal input = new Deal();
        input.setClientName("Acme");
        input.setDealType("M&A");
        input.setSector("Manufacturing");
        input.setSummary("Test");

        when(dealRepository.save(any(Deal.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Deal saved = dealService.createDeal(input, "admin");

        assertNotNull(saved.getCreatedAt());
        assertEquals("admin", saved.getCreatedBy());
        assertEquals(DealStage.Prospect, saved.getCurrentStage());

        verify(dealRepository, times(1)).save(any(Deal.class));
    }

    @Test
    void getDealById_shouldThrow_whenNotFound() {

        when(dealRepository.findById("x"))
                .thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> dealService.getDealById("x"));

        assertEquals("Deal not found", ex.getMessage());
    }

    @Test
    void updateStage_shouldUpdateStage_andUpdatedAt() {

        Deal d = new Deal();
        d.setId("1");
        d.setCurrentStage(DealStage.Prospect);
        d.setUpdatedAt(null);

        when(dealRepository.findById("1")).thenReturn(Optional.of(d));
        when(dealRepository.save(any(Deal.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Deal updated = dealService.updateStage("1", DealStage.Closed);

        assertEquals(DealStage.Closed, updated.getCurrentStage());
        assertNotNull(updated.getUpdatedAt());
    }

    @Test
    void addNote_shouldAddNote() {

        Deal d = new Deal();
        d.setId("1");
        d.setNotes(new ArrayList<>());

        when(dealRepository.findById("1")).thenReturn(Optional.of(d));
        when(dealRepository.save(any(Deal.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Deal updated = dealService.addNote("1", "admin", "Test note");

        assertEquals(1, updated.getNotes().size());
        assertEquals("admin", updated.getNotes().get(0).getUser());
        assertEquals("Test note", updated.getNotes().get(0).getNote());
        assertNotNull(updated.getUpdatedAt());
    }

    @Test
    void updateDealValue_shouldUpdateValue() {

        Deal d = new Deal();
        d.setId("1");
        d.setDealValue(null);

        when(dealRepository.findById("1")).thenReturn(Optional.of(d));
        when(dealRepository.save(any(Deal.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Deal updated = dealService.updateDealValue("1", 1000.0);

        assertEquals(1000.0, updated.getDealValue());
        assertNotNull(updated.getUpdatedAt());
    }

    @Test
    void deleteDeal_shouldDelete_whenExists() {

        when(dealRepository.existsById("1")).thenReturn(true);

        dealService.deleteDeal("1");

        verify(dealRepository).deleteById("1");
    }

    @Test
    void deleteDeal_shouldThrow_whenNotExists() {

        when(dealRepository.existsById("x")).thenReturn(false);

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> dealService.deleteDeal("x"));

        assertEquals("Deal not found", ex.getMessage());
    }

}


