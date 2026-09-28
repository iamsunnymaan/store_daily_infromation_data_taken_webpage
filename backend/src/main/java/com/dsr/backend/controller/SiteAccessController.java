package com.dsr.backend.controller;

import com.dsr.backend.dto.SiteAccessRequest;
import com.dsr.backend.entity.SiteMaster;
import com.dsr.backend.repository.SiteMasterRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/site-access")
@CrossOrigin(origins = "*")
public class SiteAccessController {

    private final SiteMasterRepository siteMasterRepository;

    public SiteAccessController(SiteMasterRepository siteMasterRepository) {
        this.siteMasterRepository = siteMasterRepository;
    }

    @PostMapping
    public ResponseEntity<SiteMaster> verify(@Valid @RequestBody SiteAccessRequest request) {
        SiteMaster site = siteMasterRepository
                .findBySiteCodeAndAccessCode(request.getSiteCode(), request.getAccessCode())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid access code or store code."));
        return ResponseEntity.ok(site);
    }
}
