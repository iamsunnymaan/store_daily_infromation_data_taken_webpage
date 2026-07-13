package com.questretail.storevisit.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import com.questretail.storevisit.dto.StoreAccessResponse;
import com.questretail.storevisit.model.SiteMaster;
import com.questretail.storevisit.model.TargetMaster;
import com.questretail.storevisit.repository.SiteMasterRepository;
import com.questretail.storevisit.repository.TargetRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.lang.reflect.Field;

@ExtendWith(MockitoExtension.class)
public class StoreAccessServiceTest {

    @Mock
    private SiteMasterRepository siteMasterRepository;

    @Mock
    private TargetRepository targetRepository;

    private StoreAccessService storeAccessService;

    @BeforeEach
    void setUp() {
        storeAccessService = new StoreAccessService(siteMasterRepository, targetRepository);
    }

    @Test
    void testCalculateWeightedDailyTarget_July2026() throws Exception {
        // July 2026: 
        // Weekdays: 23 (Mon-Fri)
        // Weekends: 8 (Sat-Sun)
        // Total Weighted Days = 23 * 1.0 + 8 * 1.2 = 23 + 9.6 = 32.6
        
        BigDecimal monthlyTarget = new BigDecimal("32600");
        // Base Target = 32600 / 32.6 = 1000
        // Weekday Target = 1000
        // Weekend Target = 1000 * 1.2 = 1200

        String sitestorecode = "S001";
        String accessCode = "1234";
        
        SiteMaster store = new SiteMaster();
        setField(store, "sitestorecode", sitestorecode);
        setField(store, "stores", "Test Store");
        setField(store, "city", "Test City");
        setField(store, "state", "Test State");
        setField(store, "accessCode", accessCode);

        TargetMaster targetMaster = new TargetMaster();
        setField(targetMaster, "target", monthlyTarget);

        when(siteMasterRepository.findBysitestorecodeAndAccessCode(eq(sitestorecode), eq(accessCode)))
            .thenReturn(Optional.of(store));
        
        when(targetRepository.findTargetsForMonth(eq(sitestorecode), any(LocalDate.class), any(LocalDate.class)))
            .thenReturn(java.util.Collections.singletonList(targetMaster));

        // Test a weekday (Tuesday, July 7, 2026)
        LocalDate weekday = LocalDate.of(2026, 7, 7);
        StoreAccessResponse responseWeekday = storeAccessService.validateAccess(sitestorecode, accessCode, weekday);
        assertEquals(new BigDecimal("1000.00"), responseWeekday.todayTarget());

        // Test a weekend (Sunday, July 5, 2026)
        LocalDate weekend = LocalDate.of(2026, 7, 5);
        StoreAccessResponse responseWeekend = storeAccessService.validateAccess(sitestorecode, accessCode, weekend);
        assertEquals(new BigDecimal("1200.00"), responseWeekend.todayTarget());
    }

    private void setField(Object obj, String fieldName, Object value) throws Exception {
        Field field = obj.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(obj, value);
    }
}
