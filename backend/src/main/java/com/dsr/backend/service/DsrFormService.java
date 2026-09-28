package com.dsr.backend.service;

import com.dsr.backend.dto.DsrFormRequest;
import com.dsr.backend.entity.DsrFormLog;
import com.dsr.backend.repository.DsrFormLogRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

@Service
public class DsrFormService {

    private final DsrFormLogRepository dsrFormLogRepository;

    public DsrFormService(DsrFormLogRepository dsrFormLogRepository) {
        this.dsrFormLogRepository = dsrFormLogRepository;
    }

    public DsrFormLog saveSubmission(DsrFormRequest request) {
        DsrFormLog log = new DsrFormLog();

        log.setVisitDate(request.getVisitDate());
        log.setVisitDay(request.getVisitDate().getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.ENGLISH));
        log.setStoreCode(request.getStoreCode());
        log.setStoreName(request.getStoreName());

        log.setStaffTotal(request.getTotalStaffCount());
        log.setStaffPlanned(request.getPlannedStaffCount());
        log.setStaffPresent(request.getPresentStaffCount());
        log.setStaffAbsent(request.getAbsentStaffCount());

        log.setTodaySale(request.getTodaySales());
        log.setTotalTransaction(request.getTotalTransactions());
        log.setFootfall(request.getFootfall());
        log.setTotalUnitSold(request.getTotalUnitsSold());

        log.setAtv(calculateAtv(request.getTodaySales(), request.getTotalTransactions()));
        log.setUpt(calculateUpt(request.getTotalUnitsSold(), request.getTotalTransactions()));
        log.setFootfallConversion(calculateFootfallConversion(request.getTotalTransactions(), request.getFootfall()));

        log.setSalesStatus(request.getSalesStatus());
        log.setStoreStatus(request.getStoreStatus());
        log.setStoreRemark(request.getStoreClosedReason());

        log.setRcIc(join(request.getReasonsForIncrease()));
        log.setRcDc(join(request.getReasonsForDecrease()));
        log.setAtbs(join(request.getActionTakenByStoreTeam()));

        log.setDriMmr(join(request.getMallMarketIssues()));
        log.setDriPr(join(request.getProjectIssues()));
        log.setDriVm(join(request.getVmIssues()));
        log.setDriProductR(join(request.getProductIssues()));
        log.setDriMr(join(request.getMerchandiseIssues()));
        log.setDriOther(join(request.getOtherDepartmentIssues()));

        log.setTpvc(join(request.getOutOfStockProducts()));
        log.setSis(join(request.getSalesImprovementSuggestions()));

        log.setRemark(request.getRemark());

        return dsrFormLogRepository.save(log);
    }

    private BigDecimal calculateAtv(BigDecimal todaySales, Integer totalTransactions) {
        if (todaySales == null || totalTransactions == null || totalTransactions == 0) {
            return null;
        }
        return todaySales.divide(BigDecimal.valueOf(totalTransactions), 2, RoundingMode.HALF_UP);
    }

    private BigDecimal calculateUpt(Integer totalUnitsSold, Integer totalTransactions) {
        if (totalUnitsSold == null || totalTransactions == null || totalTransactions == 0) {
            return null;
        }
        return BigDecimal.valueOf(totalUnitsSold).divide(BigDecimal.valueOf(totalTransactions), 2, RoundingMode.HALF_UP);
    }

    private BigDecimal calculateFootfallConversion(Integer totalTransactions, Integer footfall) {
        if (totalTransactions == null || footfall == null || footfall == 0) {
            return null;
        }
        return BigDecimal.valueOf(totalTransactions)
                .divide(BigDecimal.valueOf(footfall), 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(2, RoundingMode.HALF_UP);
    }

    private String join(List<String> values) {
        if (values == null || values.isEmpty()) {
            return null;
        }
        return String.join(", ", values);
    }
}
