package com.questretail.storevisit.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactional_log")
public class transactional_log {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "transactional_log_id")
  private Long transactionallogid;

  @Column(name = "visit_date")
  private LocalDate visitDate;

  @Column(name = "visit_day")
  private String visitDay;

  @Column(name = "site_store_code")
  private String sitestorecode;

  @Column(name = "store_name")
  private String storename;

  @Column(name = "planned_staff_count")
  private Integer plannedStaffCount;

  @Column(name = "actual_present_staff_count")
  private Integer actualPresentStaffCount;

  @Column(name = "Today_sales")
  private BigDecimal todaySales;

  @Column(name = "Today_target")
  private BigDecimal todayTarget;

  @Column(name = "Achievement_Percent")
  private BigDecimal achievementPercent;

  @Column(name = "Total_Transactions")
  private Integer totalTransactions;

  @Column(name = "Footfall")
  private Integer footfall; 
  
  @Column(name = "footfall_conversion_percent")
  private Integer footfallconversionpercent;

  @Column(name = "Total_Unit_Sold")
  private Integer totalUnitSold;

  @Column(name = "ATV")
  private BigDecimal atv;

  @Column(name = "UPT")
  private BigDecimal upt;

  @Column(name = "Sales_Status", length = 50)
  private String salesStatus;

  @Column(name = "rc_ic", length = 1000)
  private String rcic;

  @Column(name = "rc_dc", length = 1000)
  private String rcdc;

  @Column(name = "Action_Taken_by_Store", length = 1000)
  private String actionTakenByStore;

  @Column(name = "rc_c", length = 1000)
  private String rcc; 
  
  @Column(name = "osp", length = 1000)
  private String osp;

 @Column(name = "sis", length = 1000)
  private String sis;

 @Column(name = "Remark", length = 2000)
  private String remark;

  @Column(name = "Created_Date")
  private LocalDateTime createdDate;

  @Column(name = "Modified_Date")
  private LocalDateTime modifiedDate;

  // Getters and Setters

public Long getTransactionallogid() {
    return transactionallogid;
}

public void setTransactionallogid(Long transactionallogid) {
    this.transactionallogid = transactionallogid;
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

public String getSitestorecode() {
    return sitestorecode;
}

public void setSitestorecode(String sitestorecode) {
    this.sitestorecode = sitestorecode;
}

public String getStorename() {
    return storename;
}

public void setStorename(String storename) {
    this.storename = storename;
}

public Integer getPlannedStaffCount() {
    return plannedStaffCount;
}

public void setPlannedStaffCount(Integer plannedStaffCount) {
    this.plannedStaffCount = plannedStaffCount;
}

public Integer getActualPresentStaffCount() {
    return actualPresentStaffCount;
}

public void setActualPresentStaffCount(Integer actualPresentStaffCount) {
    this.actualPresentStaffCount = actualPresentStaffCount;
}

public BigDecimal getTodaySales() {
    return todaySales;
}

public void setTodaySales(BigDecimal todaySales) {
    this.todaySales = todaySales;
}

public BigDecimal getTodayTarget() {
    return todayTarget;
}

public void setTodayTarget(BigDecimal todayTarget) {
    this.todayTarget = todayTarget;
}

public BigDecimal getAchievementPercent() {
    return achievementPercent;
}

public void setAchievementPercent(BigDecimal achievementPercent) {
    this.achievementPercent = achievementPercent;
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

public Integer getFootfallconversionpercent() {
    return footfallconversionpercent;
}

public void setFootfallconversionpercent(Integer footfallconversionpercent) {
    this.footfallconversionpercent = footfallconversionpercent;
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

public String getSalesStatus() {
    return salesStatus;
}

public void setSalesStatus(String salesStatus) {
    this.salesStatus = salesStatus;
}

public String getRcic() {
    return rcic;
}

public void setRcic(String rcic) {
    this.rcic = rcic;
}

public String getRcdc() {
    return rcdc;
}

public void setRcdc(String rcdc) {
    this.rcdc = rcdc;
}

public String getActionTakenByStore() {
    return actionTakenByStore;
}

public void setActionTakenByStore(String actionTakenByStore) {
    this.actionTakenByStore = actionTakenByStore;
}

public String getRcc() {
    return rcc;
}

public void setRcc(String rcc) {
    this.rcc = rcc;
}

public String getOsp() {
    return osp;
}

public void setOsp(String osp) {
    this.osp = osp;
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

public LocalDateTime getCreatedDate() {
    return createdDate;
}

public void setCreatedDate(LocalDateTime createdDate) {
    this.createdDate = createdDate;
}

public LocalDateTime getModifiedDate() {
    return modifiedDate;
}

public void setModifiedDate(LocalDateTime modifiedDate) {
    this.modifiedDate = modifiedDate;
}

}

