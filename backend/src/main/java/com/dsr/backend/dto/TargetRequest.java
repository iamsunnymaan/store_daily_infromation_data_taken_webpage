package com.dsr.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class TargetRequest {

    @NotBlank
    private String siteCode;

    @NotNull
    private Integer targetYear;

    @NotNull
    @Min(1)
    @Max(12)
    private Integer targetMonth;

    @NotNull
    private BigDecimal targetAmount;

    public String getSiteCode() {
        return siteCode;
    }

    public void setSiteCode(String siteCode) {
        this.siteCode = siteCode;
    }

    public Integer getTargetYear() {
        return targetYear;
    }

    public void setTargetYear(Integer targetYear) {
        this.targetYear = targetYear;
    }

    public Integer getTargetMonth() {
        return targetMonth;
    }

    public void setTargetMonth(Integer targetMonth) {
        this.targetMonth = targetMonth;
    }

    public BigDecimal getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }
}
