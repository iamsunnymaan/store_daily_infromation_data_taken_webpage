package com.questretail.storevisit.dto;

import java.math.BigDecimal;

public record StoreAccessResponse(
    String site_store_code,
    String stores,
    String city,
    String state,
    BigDecimal todayTarget
) {
}
