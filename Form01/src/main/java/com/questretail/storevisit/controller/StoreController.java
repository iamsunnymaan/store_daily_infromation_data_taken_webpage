package com.questretail.storevisit.controller;

import com.questretail.storevisit.dto.StoreAccessResponse;
import com.questretail.storevisit.service.StoreAccessService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stores")
public class StoreController {

  private final StoreAccessService storeAccessService;

  public StoreController(StoreAccessService storeAccessService) {
    this.storeAccessService = storeAccessService;
  }

  @GetMapping("/validate")
  public StoreAccessResponse validate(
      @RequestParam String site_store_code,
      @RequestParam String accessCode
  ) {
    return storeAccessService.validateAccess(site_store_code, accessCode);
  }
}
