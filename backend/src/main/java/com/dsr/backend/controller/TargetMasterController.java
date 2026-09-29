package com.dsr.backend.controller;

import com.dsr.backend.dto.TargetRequest;
import com.dsr.backend.entity.TargetMaster;
import com.dsr.backend.repository.TargetMasterRepository;
import com.dsr.backend.service.TargetMasterService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/target-master")
@CrossOrigin(origins = "*")
public class TargetMasterController {

    private final TargetMasterService targetMasterService;
    private final TargetMasterRepository targetMasterRepository;

    public TargetMasterController(TargetMasterService targetMasterService, TargetMasterRepository targetMasterRepository) {
        this.targetMasterService = targetMasterService;
        this.targetMasterRepository = targetMasterRepository;
    }

    @PostMapping
    public ResponseEntity<TargetMaster> upsert(@Valid @RequestBody TargetRequest request) {
        return ResponseEntity.ok(targetMasterService.upsert(request));
    }

    @GetMapping
    public List<TargetMaster> getBySite(@RequestParam(required = false) String siteCode) {
        if (siteCode == null || siteCode.isBlank()) {
            return targetMasterRepository.findAll();
        }
        return targetMasterRepository.findBySiteCode(siteCode);
    }
}
