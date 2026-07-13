package com.questretail.storevisit.repository;

import com.questretail.storevisit.model.transactional_log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Transactional_logRepository extends JpaRepository<transactional_log, Long> {

}