package com.questretail.storevisit.dto;

import java.math.BigDecimal;

public record StoreAccessResponse(
    String site_store_code,
    String stores,
    String city,
    String state,
    String region,
    String channel,
    String subChannel,
    String location,
    BigDecimal todayTarget
) {
}
