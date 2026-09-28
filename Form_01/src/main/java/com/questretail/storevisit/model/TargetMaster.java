package com.questretail.storevisit.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "target_master")
public class TargetMaster {

  @Id
  @Column(name = "no")
  private Long no;

  @Column(name = "site_store_code")
  private String sitestorecode;

  @Column(name = "store_name")
  private String storename;

  @Column(name = "months")
  private java.time.LocalDate months;

  @Column(name = "monthly_target")
  private BigDecimal monthlytarget;

  public Long getNo() {
    return no;
  }
  public String getsitestorecode() {return sitestorecode; }
  public String getstorename() {return storename; }
  public java.time.LocalDate getmonths() {return months; }
  public BigDecimal getmonthlytarget() {return monthlytarget;}
}
