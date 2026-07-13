    package com.questretail.storevisit.service;

    import com.questretail.storevisit.dto.StoreAccessResponse;
    import com.questretail.storevisit.model.SiteMaster;
    import com.questretail.storevisit.model.TargetMaster;
    import com.questretail.storevisit.repository.SiteMasterRepository;
    import com.questretail.storevisit.repository.TargetRepository;
    import java.math.BigDecimal;
    import java.math.RoundingMode;
    import java.time.DayOfWeek;
    import java.time.LocalDate;
    import java.time.YearMonth;

    import org.springframework.stereotype.Service;

    @Service
    public class StoreAccessService {

      private final SiteMasterRepository siteMasterRepository;
      private final TargetRepository targetRepository;

      public StoreAccessService(SiteMasterRepository siteMasterRepository, TargetRepository targetRepository) {
        this.siteMasterRepository = siteMasterRepository;
        this.targetRepository = targetRepository;
      }

      public StoreAccessResponse validateAccess(String sitestorecode, String accessCode, LocalDate visitDate) {
        System.out.println("[DEBUG_LOG] Validating access for site: [" + sitestorecode + "], accessCode: [" + accessCode + "], visitDate: [" + visitDate + "]");
        SiteMaster store = siteMasterRepository.findBysitestorecodeAndAccessCode(sitestorecode, accessCode)
            .orElseThrow(() -> new IllegalArgumentException("Invalid access code or store code."));

        if (visitDate == null) {
            visitDate = LocalDate.now();
        }

        LocalDate monthStart = visitDate.withDayOfMonth(1);
        LocalDate monthEnd = visitDate.with(java.time.temporal.TemporalAdjusters.lastDayOfMonth());
        System.out.println("[DEBUG_LOG] Searching target for site: [" + sitestorecode + "], Month Range: [" + monthStart + "] to [" + monthEnd + "]");
        BigDecimal monthlyTarget = BigDecimal.ZERO;
        try {
          java.util.List<TargetMaster> targetMasters = targetRepository.findTargetsForMonth(sitestorecode, monthStart, monthEnd);
          if (targetMasters != null && !targetMasters.isEmpty()) {
              monthlyTarget = targetMasters.get(0).getmonthlytarget();
              System.out.println("[DEBUG_LOG] Found " + targetMasters.size() + " records. Using target from first record (No: " + targetMasters.get(0).getNo() + "): " + monthlyTarget);
          } else {
              System.out.println("[DEBUG_LOG] No records found in target_master for site: [" + sitestorecode + "] between " + monthStart + " and " + monthEnd);
              // Fallback: try searching without the date range to see if any target exists for this site at all
              java.util.List<TargetMaster> allSiteTargetMasters = targetRepository.findBySitestorecode(sitestorecode);
              System.out.println("[DEBUG_LOG] Total records for this site in target_master: " + (allSiteTargetMasters != null ? allSiteTargetMasters.size() : 0));
              if (allSiteTargetMasters != null && !allSiteTargetMasters.isEmpty()) {
                  System.out.println("[DEBUG_LOG] Sample record Month: " + allSiteTargetMasters.get(0).getmonths());
              }
          }
        } catch (Exception e) {
          System.err.println("[DEBUG_LOG] Exception during target lookup: " + e.getClass().getName() + " - " + e.getMessage());
          e.printStackTrace();
        }

        BigDecimal dailyTarget = BigDecimal.ZERO;
        if (monthlyTarget.compareTo(BigDecimal.ZERO) > 0) {
            dailyTarget = calculateWeightedDailyTarget(monthlyTarget, visitDate);
        }

        return new StoreAccessResponse(
            store.getsite_store_code(),
            store.getStores(),
            store.getCity(),
            store.getState(),
            dailyTarget
        );
      }

      private BigDecimal calculateWeightedDailyTarget(BigDecimal monthlyTarget, LocalDate visitDate) {
        YearMonth yearMonth = YearMonth.from(visitDate);
        int daysInMonth = yearMonth.lengthOfMonth();
        int weekdays = 0;
        int weekends = 0;

        for (int day = 1; day <= daysInMonth; day++) {
            LocalDate date = yearMonth.atDay(day);
            DayOfWeek dow = date.getDayOfWeek();
            if (dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY) {
                weekends++;
            } else {
                weekdays++;
            }
        }

        // W_total = (D_wd * 1.0) + (D_we * 1.2)
        BigDecimal totalWeightedDays = BigDecimal.valueOf(weekdays)
            .add(BigDecimal.valueOf(weekends).multiply(BigDecimal.valueOf(1.2)));

        // Target_base = T_month / W_total
        BigDecimal baseDailyTarget = monthlyTarget.divide(totalWeightedDays, 4, RoundingMode.HALF_UP);

        DayOfWeek visitDay = visitDate.getDayOfWeek();
        if (visitDay == DayOfWeek.SATURDAY || visitDay == DayOfWeek.SUNDAY) {
            // Target_weekend = Target_base * 1.2
            return baseDailyTarget.multiply(BigDecimal.valueOf(1.2)).setScale(2, RoundingMode.HALF_UP);
        } else {
            return baseDailyTarget.setScale(2, RoundingMode.HALF_UP);
        }
      }
    }
