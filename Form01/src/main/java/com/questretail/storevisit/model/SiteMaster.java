package com.questretail.storevisit.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "site_master")
public class SiteMaster {

  @Id
  @Column(name = "site_store_code")
  private String sitestorecode;

  @Column(name = "Stores")
  private String stores;

  @Column(name = "City")
  private String city;

  @Column(name = "State")
  private String state;

  @Column(name = "Region")
  private String region;

  @Column(name = "Channel")
  private String channel;

  @Column(name = "SubChanne")
  private String subChannel;

  @Column(name = "Location")
  private String location;

  @Column(name = "access_code")
  private String accessCode;

  public String getsite_store_code() {
    return sitestorecode;
  }

  public String getStores() {
    return stores;
  }

  public String getCity() {
    return city;
  }

  public String getState() {
    return state;
  }

  public String getRegion() {
    return region;
  }

  public String getChannel() {
    return channel;
  }

  public String getSubChannel() {
    return subChannel;
  }

  public String getLocation() {
    return location;
  }

  public String getAccessCode() {
    return accessCode;
  }
}
