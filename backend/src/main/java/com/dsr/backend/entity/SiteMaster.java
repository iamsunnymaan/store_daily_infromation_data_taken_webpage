    package com.dsr.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "Site_master", indexes = {
        @Index(name = "idx_site_master_channel", columnList = "Channel")
})
public class SiteMaster {

    @Id
    @Column(name = "Site_Code", length = 50, nullable = false)
    private String siteCode;

    @Column(name = "Brand", length = 100, nullable = false)
    private String brand;

    @Column(name = "Store_Name", length = 255, nullable = true)
    private String storeName;

    @Column(name = "Address", length = 500, nullable = true)
    private String address;

    @Column(name = "City", length = 100, nullable = true)
    private String city;

    @Column(name = "State", length = 100, nullable = true)
    private String state;

    @Column(name = "Region", length = 100, nullable = true)
    private String region;

    @Column(name = "Channel", length = 100, nullable = true)
    private String channel;

    @Column(name = "Sub_Channel", length = 100, nullable = true)
    private String subChannel;

    @Column(name = "Partner", length = 150, nullable = true)
    private String partner;

    @Column(name = "RM", length = 100, nullable = true)
    private String rm;

    @Column(name = "AM", length = 100, nullable = true)
    private String am;

    @Column(name = "CM", length = 100, nullable = true)
    private String cm;

    @Column(name = "SM", length = 100, nullable = true)
    private String sm;

    @Column(name = "Opening_Date", nullable = true)
    private LocalDate openingDate;

    @Column(name = "Operational_Status", length = 50, nullable = true)
    private String operationalStatus;

    @Column(name = "Sales_Type", length = 50, nullable = true)
    private String salesType;

    @Column(name = "Access_Code", length = 5, nullable = true, unique = true)
    private String accessCode;

    public String getSiteCode() {
        return siteCode;
    }

    public void setSiteCode(String siteCode) {
        this.siteCode = siteCode;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getSubChannel() {
        return subChannel;
    }

    public void setSubChannel(String subChannel) {
        this.subChannel = subChannel;
    }

    public String getPartner() {
        return partner;
    }

    public void setPartner(String partner) {
        this.partner = partner;
    }

    public String getRm() {
        return rm;
    }

    public void setRm(String rm) {
        this.rm = rm;
    }

    public String getAm() {
        return am;
    }

    public void setAm(String am) {
        this.am = am;
    }

    public String getCm() {
        return cm;
    }

    public void setCm(String cm) {
        this.cm = cm;
    }

    public String getSm() {
        return sm;
    }

    public void setSm(String sm) {
        this.sm = sm;
    }

    public LocalDate getOpeningDate() {
        return openingDate;
    }

    public void setOpeningDate(LocalDate openingDate) {
        this.openingDate = openingDate;
    }

    public String getOperationalStatus() {
        return operationalStatus;
    }

    public void setOperationalStatus(String operationalStatus) {
        this.operationalStatus = operationalStatus;
    }

    public String getSalesType() {
        return salesType;
    }

    public void setSalesType(String salesType) {
        this.salesType = salesType;
    }

    public String getAccessCode() {
        return accessCode;
    }

    public void setAccessCode(String accessCode) {
        this.accessCode = accessCode;
    }
}
