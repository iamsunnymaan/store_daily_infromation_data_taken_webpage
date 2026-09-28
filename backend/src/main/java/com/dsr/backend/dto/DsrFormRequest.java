package com.dsr.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class DsrFormRequest {

    @NotNull
    private LocalDate visitDate;

    @NotBlank
    private String storeCode;

    private String storeName;

    private Integer totalStaffCount;
    private Integer plannedStaffCount;
    private Integer presentStaffCount;
    private Integer absentStaffCount;

    @NotNull
    private BigDecimal todaySales;

    @NotNull
    private Integer totalTransactions;

    @NotNull
    private Integer footfall;

    @NotNull
    private Integer totalUnitsSold;

    private String salesStatus;
    private String storeStatus;
    private String storeClosedReason;

    private List<String> reasonsForIncrease;
    private List<String> reasonsForDecrease;
    private List<String> actionTakenByStoreTeam;

    private List<String> mallMarketIssues;
    private List<String> projectIssues;
    private List<String> vmIssues;
    private List<String> productIssues;
    private List<String> merchandiseIssues;
    private List<String> otherDepartmentIssues;

    private List<String> outOfStockProducts;
    private List<String> salesImprovementSuggestions;

    private String remark;

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public String getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(String storeCode) {
        this.storeCode = storeCode;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public Integer getTotalStaffCount() {
        return totalStaffCount;
    }

    public void setTotalStaffCount(Integer totalStaffCount) {
        this.totalStaffCount = totalStaffCount;
    }

    public Integer getPlannedStaffCount() {
        return plannedStaffCount;
    }

    public void setPlannedStaffCount(Integer plannedStaffCount) {
        this.plannedStaffCount = plannedStaffCount;
    }

    public Integer getPresentStaffCount() {
        return presentStaffCount;
    }

    public void setPresentStaffCount(Integer presentStaffCount) {
        this.presentStaffCount = presentStaffCount;
    }

    public Integer getAbsentStaffCount() {
        return absentStaffCount;
    }

    public void setAbsentStaffCount(Integer absentStaffCount) {
        this.absentStaffCount = absentStaffCount;
    }

    public BigDecimal getTodaySales() {
        return todaySales;
    }

    public void setTodaySales(BigDecimal todaySales) {
        this.todaySales = todaySales;
    }

    public Integer getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(Integer totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public Integer getFootfall() {
        return footfall;
    }

    public void setFootfall(Integer footfall) {
        this.footfall = footfall;
    }

    public Integer getTotalUnitsSold() {
        return totalUnitsSold;
    }

    public void setTotalUnitsSold(Integer totalUnitsSold) {
        this.totalUnitsSold = totalUnitsSold;
    }

    public String getSalesStatus() {
        return salesStatus;
    }

    public void setSalesStatus(String salesStatus) {
        this.salesStatus = salesStatus;
    }

    public String getStoreStatus() {
        return storeStatus;
    }

    public void setStoreStatus(String storeStatus) {
        this.storeStatus = storeStatus;
    }

    public String getStoreClosedReason() {
        return storeClosedReason;
    }

    public void setStoreClosedReason(String storeClosedReason) {
        this.storeClosedReason = storeClosedReason;
    }

    public List<String> getReasonsForIncrease() {
        return reasonsForIncrease;
    }

    public void setReasonsForIncrease(List<String> reasonsForIncrease) {
        this.reasonsForIncrease = reasonsForIncrease;
    }

    public List<String> getReasonsForDecrease() {
        return reasonsForDecrease;
    }

    public void setReasonsForDecrease(List<String> reasonsForDecrease) {
        this.reasonsForDecrease = reasonsForDecrease;
    }

    public List<String> getActionTakenByStoreTeam() {
        return actionTakenByStoreTeam;
    }

    public void setActionTakenByStoreTeam(List<String> actionTakenByStoreTeam) {
        this.actionTakenByStoreTeam = actionTakenByStoreTeam;
    }

    public List<String> getMallMarketIssues() {
        return mallMarketIssues;
    }

    public void setMallMarketIssues(List<String> mallMarketIssues) {
        this.mallMarketIssues = mallMarketIssues;
    }

    public List<String> getProjectIssues() {
        return projectIssues;
    }

    public void setProjectIssues(List<String> projectIssues) {
        this.projectIssues = projectIssues;
    }

    public List<String> getVmIssues() {
        return vmIssues;
    }

    public void setVmIssues(List<String> vmIssues) {
        this.vmIssues = vmIssues;
    }

    public List<String> getProductIssues() {
        return productIssues;
    }

    public void setProductIssues(List<String> productIssues) {
        this.productIssues = productIssues;
    }

    public List<String> getMerchandiseIssues() {
        return merchandiseIssues;
    }

    public void setMerchandiseIssues(List<String> merchandiseIssues) {
        this.merchandiseIssues = merchandiseIssues;
    }

    public List<String> getOtherDepartmentIssues() {
        return otherDepartmentIssues;
    }

    public void setOtherDepartmentIssues(List<String> otherDepartmentIssues) {
        this.otherDepartmentIssues = otherDepartmentIssues;
    }

    public List<String> getOutOfStockProducts() {
        return outOfStockProducts;
    }

    public void setOutOfStockProducts(List<String> outOfStockProducts) {
        this.outOfStockProducts = outOfStockProducts;
    }

    public List<String> getSalesImprovementSuggestions() {
        return salesImprovementSuggestions;
    }

    public void setSalesImprovementSuggestions(List<String> salesImprovementSuggestions) {
        this.salesImprovementSuggestions = salesImprovementSuggestions;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
