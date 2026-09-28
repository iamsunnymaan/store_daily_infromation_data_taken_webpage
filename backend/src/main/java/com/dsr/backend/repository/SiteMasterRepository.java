package com.dsr.backend.repository;

import com.dsr.backend.entity.SiteMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SiteMasterRepository extends JpaRepository<SiteMaster, String> {

    Optional<SiteMaster> findBySiteCodeAndAccessCode(String siteCode, String accessCode);
}
