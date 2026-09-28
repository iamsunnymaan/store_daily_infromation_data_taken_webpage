package com.dsr.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class SiteAccessRequest {

    @NotBlank
    private String siteCode;

    @NotBlank
    private String accessCode;

    public String getSiteCode() {
        return siteCode;
    }

    public void setSiteCode(String siteCode) {
        this.siteCode = siteCode;
    }

    public String getAccessCode() {
        return accessCode;
    }

    public void setAccessCode(String accessCode) {
        this.accessCode = accessCode;
    }
}
