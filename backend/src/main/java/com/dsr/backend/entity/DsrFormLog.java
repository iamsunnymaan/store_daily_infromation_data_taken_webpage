package com.dsr.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "DSR_Form_Log")
public class DsrFormLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transactional_id")
    private Long transactionalId;

    @Column(name = "visit_date")
    private LocalDate visitDate;

    @Column(name = "visit_day", length = 15)
    private String visitDay;

    @Column(name = "store_code", length = 50)
    private String storeCode;

    @Column(name = "store_name", length = 150)
    private String storeName;

    @Column(name = "staff_total")
    private Integer staffTotal;

    @Column(name = "staff_planned")
    private Integer staffPlanned;

    @Column(name = "staff_present")
    private Integer staffPresent;

    @Column(name = "staff_absent")
    private Integer staffAbsent;

    @Column(name = "today_sale", precision = 12, scale = 2)
    private BigDecimal todaySale;

    @Column(name = "total_transaction")
    private Integer totalTransaction;

    @Column(name = "footfall")
    private Integer footfall;

    @Column(name = "total_unit_sold")
    private Integer totalUnitSold;

    @Column(name = "atv", precision = 12, scale = 2)
    private BigDecimal atv;

    @Column(name = "upt", precision = 12, scale = 2)
    private BigDecimal upt;

    @Column(name = "footfall_conversion", precision = 6, scale = 2)
    private BigDecimal footfallConversion;

    @Column(name = "sales_status", length = 30)
    private String salesStatus;

    @Column(name = "store_status", length = 20)
    private String storeStatus;

    @Column(name = "store_remark", length = 500)
    private String storeRemark;

    // Reasons for Increase
    @Column(name = "rc_ic", length = 1000)
    private String rcIc;

    // Reasons for Decrease
    @Column(name = "rc_dc", length = 1000)
    private String rcDc;

    // Action Taken By Store team
    @Column(name = "atbs", length = 1000)
    private String atbs;

    // Departments Related Issue - overall
    @Column(name = "dri", length = 1000)
    private String dri;

    // DRI - Mall / Market Related
    @Column(name = "dri_mmr", length = 1000)
    private String driMmr;

    // DRI - Project Related
    @Column(name = "dri_pr", length = 1000)
    private String driPr;

    // DRI - VM Related
    @Column(name = "dri_vm", length = 1000)
    private String driVm;

    // DRI - Product Related
    @Column(name = "dri_product_r", length = 1000)
    private String driProductR;

    // DRI - Merchandise Related
    @Column(name = "dri_mr", length = 1000)
    private String driMr;

    // DRI - Other
    @Column(name = "dri_other", length = 1000)
    private String driOther;

    // Top Products (out of stock) Availability Check
    @Column(name = "tpvc", length = 1000)
    private String tpvc;

    // Sales Improvement Suggestions
    @Column(name = "sis", length = 1000)
    private String sis;

    @Column(name = "remark", length = 500)
    private String remark;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getTransactionalId() {
        return transactionalId;
    }

    public void setTransactionalId(Long transactionalId) {
        this.transactionalId = transactionalId;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public String getVisitDay() {
        return visitDay;
    }

    public void setVisitDay(String visitDay) {
        this.visitDay = visitDay;
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

    public Integer getStaffTotal() {
        return staffTotal;
    }

    public void setStaffTotal(Integer staffTotal) {
        this.staffTotal = staffTotal;
    }

    public Integer getStaffPlanned() {
        return staffPlanned;
    }

    public void setStaffPlanned(Integer staffPlanned) {
        this.staffPlanned = staffPlanned;
    }

    public Integer getStaffPresent() {
        return staffPresent;
    }

    public void setStaffPresent(Integer staffPresent) {
        this.staffPresent = staffPresent;
    }

    public Integer getStaffAbsent() {
        return staffAbsent;
    }

    public void setStaffAbsent(Integer staffAbsent) {
        this.staffAbsent = staffAbsent;
    }

    public BigDecimal getTodaySale() {
        return todaySale;
    }

    public void setTodaySale(BigDecimal todaySale) {
        this.todaySale = todaySale;
    }

    public Integer getTotalTransaction() {
        return totalTransaction;
    }

    public void setTotalTransaction(Integer totalTransaction) {
        this.totalTransaction = totalTransaction;
    }

    public Integer getFootfall() {
        return footfall;
    }

    public void setFootfall(Integer footfall) {
        this.footfall = footfall;
    }

    public Integer getTotalUnitSold() {
        return totalUnitSold;
    }

    public void setTotalUnitSold(Integer totalUnitSold) {
        this.totalUnitSold = totalUnitSold;
    }

    public BigDecimal getAtv() {
        return atv;
    }

    public void setAtv(BigDecimal atv) {
        this.atv = atv;
    }

    public BigDecimal getUpt() {
        return upt;
    }

    public void setUpt(BigDecimal upt) {
        this.upt = upt;
    }

    public BigDecimal getFootfallConversion() {
        return footfallConversion;
    }

    public void setFootfallConversion(BigDecimal footfallConversion) {
        this.footfallConversion = footfallConversion;
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

    public String getStoreRemark() {
        return storeRemark;
    }

    public void setStoreRemark(String storeRemark) {
        this.storeRemark = storeRemark;
    }

    public String getRcIc() {
        return rcIc;
    }

    public void setRcIc(String rcIc) {
        this.rcIc = rcIc;
    }

    public String getRcDc() {
        return rcDc;
    }

    public void setRcDc(String rcDc) {
        this.rcDc = rcDc;
    }

    public String getAtbs() {
        return atbs;
    }

    public void setAtbs(String atbs) {
        this.atbs = atbs;
    }

    public String getDri() {
        return dri;
    }

    public void setDri(String dri) {
        this.dri = dri;
    }

    public String getDriMmr() {
        return driMmr;
    }

    public void setDriMmr(String driMmr) {
        this.driMmr = driMmr;
    }

    public String getDriPr() {
        return driPr;
    }

    public void setDriPr(String driPr) {
        this.driPr = driPr;
    }

    public String getDriVm() {
        return driVm;
    }

    public void setDriVm(String driVm) {
        this.driVm = driVm;
    }

    public String getDriProductR() {
        return driProductR;
    }

    public void setDriProductR(String driProductR) {
        this.driProductR = driProductR;
    }

    public String getDriMr() {
        return driMr;
    }

    public void setDriMr(String driMr) {
        this.driMr = driMr;
    }

    public String getDriOther() {
        return driOther;
    }

    public void setDriOther(String driOther) {
        this.driOther = driOther;
    }

    public String getTpvc() {
        return tpvc;
    }

    public void setTpvc(String tpvc) {
        this.tpvc = tpvc;
    }

    public String getSis() {
        return sis;
    }

    public void setSis(String sis) {
        this.sis = sis;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
