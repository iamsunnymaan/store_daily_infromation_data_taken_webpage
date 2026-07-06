package com.questretail.storevisit.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "target_table")
public class Target {

  @Id
  @Column(name = "no")
  private Long no;

  @Column(name = "site_store_code")
  private String sitestorecode;

  @Column(name = "Stores")
  private String stores;

  @Column(name = "Channel")
  private String channel;

  @Column(name = "Month")
  private String month;

  @Column(name = "Target")
  private BigDecimal target;

  public Long getNo() {
    return no;
  }

  public String getsitestorecode() {
    return sitestorecode;
  }

  public String getStores() {
    return stores;
  }

  public String getChannel() {
    return channel;
  }

  public String getMonth() {
    return month;
  }

  public BigDecimal getTarget() {
    return target;
  }
}
