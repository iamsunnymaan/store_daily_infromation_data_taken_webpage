package com.dsr.backend.repository;

import com.dsr.backend.entity.TargetMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TargetMasterRepository extends JpaRepository<TargetMaster, Long> {

    List<TargetMaster> findBySiteCode(String siteCode);

    Optional<TargetMaster> findBySiteCodeAndTargetYearAndTargetMonth(String siteCode, Integer targetYear, Integer targetMonth);
}
