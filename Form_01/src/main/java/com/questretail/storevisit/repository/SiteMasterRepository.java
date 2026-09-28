package com.questretail.storevisit.repository;

import com.questretail.storevisit.model.SiteMaster;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteMasterRepository extends JpaRepository<SiteMaster, String> {

  Optional<SiteMaster> findBysitestorecodeAndAccessCode(String site, String accessCode);
}
