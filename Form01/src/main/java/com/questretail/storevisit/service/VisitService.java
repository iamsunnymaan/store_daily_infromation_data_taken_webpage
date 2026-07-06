package com.questretail.storevisit.service;

import com.questretail.storevisit.dto.VisitSubmissionRequest;
import com.questretail.storevisit.dto.VisitSubmissionResponse;
import com.questretail.storevisit.model.transactional_log;
import com.questretail.storevisit.repository.SiteMasterRepository;
import com.questretail.storevisit.repository.Transactional_logRepository;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class VisitService {

  private final SiteMasterRepository siteMasterRepository;
  private final Transactional_logRepository transactionalLogRepository;

  public VisitService(
      SiteMasterRepository siteMasterRepository,
      Transactional_logRepository transactionalLogRepository
  ) {
    this.siteMasterRepository = siteMasterRepository;
    this.transactionalLogRepository = transactionalLogRepository;
  }

  @Transactional
  public VisitSubmissionResponse submit(VisitSubmissionRequest request) {
    siteMasterRepository.findBysitestorecodeAndAccessCode(request.sitestorecode(), request.accessCode())
        .orElseThrow(() -> new IllegalArgumentException("Invalid access code or store code."));

    LocalDateTime now = LocalDateTime.now();
    transactional_log log = new transactional_log();
    log.setVisitDate(request.visitDate());
    log.setVisitDay(truncate(request.visitDay(), 10));
    log.setSitestorecode(request.sitestorecode());
    log.setStorename(request.storeName());
    log.setTodaySales(request.todaySales());
    log.setTodayTarget(request.todayTarget());
    log.setAchievementPercent(percent(request.todaySales(), request.todayTarget()));
    log.setTotalTransactions(request.totalTransactions());
    log.setFootfall(request.footfall());
    log.setTotalUnitSold(request.totalUnitsSold());
    log.setPlannedStaffCount(request.plannedStaffCount());
    log.setActualPresentStaffCount(request.actualPresentStaffCount());
    log.setAtv(divide(request.todaySales(), request.totalTransactions()));
    log.setUpt(divide(BigDecimal.valueOf(request.totalUnitsSold()), request.totalTransactions()));
    log.setSalesStatus(mapSalesStatus(request.salesStatus()));
    
    // Calculate footfall conversion
    if (request.footfall() != null && request.footfall() > 0) {
        log.setFootfallconversionpercent((int) ((double) request.totalTransactions() / request.footfall() * 100));
    } else {
        log.setFootfallconversionpercent(0);
    }

    log.setRcic(truncate(join(request.reasonsForIncrease()), 1000));
    log.setRcdc(truncate(join(request.reasonsForDecrease()), 1000));
    log.setActionTakenByStore(truncate(join(request.actionTakenByStoreTeam()), 1000));
    log.setRcc(truncate(buildDepartmentIssues(request), 1000));
    log.setOsp(truncate(join(request.outOfStockProducts()), 1000));
    log.setSis(truncate(join(request.salesImprovementSuggestions()), 1000));
    log.setRemark(truncate(request.remarks(), 2000));
    
    log.setCreatedDate(now);
    log.setModifiedDate(now);

    transactional_log savedLog = transactionalLogRepository.save(log);

    return new VisitSubmissionResponse(savedLog.getTransactionallogid(), "Visit submitted successfully.");
  }

  private String mapSalesStatus(String status) {
    if (status == null) return null;
    return switch (status) {
      case "Above Target" -> "A";
      case "On Target" -> "O";
      case "Below Target" -> "B";
      case "Very Poor" -> "P";
      default -> truncate(status, 1);
    };
  }

  private String truncate(String value, int length) {
    if (value == null || value.length() <= length) {
      return value;
    }
    return value.substring(0, length);
  }

  private BigDecimal percent(BigDecimal numerator, BigDecimal denominator) {
    if (denominator == null || BigDecimal.ZERO.compareTo(denominator) == 0) {
      return BigDecimal.ZERO;
    }
    return numerator.multiply(BigDecimal.valueOf(100)).divide(denominator, 2, RoundingMode.HALF_UP);
  }

  private BigDecimal divide(BigDecimal numerator, Integer denominator) {
    if (denominator == null || denominator == 0) {
      return BigDecimal.ZERO;
    }
    return numerator.divide(BigDecimal.valueOf(denominator), 2, RoundingMode.HALF_UP);
  }

  private String join(List<String> values) {
    if (values == null || values.isEmpty()) {
      return "";
    }
    return String.join(", ", values);
  }

  private String buildDepartmentIssues(VisitSubmissionRequest request) {
    List<String> issues = new ArrayList<>();
    addIssue(issues, "Mall", request.mallMarketIssues());
    addIssue(issues, "Project", request.projectMaintenanceIssues());
    addIssue(issues, "VM", request.vmIssues());
    addIssue(issues, "Product", request.productMerchandiseIssues());
    return String.join(" | ", issues);
  }

  private void addIssue(List<String> issues, String label, List<String> values) {
    if (values != null && !values.isEmpty()) {
      List<String> filtered = values.stream()
          .filter(v -> v != null && !v.equalsIgnoreCase("No Issue"))
          .toList();
      if (!filtered.isEmpty()) {
        issues.add(label + ": " + String.join(", ", filtered));
      }
    }
  }

  private String buildRootCauseCategory(VisitSubmissionRequest request) {
    List<String> categories = new ArrayList<>();
    if (request.reasonsForDecrease() != null && !request.reasonsForDecrease().isEmpty()) {
      categories.add("Decrease Sales");
    }
    if (request.reasonsForIncrease() != null && !request.reasonsForIncrease().isEmpty()) {
      categories.add("Increase Sales");
    }
    if (request.actionTakenByStoreTeam() != null && !request.actionTakenByStoreTeam().isEmpty()) {
      categories.add("Action Taken");
    }
    return String.join(", ", categories);
  }

  private String buildSubCategorySummary(VisitSubmissionRequest request) {
    List<String> sections = new ArrayList<>();
    sections.add("Staff: planned " + nullToZero(request.plannedStaffCount())
        + ", actual " + nullToZero(request.actualPresentStaffCount()));
    addSection(sections, "Mall / Market", request.mallMarketIssues());
    addSection(sections, "Project / Maintenance", request.projectMaintenanceIssues());
    addSection(sections, "VM", request.vmIssues());
    addSection(sections, "Product / Merchandise", request.productMerchandiseIssues());
    addSection(sections, "Out Of Stock", request.outOfStockProducts());
    return String.join(" | ", sections);
  }

  private int nullToZero(Integer value) {
    return value == null ? 0 : value;
  }

  private void addSection(List<String> sections, String label, List<String> values) {
    if (values != null && !values.isEmpty()) {
      sections.add(label + ": " + String.join(", ", values));
    }
  }
}
