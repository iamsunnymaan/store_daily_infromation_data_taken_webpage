package com.questretail.storevisit.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record VisitSubmissionRequest(
    @NotNull LocalDate visitDate,
    @NotBlank String visitDay,
    @NotBlank String sitestorecode,
    @NotBlank String accessCode,
    @NotBlank String storeName,
    @NotNull @DecimalMin("0.0") BigDecimal todaySales,
    @NotNull @DecimalMin("0.0") BigDecimal todayTarget,
    @NotNull @Min(0) Integer totalTransactions,
    @NotNull @Min(0) Integer footfall,
    @NotNull @Min(0) Integer totalUnitsSold,
    @NotBlank String salesStatus,
    @Min(0) Integer plannedStaffCount,
    @Min(0) Integer actualPresentStaffCount,
    List<String> reasonsForDecrease,
    List<String> reasonsForIncrease,
    List<String> actionTakenByStoreTeam,
    List<String> mallMarketIssues,
    List<String> projectMaintenanceIssues,
    List<String> vmIssues,
    List<String> productMerchandiseIssues,
    List<String> outOfStockProducts,
    List<String> salesImprovementSuggestions,
    String remarks
) {
}
