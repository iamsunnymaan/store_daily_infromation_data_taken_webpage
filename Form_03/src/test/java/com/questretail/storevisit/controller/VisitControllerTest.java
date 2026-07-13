package com.questretail.storevisit.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.questretail.storevisit.dto.VisitSubmissionRequest;
import com.questretail.storevisit.service.VisitService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(controllers = VisitController.class)
public class VisitControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VisitService visitService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testSubmit_ValidationFailure() throws Exception {
        VisitSubmissionRequest request = new VisitSubmissionRequest(
            LocalDate.now(),
            "Monday",
            "S001",
            "1234",
            "Store 1",
            new BigDecimal("1000.0"),
            new BigDecimal("1000.0"),
            10,
            100,
            5,
            "On Target",
            10,
            10,
            Collections.emptyList(),
            Collections.emptyList(),
            Collections.emptyList(),
            Collections.emptyList(),
            Collections.emptyList(),
            Collections.emptyList(),
            Collections.emptyList(),
            Collections.emptyList(),
            Collections.emptyList(),
            "Remarks"
        );

        // Simulate service throwing validation error
        when(visitService.submit(any())).thenThrow(new IllegalArgumentException("Invalid data"));

        mockMvc.perform(post("/api/visits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.message").value("Invalid data"));
    }
}
