package com.questretail.storevisit.controller;

import com.questretail.storevisit.dto.VisitSubmissionRequest;
import com.questretail.storevisit.dto.VisitSubmissionResponse;
import com.questretail.storevisit.service.VisitService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

  private final VisitService visitService;

  public VisitController(VisitService visitService) {
    this.visitService = visitService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public VisitSubmissionResponse submit(@Valid @RequestBody VisitSubmissionRequest request) {
    return visitService.submit(request);
  }
}
