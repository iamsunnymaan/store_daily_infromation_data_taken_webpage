package com.dsr.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.math.BigDecimal;

@Entity
@Table(name = "target_master", uniqueConstraints = {
        @UniqueConstraint(name = "uk_target_master_site_year_month", columnNames = {"site_code", "target_year", "target_month"})
})
public class TargetMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "target_id")
    private Long targetId;

    @Column(name = "site_code", length = 50, nullable = false)
    private String siteCode;

    @Column(name = "target_year", nullable = false)
    private Integer targetYear;

    @Column(name = "target_month", nullable = false)
    private Integer targetMonth;

    @Column(name = "target_amount", precision = 12, scale = 2, nullable = false)
    private BigDecimal targetAmount;

    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

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
