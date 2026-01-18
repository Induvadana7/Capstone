package com.bank.pipeline.deal.controller;

import com.bank.pipeline.deal.dto.*;
import com.bank.pipeline.deal.mapper.DealMapper;
import com.bank.pipeline.deal.model.Deal;
import com.bank.pipeline.deal.model.DealNote;
import com.bank.pipeline.deal.model.DealStage;
import com.bank.pipeline.deal.repository.DealRepository;
import com.bank.pipeline.deal.service.DealService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    private final DealRepository dealRepository;
    private final DealService dealService;

    public DealController(DealRepository dealRepository, DealService dealService) {
        this.dealRepository = dealRepository;
        this.dealService = dealService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping
    public Deal createDeal(@Valid @RequestBody DealCreateRequest req,
                           Authentication authentication) {

        Deal deal = new Deal();
        deal.setClientName(req.getClientName());
        deal.setDealType(req.getDealType());
        deal.setSector(req.getSector());
        deal.setSummary(req.getSummary());

        return dealService.createDeal(deal, authentication.getName());
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PatchMapping("/{id}/stage")
    public Deal updateStagePatch(@PathVariable String id,
                                 @RequestBody DealStageUpdateRequest req) {
        return updateStage(id, req); // reuse your PUT method
    }



    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping
    public List<DealResponse> getAllDeals(
            @RequestParam(required = false) DealStage stage,
            @RequestParam(required = false) String sector,
            @RequestParam(required = false) String dealType,
            Authentication authentication
    ) {

        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        List<Deal> deals;

        if (stage != null && sector != null && dealType != null) {
            deals = dealRepository
                    .findByCurrentStageAndSectorIgnoreCaseAndDealTypeIgnoreCase(stage, sector, dealType);
        } else if (stage != null) {
            deals = dealRepository.findByCurrentStage(stage);
        } else if (sector != null) {
            deals = dealRepository.findBySectorIgnoreCase(sector);
        } else if (dealType != null) {
            deals = dealRepository.findByDealTypeIgnoreCase(dealType);
        } else {
            deals = dealRepository.findAll();
        }

        return deals.stream()
                .map(d -> DealMapper.toResponse(d, isAdmin))
                .toList();
    }


    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public DealResponse getDealById(@PathVariable String id,
                                    Authentication authentication) {

        Deal deal = dealService.getDealById(id);

        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        return DealMapper.toResponse(deal, isAdmin);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PutMapping("/{id}")
    public Deal updateDeal(@PathVariable String id,
                           @Valid @RequestBody DealUpdateRequest req) {

        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        deal.setSummary(req.getSummary());
        deal.setSector(req.getSector());
        deal.setDealType(req.getDealType());

        // ✅ updatedAt
        deal.setUpdatedAt(Instant.now());

        return dealRepository.save(deal);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PutMapping("/{id}/stage")
    public Deal updateStage(@PathVariable String id,
                            @RequestBody DealStageUpdateRequest req) {

        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        deal.setCurrentStage(req.getStage());

        // ✅ updatedAt
        deal.setUpdatedAt(Instant.now());

        return dealRepository.save(deal);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @PostMapping("/{id}/notes")
    public Deal addNote(@PathVariable String id,
                        @RequestBody DealNoteRequest req,
                        Authentication authentication) {

        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        DealNote note = new DealNote();
        note.setUser(authentication.getName());
        note.setNote(req.getNote());
        note.setTimestamp(Instant.now());

        deal.getNotes().add(note);

        // ✅ updatedAt
        deal.setUpdatedAt(Instant.now());

        return dealRepository.save(deal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/value")
    public Deal updateDealValuePatch(@PathVariable String id,
                                     @RequestBody DealValueUpdateRequest req) {
        return updateDealValue(id, req); // reuse your PUT method
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/value")
    public Deal updateDealValue(@PathVariable String id,
                                @RequestBody DealValueUpdateRequest req) {

        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        deal.setDealValue(req.getDealValue());

        // ✅ updatedAt
        deal.setUpdatedAt(Instant.now());

        return dealRepository.save(deal);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteDeal(@PathVariable String id) {

        if (!dealRepository.existsById(id))
            throw new RuntimeException("Deal not found");

        dealRepository.deleteById(id);
        return "Deal deleted";
    }
}


