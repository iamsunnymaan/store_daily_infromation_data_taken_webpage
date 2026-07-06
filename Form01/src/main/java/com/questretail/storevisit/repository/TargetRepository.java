package com.questretail.storevisit.repository;

import com.questretail.storevisit.model.Target;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TargetRepository extends JpaRepository<Target, Long> {

  Optional<Target> findFirstBysitestorecodeAndMonthOrderByNoDesc(String site, String month);
}
