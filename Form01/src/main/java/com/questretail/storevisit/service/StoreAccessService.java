package com.questretail.storevisit.service;

import com.questretail.storevisit.dto.StoreAccessResponse;
import com.questretail.storevisit.model.SiteMaster;
import com.questretail.storevisit.repository.SiteMasterRepository;
import com.questretail.storevisit.repository.TargetRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.Locale;
import org.springframework.stereotype.Service;

@Service
public class StoreAccessService {

  private final SiteMasterRepository siteMasterRepository;
  private final TargetRepository targetRepository;

  public StoreAccessService(SiteMasterRepository siteMasterRepository, TargetRepository targetRepository) {
    this.siteMasterRepository = siteMasterRepository;
    this.targetRepository = targetRepository;
  }

  public StoreAccessResponse validateAccess(String sitestorecode, String accessCode) {
    SiteMaster store = siteMasterRepository.findBysitestorecodeAndAccessCode(sitestorecode, accessCode)
        .orElseThrow(() -> new IllegalArgumentException("Invalid access code or store code."));

    String currentMonth = LocalDate.now().getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
    BigDecimal target;
    try {
      target = targetRepository.findFirstBysitestorecodeAndMonthOrderByNoDesc(sitestorecode, currentMonth)
          .map(com.questretail.storevisit.model.Target::getTarget)
          .orElse(BigDecimal.ZERO);
    } catch (Exception e) {
      target = BigDecimal.ZERO;
    }

    return new StoreAccessResponse(
        store.getsite_store_code(),
        store.getStores(),
        store.getCity(),
        store.getState(),
        store.getRegion(),
        store.getChannel(),
        store.getSubChannel(),
        store.getLocation(),
        target
    );
  }
}
