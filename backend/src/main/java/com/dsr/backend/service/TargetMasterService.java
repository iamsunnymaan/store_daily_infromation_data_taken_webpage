package com.dsr.backend.service;

import com.dsr.backend.dto.TargetRequest;
import com.dsr.backend.entity.TargetMaster;
import com.dsr.backend.repository.TargetMasterRepository;
import org.springframework.stereotype.Service;

@Service
public class TargetMasterService {

    private final TargetMasterRepository targetMasterRepository;

    public TargetMasterService(TargetMasterRepository targetMasterRepository) {
        this.targetMasterRepository = targetMasterRepository;
    }

    public TargetMaster upsert(TargetRequest request) {
        TargetMaster target = targetMasterRepository
                .findBySiteCodeAndTargetYearAndTargetMonth(request.getSiteCode(), request.getTargetYear(), request.getTargetMonth())
                .orElseGet(TargetMaster::new);

        target.setSiteCode(request.getSiteCode());
        target.setTargetYear(request.getTargetYear());
        target.setTargetMonth(request.getTargetMonth());
        target.setTargetAmount(request.getTargetAmount());

        return targetMasterRepository.save(target);
    }
}
