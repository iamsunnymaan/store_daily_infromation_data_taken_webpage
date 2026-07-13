package com.questretail.storevisit.repository;
  
import com.questretail.storevisit.model.TargetMaster;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TargetRepository extends JpaRepository<TargetMaster, Long> {

  java.util.List<TargetMaster> findBySitestorecode(String site);

  @Query("SELECT t FROM TargetMaster t WHERE t.sitestorecode = :site AND t.months >= :start AND t.months <= :end ORDER BY t.no DESC")
  java.util.List<TargetMaster> findTargetsForMonth(
      @Param("site") String site, 
      @Param("start") LocalDate start, 
      @Param("end") LocalDate end
  );

  Optional<TargetMaster> findFirstBySitestorecodeAndMonthsOrderByNoDesc(
          String site,
          LocalDate months);
}
