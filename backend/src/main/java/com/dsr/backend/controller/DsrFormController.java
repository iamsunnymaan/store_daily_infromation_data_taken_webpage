package com.dsr.backend.controller;

import com.dsr.backend.dto.DsrFormRequest;
import com.dsr.backend.entity.DsrFormLog;
import com.dsr.backend.repository.DsrFormLogRepository;
import com.dsr.backend.service.DsrFormService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/dsr-form")
@CrossOrigin(origins = "*")
public class DsrFormController {

    private final DsrFormService dsrFormService;
    private final DsrFormLogRepository dsrFormLogRepository;

    public DsrFormController(DsrFormService dsrFormService, DsrFormLogRepository dsrFormLogRepository) {
        this.dsrFormService = dsrFormService;
        this.dsrFormLogRepository = dsrFormLogRepository;
    }

    @PostMapping
    public ResponseEntity<DsrFormLog> submit(@Valid @RequestBody DsrFormRequest request) {
        DsrFormLog saved = dsrFormService.saveSubmission(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public List<DsrFormLog> getAll() {
        return dsrFormLogRepository.findAll();
    }

    @GetMapping("/{id}")
    public DsrFormLog getById(@PathVariable Long id) {
        return dsrFormLogRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "DSR form log not found: " + id));
    }
}
