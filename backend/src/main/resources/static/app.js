const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const sidebar = document.getElementById("appSidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const sidebarCollapseToggle = document.getElementById("sidebarCollapseToggle");
const sidebarCollapseIcon = sidebarCollapseToggle.querySelector("i");

function showPage(pageId) {
  pages.forEach((page) => page.classList.toggle("active", page.id === pageId));
  navLinks.forEach((link) => link.classList.toggle("active", link.dataset.page === pageId));
}

function closeSidebar() {
  sidebar.classList.remove("show");
  sidebarBackdrop.classList.remove("show");
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(link.dataset.page);
    closeSidebar();
  });
});

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("show");
  sidebarBackdrop.classList.toggle("show");
});

sidebarBackdrop.addEventListener("click", closeSidebar);

const currentDateInput = document.getElementById("currentDate");
const statusSelectedDate = document.getElementById("statusSelectedDate");

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateStatusSelectedDate() {
  if (!statusSelectedDate) return;
  statusSelectedDate.textContent = (currentDateInput && currentDateInput.value) || "—";
}

if (currentDateInput) {
  const today = new Date();
  const earliestAllowedDate = new Date();
  earliestAllowedDate.setDate(today.getDate() - 3);

  const todayStr = formatLocalDate(today);
  const earliestAllowedStr = formatLocalDate(earliestAllowedDate);

  currentDateInput.value = todayStr;
  currentDateInput.max = todayStr;
  currentDateInput.min = earliestAllowedStr;

  currentDateInput.addEventListener("change", () => {
    if (!currentDateInput.value || currentDateInput.value < earliestAllowedStr || currentDateInput.value > todayStr) {
      currentDateInput.value = todayStr;
    }
    updateStatusSelectedDate();
  });
}
updateStatusSelectedDate();

const storeAccessForm = document.getElementById("storeAccessForm");
const storeAccessMessage = document.getElementById("storeAccessMessage");

function setStoreAccessMessage(message, isError) {
  if (!storeAccessMessage) return;
  storeAccessMessage.textContent = message;
  storeAccessMessage.classList.toggle("form-message-error", isError);
  storeAccessMessage.classList.toggle("form-message-success", !isError);
}

if (storeAccessForm) {
  storeAccessForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const accessCode = document.getElementById("accessCode").value.trim();
    const storeCode = document.getElementById("storeCode").value.trim();

    try {
      const response = await fetch(`${API_BASE_URL}/api/site-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteCode: storeCode, accessCode }),
      });

      if (!response.ok) {
        setStoreAccessMessage("Invalid access code or store code.", true);
        return;
      }

      const site = await response.json();
      setStoreAccessMessage("Access granted.", false);
      console.log("Store access granted:", site);

      document.getElementById("storeName").textContent = site.storeName || "—";
      document.getElementById("storeManager").textContent = site.sm || "—";
      document.getElementById("storeContact").textContent = "—";
      document.getElementById("storeAddress").textContent = site.address || "—";

      document.getElementById("dsrWorkspace")?.classList.remove("hidden");

      try {
        localStorage.setItem("verifiedSite", JSON.stringify(site));
      } catch (storageError) {
        console.warn("Unable to persist verified site:", storageError);
      }
    } catch (error) {
      console.error("Store access check failed:", error);
      setStoreAccessMessage("Unable to verify access right now. Please try again.", true);
    }
  });
}

const todaySalesInput = document.getElementById("todaySales");
const totalTransactionsInput = document.getElementById("totalTransactions");
const footfallInput = document.getElementById("footfall");
const totalUnitsSoldInput = document.getElementById("totalUnitsSold");
const footfallConversionInput = document.getElementById("footfallConversion");
const atvInput = document.getElementById("atv");
const uptInput = document.getElementById("upt");

function updateKpiFields() {
  const sales = parseFloat(todaySalesInput?.value) || 0;
  const transactions = parseFloat(totalTransactionsInput?.value) || 0;
  const footfall = parseFloat(footfallInput?.value) || 0;
  const unitsSold = parseFloat(totalUnitsSoldInput?.value) || 0;

  if (footfallConversionInput) {
    footfallConversionInput.value = footfall > 0 ? `${((transactions / footfall) * 100).toFixed(2)}%` : "";
  }
  if (atvInput) {
    atvInput.value = transactions > 0 ? (sales / transactions).toFixed(2) : "";
  }
  if (uptInput) {
    uptInput.value = transactions > 0 ? (unitsSold / transactions).toFixed(2) : "";
  }
}

if (todaySalesInput) {
  todaySalesInput.addEventListener("input", () => {
    let value = todaySalesInput.value.replace(/[^0-9.]/g, "");
    const firstDotIndex = value.indexOf(".");
    if (firstDotIndex !== -1) {
      value = value.slice(0, firstDotIndex + 1) + value.slice(firstDotIndex + 1).replace(/\./g, "");
    }
    todaySalesInput.value = value;
  });
}

[todaySalesInput, totalTransactionsInput, footfallInput, totalUnitsSoldInput].forEach((input) => {
  if (input) input.addEventListener("input", updateKpiFields);
});

const salesStatusRadios = document.querySelectorAll('input[name="salesStatus"]');
const reasonsIncreaseCard = document.getElementById("reasonsIncreaseCard");
const reasonsDecreaseCard = document.getElementById("reasonsDecreaseCard");
const statusCardRight = document.getElementById("statusCardRight");

function updateReasonsCardVisibility() {
  const selected = document.querySelector('input[name="salesStatus"]:checked')?.value;
  const showIncrease = selected === "Above Target" || selected === "On Target";
  const showDecrease = selected === "Below Target" || selected === "Very Poor";

  if (reasonsIncreaseCard) reasonsIncreaseCard.classList.toggle("hidden", !showIncrease);
  if (reasonsDecreaseCard) reasonsDecreaseCard.classList.toggle("hidden", !showDecrease);
  if (statusCardRight) statusCardRight.classList.toggle("hidden", !selected);
}

salesStatusRadios.forEach((radio) => {
  radio.addEventListener("change", updateReasonsCardVisibility);
});
updateReasonsCardVisibility();

const storeStatusRadios = document.querySelectorAll('input[name="storeStatus"]');
const storeClosedReasonField = document.getElementById("storeClosedReasonField");
const storeClosedReasonInput = document.getElementById("storeClosedReason");
const storeStatusActionRow = document.getElementById("storeStatusActionRow");

function updateStoreClosedReasonVisibility() {
  const isClosed = document.querySelector('input[name="storeStatus"]:checked')?.value === "Closed";
  if (storeClosedReasonField) storeClosedReasonField.classList.toggle("hidden", !isClosed);
  if (storeStatusActionRow) storeStatusActionRow.classList.toggle("hidden", !isClosed);
  if (storeClosedReasonInput) {
    storeClosedReasonInput.required = isClosed;
    if (!isClosed) storeClosedReasonInput.value = "";
  }
}

storeStatusRadios.forEach((radio) => {
  radio.addEventListener("change", updateStoreClosedReasonVisibility);
});
updateStoreClosedReasonVisibility();

const storeStatusSaveBtn = document.getElementById("storeStatusSaveBtn");
const storeStatusInputs = document.querySelectorAll('#storeStatusGroup input, #storeClosedReason');
let storeStatusSaved = false;

function setStoreStatusSaved(saved) {
  storeStatusSaved = saved;
  storeStatusInputs.forEach((input) => {
    input.disabled = saved;
  });
  if (storeStatusSaveBtn) {
    storeStatusSaveBtn.classList.toggle("is-editing", saved);
    storeStatusSaveBtn.innerHTML = saved
      ? '<i class="bi bi-pencil"></i><span>Edit</span>'
      : '<i class="bi bi-check2-circle"></i><span>Save</span>';
  }
}

if (storeStatusSaveBtn) {
  storeStatusSaveBtn.addEventListener("click", () => {
    setStoreStatusSaved(!storeStatusSaved);
  });
}

const departmentSections = [
  {
    key: "mallMarketIssues",
    title: "Mall / Market Related",
    options: [
      "No Issue",
      "Low Walk-ins in Mall",
      "Mall Renovation / Civil Work",
      "Nearby Competitor Activity",
      "Mall Event Impact",
      "Parking Issue",
      "Entry Access Issue",
      "Security Restriction",
      "Weather Impact",
      "Low Weekend Footfall",
      "Local Market Shutdown",
      "Festival / Political Impact",
      "Other"
    ]
  },
  {
    key: "projectIssues",
    title: "Project Related",
    options: [
      "No Issue",
      "Store Renovation Ongoing",
      "New Fixture Installation Pending",
      "Project Delay from Head Office",
      "Vendor Work Incomplete",
      "Electrical Work Pending",
      "Civil Work Pending",
      "Branding Work Pending",
      "Signage Installation Pending",
      "Project Material Not Received",
      "Other"
    ]
  },
  {
    key: "vmIssues",
    title: "VM Related",
    options: [
      "No Issue",
      "Window Display Not Updated",
      "Mannequin Styling Pending",
      "New Season Set-up Pending",
      "VM Kit Not Received",
      "Poor Product Placement",
      "Lighting Issue",
      "Signage / POP Material Missing",
      "Price Tag Issue",
      "VM Guideline Not Followed",
      "Other"
    ]
  },
  {
    key: "productIssues",
    title: "Product Related",
    options: [
      "No Issue",
      "Fast Moving Product Out of Stock",
      "Wrong Product Mix",
      "Excess Slow Moving Stock",
      "Product Quality Complaint",
      "Size / Variant Not Available",
      "Pricing Discrepancy",
      "Barcode / Tagging Issue",
      "Damaged Product Received",
      "New Launch Not Received",
      "Other"
    ]
  },
  {
    key: "merchandiseIssues",
    title: "Merchandise Related",
    options: [
      "No Issue",
      "Stock Replenishment Delay",
      "Inventory Mismatch",
      "Excess Inventory",
      "Shortage in Key Categories",
      "Transfer / GRN Pending",
      "Damaged / Return Stock Pending",
      "Audit Discrepancy",
      "Packing Material Shortage",
      "Other"
    ]
  },
  {
    key: "otherDepartmentIssues",
    title: "Other",
    options: [
      "No Issue",
      "Staff Related Issue",
      "Training Requirement",
      "System / Software Issue",
      "HR / Attendance Issue",
      "Compliance / Audit Issue",
      "Other"
    ]
  }
];

const departmentAccordion = document.getElementById("departmentAccordion");

function renderDepartmentAccordion() {
  if (!departmentAccordion) return;

  departmentAccordion.innerHTML = departmentSections
    .map((section) => `
      <div class="accordion-item">
        <button type="button" class="accordion-header" aria-expanded="false">
          <span>${section.title}</span>
          <i class="bi bi-chevron-down"></i>
        </button>
        <div class="accordion-body check-list collapsed" data-list="${section.key}">
          ${section.options
            .map((option) => `<label><input type="checkbox" name="${section.key}" value="${option}"> ${option}</label>`)
            .join("")}
        </div>
      </div>
    `)
    .join("");

  const allHeaders = departmentAccordion.querySelectorAll(".accordion-header");

  allHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;
      const wasOpen = header.classList.contains("is-open");

      allHeaders.forEach((otherHeader) => {
        if (otherHeader === header) return;
        otherHeader.classList.remove("is-open");
        otherHeader.setAttribute("aria-expanded", "false");
        const otherBody = otherHeader.nextElementSibling;
        if (otherBody) otherBody.classList.add("collapsed");
      });

      header.classList.toggle("is-open", !wasOpen);
      header.setAttribute("aria-expanded", String(!wasOpen));
      if (body) body.classList.toggle("collapsed", wasOpen);
    });
  });
}

renderDepartmentAccordion();

const REMARK_WORD_LIMIT = 50;
const remarkInput = document.getElementById("remark");
const remarkWordCount = document.getElementById("remarkWordCount");

function getWords(text) {
  return text.trim().length ? text.trim().split(/\s+/) : [];
}

function updateRemarkWordCount() {
  if (!remarkWordCount || !remarkInput) return;
  const count = getWords(remarkInput.value).length;
  remarkWordCount.textContent = `${count} / ${REMARK_WORD_LIMIT} words`;
  remarkWordCount.classList.toggle("field-hint-limit", count >= REMARK_WORD_LIMIT);
}

if (remarkInput) {
  remarkInput.addEventListener("input", () => {
    const words = getWords(remarkInput.value);
    if (words.length > REMARK_WORD_LIMIT) {
      remarkInput.value = words.slice(0, REMARK_WORD_LIMIT).join(" ");
    }
    updateRemarkWordCount();
  });
  updateRemarkWordCount();
}

const API_BASE_URL = "http://localhost:8080";

const dsrSubmitBtn = document.getElementById("dsrSubmitBtn");
const dsrSubmitMessage = document.getElementById("dsrSubmitMessage");

function setDsrSubmitMessage(message, isError) {
  if (!dsrSubmitMessage) return;
  dsrSubmitMessage.textContent = message;
  dsrSubmitMessage.classList.toggle("form-message-error", isError);
  dsrSubmitMessage.classList.toggle("form-message-success", !isError);
}

function getCheckedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function toNumberOrNull(value) {
  if (value === undefined || value === null || value === "") return null;
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

function buildDsrFormPayload() {
  const storeNameValue = document.getElementById("storeName")?.textContent.trim();

  return {
    visitDate: currentDateInput?.value || null,
    storeCode: document.getElementById("storeCode")?.value.trim() || "",
    storeName: storeNameValue && storeNameValue !== "—" ? storeNameValue : null,
    totalStaffCount: toNumberOrNull(document.getElementById("totalStaffCount")?.value),
    plannedStaffCount: toNumberOrNull(document.getElementById("plannedStaffCount")?.value),
    presentStaffCount: toNumberOrNull(document.getElementById("presentStaffCount")?.value),
    absentStaffCount: toNumberOrNull(document.getElementById("absentStaffCount")?.value),
    todaySales: toNumberOrNull(todaySalesInput?.value),
    totalTransactions: toNumberOrNull(totalTransactionsInput?.value),
    footfall: toNumberOrNull(footfallInput?.value),
    totalUnitsSold: toNumberOrNull(totalUnitsSoldInput?.value),
    salesStatus: document.querySelector('input[name="salesStatus"]:checked')?.value || null,
    storeStatus: document.querySelector('input[name="storeStatus"]:checked')?.value || null,
    storeClosedReason: storeClosedReasonInput?.value.trim() || null,
    reasonsForIncrease: getCheckedValues("reasonsForIncrease"),
    reasonsForDecrease: getCheckedValues("reasonsForDecrease"),
    actionTakenByStoreTeam: getCheckedValues("actionTakenByStoreTeam"),
    mallMarketIssues: getCheckedValues("mallMarketIssues"),
    projectIssues: getCheckedValues("projectIssues"),
    vmIssues: getCheckedValues("vmIssues"),
    productIssues: getCheckedValues("productIssues"),
    merchandiseIssues: getCheckedValues("merchandiseIssues"),
    otherDepartmentIssues: getCheckedValues("otherDepartmentIssues"),
    outOfStockProducts: getCheckedValues("outOfStockProducts"),
    salesImprovementSuggestions: getCheckedValues("salesImprovementSuggestions"),
    remark: remarkInput?.value.trim() || null
  };
}

if (dsrSubmitBtn) {
  dsrSubmitBtn.addEventListener("click", async () => {
    const payload = buildDsrFormPayload();

    if (!payload.storeCode) {
      setDsrSubmitMessage("Please enter the store code before submitting.", true);
      return;
    }
    if (!payload.visitDate || payload.todaySales === null || payload.totalTransactions === null || payload.footfall === null || payload.totalUnitsSold === null) {
      setDsrSubmitMessage("Please fill in date, sales, transactions, footfall, and units sold before submitting.", true);
      return;
    }

    dsrSubmitBtn.disabled = true;
    setDsrSubmitMessage("Submitting...", false);

    try {
      const response = await fetch(`${API_BASE_URL}/api/dsr-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || `Submit failed (${response.status})`);
      }

      setDsrSubmitMessage("DSR submitted successfully.", false);
    } catch (error) {
      console.error("DSR submit failed:", error);
      setDsrSubmitMessage("Failed to submit DSR. Please try again.", true);
    } finally {
      dsrSubmitBtn.disabled = false;
    }
  });
}

function getVerifiedSite() {
  try {
    const raw = localStorage.getItem("verifiedSite");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Unable to read verified site:", error);
    return null;
  }
}

const dsrReportUnverifiedMessage = document.getElementById("dsrReportUnverifiedMessage");
const dsrReportContent = document.getElementById("dsrReportContent");

function renderReportVerificationState(site) {
  const verified = !!site;

  dsrReportUnverifiedMessage?.classList.toggle("hidden", verified);
  dsrReportContent?.classList.toggle("hidden", !verified);

  return verified;
}

const dsrReportTableBody = document.getElementById("dsrReportTableBody");
const dsrReportEmptyMessage = document.getElementById("dsrReportEmptyMessage");

const reportFilterModeToggle = document.getElementById("reportFilterModeToggle");
const reportFilterBody = document.getElementById("reportFilterBody");
const reportFilterClearBtn = document.getElementById("reportFilterClearBtn");

let reportFilterOpen = false;
let reportRangeType = "date";
let reportDateRange = { from: null, to: null };

function pad2(n) {
  return String(n).padStart(2, "0");
}

function lastDayOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function renderReportRangeInputs() {
  const wrap = document.getElementById("reportRangeInputs");
  if (!wrap) return;

  if (reportRangeType === "month") {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}`;
    wrap.innerHTML = `
      <input type="month" class="filter-range-input" id="reportFromMonth" value="${currentMonth}">
      <span class="filter-range-sep">to</span>
      <input type="month" class="filter-range-input" id="reportToMonth" value="${currentMonth}">
    `;
    const fromInput = document.getElementById("reportFromMonth");
    const toInput = document.getElementById("reportToMonth");
    const trigger = () => {
      if (!fromInput.value || !toInput.value) return;
      const [fy, fm] = fromInput.value.split("-").map(Number);
      const [ty, tm] = toInput.value.split("-").map(Number);
      const [sy, sm, ey, em] = (fy * 12 + fm) <= (ty * 12 + tm) ? [fy, fm, ty, tm] : [ty, tm, fy, fm];
      reportDateRange = { from: `${sy}-${pad2(sm)}-01`, to: `${ey}-${pad2(em)}-${pad2(lastDayOfMonth(ey, em))}` };
      loadDsrReport();
    };
    fromInput.addEventListener("change", trigger);
    toInput.addEventListener("change", trigger);
    trigger();
  } else if (reportRangeType === "year") {
    const thisYear = new Date().getFullYear();
    wrap.innerHTML = `
      <input type="number" class="filter-range-input" id="reportFromYear" value="${thisYear}" min="2000" max="2100">
      <span class="filter-range-sep">to</span>
      <input type="number" class="filter-range-input" id="reportToYear" value="${thisYear}" min="2000" max="2100">
    `;
    const fromInput = document.getElementById("reportFromYear");
    const toInput = document.getElementById("reportToYear");
    const trigger = () => {
      const from = Number(fromInput.value);
      const to = Number(toInput.value);
      if (!from || !to) return;
      const [lo, hi] = from <= to ? [from, to] : [to, from];
      reportDateRange = { from: `${lo}-01-01`, to: `${hi}-12-31` };
      loadDsrReport();
    };
    fromInput.addEventListener("change", trigger);
    toInput.addEventListener("change", trigger);
    trigger();
  } else {
    const today = new Date();
    const monthStart = `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-01`;
    const monthEnd = `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(lastDayOfMonth(today.getFullYear(), today.getMonth() + 1))}`;
    wrap.innerHTML = `
      <input type="date" class="filter-range-input" id="reportFromDate" value="${monthStart}">
      <span class="filter-range-sep">to</span>
      <input type="date" class="filter-range-input" id="reportToDate" value="${monthEnd}">
    `;
    const fromInput = document.getElementById("reportFromDate");
    const toInput = document.getElementById("reportToDate");
    const trigger = () => {
      if (!fromInput.value || !toInput.value) return;
      const [from, to] = fromInput.value <= toInput.value ? [fromInput.value, toInput.value] : [toInput.value, fromInput.value];
      reportDateRange = { from, to };
      loadDsrReport();
    };
    fromInput.addEventListener("change", trigger);
    toInput.addEventListener("change", trigger);
    trigger();
  }
}

function renderReportFilterBody() {
  if (!reportFilterOpen) {
    reportFilterBody.innerHTML = "";
    reportDateRange = { from: null, to: null };
    reportFilterClearBtn.hidden = true;
    loadDsrReport();
    return;
  }

  reportFilterBody.innerHTML = `
    <div class="pill-toggle" id="reportRangeTypeToggle">
      <span class="pill-toggle-indicator"></span>
      <button type="button" class="pill-toggle-btn" data-range-type="date">By Date</button>
      <button type="button" class="pill-toggle-btn" data-range-type="month">By Month</button>
      <button type="button" class="pill-toggle-btn" data-range-type="year">By Year</button>
    </div>
    <div class="filter-range-inputs" id="reportRangeInputs"></div>
  `;

  const toggle = document.getElementById("reportRangeTypeToggle");
  const buttons = [...toggle.querySelectorAll(".pill-toggle-btn")];
  const indicator = toggle.querySelector(".pill-toggle-indicator");

  function setActiveRangeType(type) {
    reportRangeType = type;
    buttons.forEach((b) => b.classList.toggle("active", b.dataset.rangeType === type));
    const index = buttons.findIndex((b) => b.dataset.rangeType === type);
    if (indicator && index >= 0) {
      indicator.style.transform = `translateX(${index * 100}%)`;
    }
    renderReportRangeInputs();
  }

  buttons.forEach((btn) => btn.addEventListener("click", () => setActiveRangeType(btn.dataset.rangeType)));
  setActiveRangeType(reportRangeType);

  reportFilterClearBtn.hidden = false;
}

if (reportFilterModeToggle) {
  reportFilterModeToggle.querySelectorAll(".filter-mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      reportFilterOpen = !reportFilterOpen;
      btn.classList.toggle("active", reportFilterOpen);
      renderReportFilterBody();
    });
  });
}

if (reportFilterClearBtn) {
  reportFilterClearBtn.addEventListener("click", () => {
    reportFilterOpen = false;
    reportFilterModeToggle?.querySelector(".filter-mode-btn")?.classList.remove("active");
    renderReportFilterBody();
  });
}

const calendarGrid = document.getElementById("calendarGrid");
const calendarMonthLabel = document.getElementById("calendarMonthLabel");
const calendarPrevBtn = document.getElementById("calendarPrevBtn");
const calendarNextBtn = document.getElementById("calendarNextBtn");
const calendarCountSubmitted = document.getElementById("calendarCountSubmitted");
const calendarCountMissed = document.getElementById("calendarCountMissed");
const calendarCountClosed = document.getElementById("calendarCountClosed");

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const calendarToday = new Date();
let calendarYear = calendarToday.getFullYear();
let calendarMonth = calendarToday.getMonth();

function salesStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "above target") return "sales-good";
  if (s === "on target") return "sales-neutral";
  if (s === "below target") return "sales-warning";
  if (s === "very poor") return "sales-critical";
  return "";
}

function buildDayTooltip(status, salesEntries) {
  if (salesEntries && salesEntries.length) {
    return salesEntries.map((entry) => {
      const parts = [entry.storeCode || "Store"];
      if (entry.salesStatus) parts.push(entry.salesStatus);
      if (entry.todaySale !== null && entry.todaySale !== undefined) parts.push(`₹${formatReportNumber(entry.todaySale)}`);
      return parts.join(" — ");
    }).join("\n");
  }
  if (status === "missed") return "Not submitted";
  if (status === "closed") return "Store closed";
  return "";
}

async function loadCalendar() {
  if (!calendarGrid) return;

  const verifiedSite = getVerifiedSite();
  if (!verifiedSite) {
    calendarGrid.innerHTML = "";
    return;
  }

  calendarMonthLabel.textContent = `${MONTH_NAMES[calendarMonth]} ${calendarYear}`;

  let rows = [];
  try {
    const response = await fetch(`${API_BASE_URL}/api/dsr-form`);
    if (response.ok) rows = await response.json();
    rows = rows.filter((row) => row.storeCode === verifiedSite.siteCode);
  } catch (error) {
    console.error("Failed to load calendar data:", error);
  }

  const statusByDate = new Map();
  const salesInfoByDate = new Map();
  rows.forEach((row) => {
    if (!row.visitDate) return;
    const isClosed = (row.storeStatus || "").toLowerCase() === "closed";
    if (isClosed) {
      statusByDate.set(row.visitDate, "closed");
    } else if (statusByDate.get(row.visitDate) !== "closed") {
      statusByDate.set(row.visitDate, "submitted");
    }

    if (!salesInfoByDate.has(row.visitDate)) {
      salesInfoByDate.set(row.visitDate, []);
    }
    salesInfoByDate.get(row.visitDate).push({
      storeCode: row.storeCode,
      salesStatus: row.salesStatus,
      todaySale: row.todaySale
    });
  });

  const firstWeekday = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const todayIso = `${calendarToday.getFullYear()}-${pad2(calendarToday.getMonth() + 1)}-${pad2(calendarToday.getDate())}`;

  let submittedCount = 0;
  let missedCount = 0;
  let closedCount = 0;

  calendarGrid.innerHTML = "";

  for (let i = 0; i < firstWeekday; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day is-empty";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${calendarYear}-${pad2(calendarMonth + 1)}-${pad2(day)}`;
    const isFuture = iso > todayIso;
    let status = statusByDate.get(iso);

    if (!status && !isFuture) {
      status = "missed";
    }

    if (status === "submitted") submittedCount++;
    else if (status === "closed") closedCount++;
    else if (status === "missed") missedCount++;

    const cell = document.createElement("div");
    cell.className = "calendar-day" + (isFuture ? " is-future" : "");

    const salesEntries = salesInfoByDate.get(iso);
    const salesClass = salesStatusClass(salesEntries?.[0]?.salesStatus);
    if (salesClass) cell.classList.add(salesClass);

    const tooltip = buildDayTooltip(status, salesEntries);
    if (tooltip) cell.title = tooltip;

    const dayNum = document.createElement("span");
    dayNum.textContent = String(day);
    cell.appendChild(dayNum);

    if (status) {
      const dot = document.createElement("span");
      dot.className = `calendar-day-dot status-${status}`;
      cell.appendChild(dot);
    }

    calendarGrid.appendChild(cell);
  }

  calendarCountSubmitted.textContent = String(submittedCount);
  calendarCountMissed.textContent = String(missedCount);
  calendarCountClosed.textContent = String(closedCount);
}

if (calendarPrevBtn) {
  calendarPrevBtn.addEventListener("click", () => {
    calendarMonth -= 1;
    if (calendarMonth < 0) {
      calendarMonth = 11;
      calendarYear -= 1;
    }
    loadCalendar();
  });
}

if (calendarNextBtn) {
  calendarNextBtn.addEventListener("click", () => {
    calendarMonth += 1;
    if (calendarMonth > 11) {
      calendarMonth = 0;
      calendarYear += 1;
    }
    loadCalendar();
  });
}

const FY_MONTH_ORDER = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
const FY_MONTH_NAMES = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

function getFyStartYearForDate(date) {
  return date.getMonth() + 1 >= 4 ? date.getFullYear() : date.getFullYear() - 1;
}

function getCurrentFyStartYear() {
  return getFyStartYearForDate(new Date());
}

function fyLabel(startYear) {
  return `FY ${startYear}-${String(startYear + 1).slice(-2)}`;
}

const salesFyYearFilterBtn = document.getElementById("salesFyYearFilterBtn");
const salesFyYearFilterMenu = document.getElementById("salesFyYearFilterMenu");
const salesFyYearFilterLabel = document.getElementById("salesFyYearFilterLabel");
const salesFyTableBody = document.getElementById("salesFyTableBody");

let salesFySelectedStartYear = getCurrentFyStartYear();

async function loadSalesFyCard() {
  if (!salesFyTableBody) return;

  const verifiedSite = getVerifiedSite();
  if (salesFyYearFilterLabel) salesFyYearFilterLabel.textContent = fyLabel(salesFySelectedStartYear);

  if (!verifiedSite) {
    salesFyTableBody.innerHTML = "";
    return;
  }

  let rows = [];
  let targets = [];
  try {
    const [dsrResponse, targetResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/api/dsr-form`),
      fetch(`${API_BASE_URL}/api/target-master?siteCode=${encodeURIComponent(verifiedSite.siteCode)}`)
    ]);
    if (dsrResponse.ok) rows = await dsrResponse.json();
    if (targetResponse.ok) targets = await targetResponse.json();
    rows = rows.filter((row) => row.storeCode === verifiedSite.siteCode);
  } catch (error) {
    console.error("Failed to load Sales FY data:", error);
  }

  const salesByMonth = new Map();
  const statsByMonth = new Map();

  function getMonthStats(key) {
    if (!statsByMonth.has(key)) {
      statsByMonth.set(key, {
        totalTransactions: 0,
        footfall: 0,
        totalUnitsSold: 0,
        atvSum: 0,
        atvCount: 0,
        uptSum: 0,
        uptCount: 0,
        fcSum: 0,
        fcCount: 0,
        statusCounts: new Map()
      });
    }
    return statsByMonth.get(key);
  }

  rows.forEach((row) => {
    if (!row.visitDate) return;
    const key = row.visitDate.slice(0, 7);
    salesByMonth.set(key, (salesByMonth.get(key) || 0) + (Number(row.todaySale) || 0));

    const stats = getMonthStats(key);
    stats.totalTransactions += Number(row.totalTransaction) || 0;
    stats.footfall += Number(row.footfall) || 0;
    stats.totalUnitsSold += Number(row.totalUnitSold) || 0;

    if (row.atv !== null && row.atv !== undefined) {
      stats.atvSum += Number(row.atv) || 0;
      stats.atvCount += 1;
    }
    if (row.upt !== null && row.upt !== undefined) {
      stats.uptSum += Number(row.upt) || 0;
      stats.uptCount += 1;
    }
    if (row.footfallConversion !== null && row.footfallConversion !== undefined) {
      stats.fcSum += Number(row.footfallConversion) || 0;
      stats.fcCount += 1;
    }
    if (row.salesStatus) {
      stats.statusCounts.set(row.salesStatus, (stats.statusCounts.get(row.salesStatus) || 0) + 1);
    }
  });

  function dominantStatus(stats) {
    let best = null;
    let bestCount = 0;
    stats.statusCounts.forEach((count, status) => {
      if (count > bestCount) {
        best = status;
        bestCount = count;
      }
    });
    return best;
  }

  const targetByMonth = new Map();
  targets.forEach((t) => {
    targetByMonth.set(`${t.targetYear}-${pad2(t.targetMonth)}`, Number(t.targetAmount) || 0);
  });

  salesFyTableBody.innerHTML = "";

  FY_MONTH_ORDER.forEach((month, index) => {
    const year = month >= 4 ? salesFySelectedStartYear : salesFySelectedStartYear + 1;
    const key = `${year}-${pad2(month)}`;
    const sales = salesByMonth.get(key) || 0;
    const lySales = salesByMonth.get(`${year - 1}-${pad2(month)}`) || 0;
    const target = targetByMonth.get(key);
    const achieved = target ? `${((sales / target) * 100).toFixed(1)}%` : "—";

    const stats = statsByMonth.get(key);
    const totalTransactions = stats ? stats.totalTransactions : 0;
    const footfall = stats ? stats.footfall : 0;
    const totalUnitsSold = stats ? stats.totalUnitsSold : 0;
    const avgAtv = stats && stats.atvCount ? stats.atvSum / stats.atvCount : null;
    const avgUpt = stats && stats.uptCount ? stats.uptSum / stats.uptCount : null;
    const avgFc = stats && stats.fcCount ? stats.fcSum / stats.fcCount : null;
    const salesStatus = stats ? dominantStatus(stats) : null;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${FY_MONTH_NAMES[index]} ${String(year).slice(-2)}</td>
      <td>
        <input type="text" inputmode="decimal" class="fy-target-input" data-year="${year}" data-month="${month}"
          value="${target ? target : ""}" placeholder="Set target">
      </td>
      <td>${sales ? `₹${formatReportNumber(sales)}` : "—"}</td>
      <td>${achieved}</td>
      <td>${lySales ? `₹${formatReportNumber(lySales)}` : "—"}</td>
      <td>${totalTransactions || "—"}</td>
      <td>${footfall || "—"}</td>
      <td>${totalUnitsSold || "—"}</td>
      <td>${avgAtv !== null ? `₹${formatReportNumber(avgAtv)}` : "—"}</td>
      <td>${avgUpt !== null ? formatReportNumber(avgUpt) : "—"}</td>
      <td>${avgFc !== null ? `${formatReportNumber(avgFc)}%` : "—"}</td>
      <td>${escapeHtml(salesStatus) || "—"}</td>
    `;
    salesFyTableBody.appendChild(tr);
  });
}

if (salesFyTableBody) {
  salesFyTableBody.addEventListener("input", (event) => {
    const input = event.target.closest(".fy-target-input");
    if (!input) return;
    let value = input.value.replace(/[^0-9.]/g, "");
    const firstDotIndex = value.indexOf(".");
    if (firstDotIndex !== -1) {
      value = value.slice(0, firstDotIndex + 1) + value.slice(firstDotIndex + 1).replace(/\./g, "");
    }
    input.value = value;
  });

  salesFyTableBody.addEventListener("change", async (event) => {
    const input = event.target.closest(".fy-target-input");
    if (!input) return;

    const verifiedSite = getVerifiedSite();
    if (!verifiedSite) return;

    const amount = parseFloat(input.value);
    if (Number.isNaN(amount) || amount < 0) {
      loadSalesFyCard();
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/api/target-master`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteCode: verifiedSite.siteCode,
          targetYear: Number(input.dataset.year),
          targetMonth: Number(input.dataset.month),
          targetAmount: amount
        })
      });
    } catch (error) {
      console.error("Failed to save target:", error);
    }

    loadSalesFyCard();
  });
}

function renderSalesFyYearMenu() {
  if (!salesFyYearFilterMenu) return;
  const currentFy = getCurrentFyStartYear();
  const years = [currentFy, currentFy - 1, currentFy - 2];

  salesFyYearFilterMenu.innerHTML = "";
  years.forEach((y) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = fyLabel(y);
    btn.addEventListener("click", () => {
      salesFySelectedStartYear = y;
      salesFyYearFilterMenu.classList.add("hidden");
      loadSalesFyCard();
    });
    salesFyYearFilterMenu.appendChild(btn);
  });
}

if (salesFyYearFilterBtn) {
  renderSalesFyYearMenu();
  salesFyYearFilterBtn.addEventListener("click", () => {
    salesFyYearFilterMenu?.classList.toggle("hidden");
  });
  document.addEventListener("click", (event) => {
    if (!salesFyYearFilterBtn.contains(event.target) && !salesFyYearFilterMenu?.contains(event.target)) {
      salesFyYearFilterMenu?.classList.add("hidden");
    }
  });
}

function formatReportNumber(value) {
  if (value === null || value === undefined || value === "") return "—";
  return Number(value).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  return div.innerHTML;
}

function renderDsrReportRows(rows) {
  if (!dsrReportTableBody) return;
  dsrReportTableBody.innerHTML = "";

  if (!rows.length) {
    dsrReportEmptyMessage?.classList.remove("hidden");
    return;
  }
  dsrReportEmptyMessage?.classList.add("hidden");

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(row.visitDate) || "—"}</td>
      <td>${escapeHtml(row.storeCode) || "—"}</td>
      <td>${escapeHtml(row.storeName) || "—"}</td>
      <td>${formatReportNumber(row.todaySale)}</td>
      <td>${row.totalTransaction ?? "—"}</td>
      <td>${row.footfall ?? "—"}</td>
      <td>${row.totalUnitSold ?? "—"}</td>
      <td>${formatReportNumber(row.atv)}</td>
      <td>${formatReportNumber(row.upt)}</td>
      <td>${row.footfallConversion ?? "—"}</td>
      <td>${escapeHtml(row.salesStatus) || "—"}</td>
      <td>${escapeHtml(row.storeStatus) || "—"}</td>
      <td>${escapeHtml(row.remark) || "—"}</td>
    `;
    dsrReportTableBody.appendChild(tr);
  });
}

function splitCsvField(value) {
  if (!value) return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function countOccurrences(rows, fields, excludeValues = []) {
  const counts = new Map();
  rows.forEach((row) => {
    fields.forEach((field) => {
      splitCsvField(row[field]).forEach((item) => {
        if (excludeValues.includes(item)) return;
        counts.set(item, (counts.get(item) || 0) + 1);
      });
    });
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function getChartColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const chartInstances = {};

function renderChart(canvasId, config) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof Chart === "undefined") return;

  if (chartInstances[canvasId]) {
    chartInstances[canvasId].destroy();
  }
  chartInstances[canvasId] = new Chart(canvas, config);
}

function baseBarOptions(gridColor, textColor) {
  return {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor } },
      y: { grid: { display: false }, ticks: { color: textColor } }
    }
  };
}

function renderTopReasonBarChart(canvasId, entries, color) {
  const gridColor = getChartColor("--chart-grid");
  const textColor = getChartColor("--color-text-secondary");
  const top = entries.slice(0, 8);

  renderChart(canvasId, {
    type: "bar",
    data: {
      labels: top.map(([label]) => label),
      datasets: [{ data: top.map(([, count]) => count), backgroundColor: color, borderRadius: 4, maxBarThickness: 14 }]
    },
    options: baseBarOptions(gridColor, textColor)
  });
}

let salesTrendRows = [];
let salesTrendChartType = "line";

function getSalesTrendFyStartYear() {
  if (reportFilterOpen && reportDateRange.from) {
    return getFyStartYearForDate(new Date(reportDateRange.from));
  }
  return getCurrentFyStartYear();
}

function updateSalesTrendModeBadge() {
  const badge = document.getElementById("salesTrendModeBadge");
  if (!badge) return;
  badge.textContent = fyLabel(getSalesTrendFyStartYear());
}

function renderSalesTrendChart(rows) {
  salesTrendRows = rows;
  updateSalesTrendModeBadge();

  const gridColor = getChartColor("--chart-grid");
  const textColor = getChartColor("--color-text-secondary");
  const seriesColor = getChartColor("--chart-series-1");
  const isBar = salesTrendChartType === "bar";

  const startYear = getSalesTrendFyStartYear();
  const totalsByMonth = new Map();
  rows.forEach((row) => {
    if (!row.visitDate) return;
    const key = row.visitDate.slice(0, 7);
    totalsByMonth.set(key, (totalsByMonth.get(key) || 0) + (Number(row.todaySale) || 0));
  });

  const labels = [];
  const values = [];
  FY_MONTH_ORDER.forEach((month, index) => {
    const year = month >= 4 ? startYear : startYear + 1;
    labels.push(`${FY_MONTH_NAMES[index]} ${String(year).slice(-2)}`);
    values.push(totalsByMonth.get(`${year}-${pad2(month)}`) || 0);
  });

  renderChart("salesTrendChart", {
    type: salesTrendChartType,
    data: {
      labels,
      datasets: [{
        data: values,
        borderColor: seriesColor,
        backgroundColor: seriesColor,
        pointRadius: isBar ? 0 : 4,
        pointHoverRadius: isBar ? 0 : 6,
        borderWidth: isBar ? 0 : 2,
        borderRadius: isBar ? 4 : 0,
        tension: 0.25,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor } },
        y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor } }
      }
    }
  });
}

document.getElementById("salesTrendChartTypeToggle")?.querySelectorAll(".daily-trend-chart-type-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.chartType === salesTrendChartType) return;
    salesTrendChartType = btn.dataset.chartType;
    btn.parentElement.querySelectorAll(".daily-trend-chart-type-btn").forEach((b) => b.classList.toggle("active", b === btn));
    renderSalesTrendChart(salesTrendRows);
  });
});

let issuesRows = [];
let issueCategoryKey = "driMmr";

function renderIssuesChart() {
  renderTopReasonBarChart(
    "issuesChart",
    countOccurrences(issuesRows, [issueCategoryKey], ["No Issue"]),
    getChartColor("--chart-status-serious")
  );
}

document.getElementById("issueCategoryToggle")?.querySelectorAll(".issue-category-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.category === issueCategoryKey) return;
    issueCategoryKey = btn.dataset.category;
    btn.parentElement.querySelectorAll(".issue-category-btn").forEach((b) => b.classList.toggle("active", b === btn));
    renderIssuesChart();
  });
});

function renderReportAnalytics(rows) {
  if (typeof Chart === "undefined") return;

  renderSalesTrendChart(rows);
  renderTopReasonBarChart("reasonsIncreaseChart", countOccurrences(rows, ["rcIc"]), getChartColor("--chart-status-good"));
  renderTopReasonBarChart("reasonsDecreaseChart", countOccurrences(rows, ["rcDc"]), getChartColor("--chart-status-critical"));
  renderTopReasonBarChart("actionTakenChart", countOccurrences(rows, ["atbs"]), getChartColor("--chart-series-1"));
  issuesRows = rows;
  renderIssuesChart();
  renderTopReasonBarChart("oosChart", countOccurrences(rows, ["tpvc"]), getChartColor("--chart-status-warning"));
  renderTopReasonBarChart("salesImprovementChart", countOccurrences(rows, ["sis"]), getChartColor("--chart-status-good"));
}

async function loadDsrReport() {
  if (!dsrReportTableBody) return;

  const verifiedSite = getVerifiedSite();
  if (!renderReportVerificationState(verifiedSite)) {
    renderDsrReportRows([]);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/dsr-form`);
    if (!response.ok) throw new Error(`Failed to load report (${response.status})`);
    let rows = await response.json();

    rows = rows.filter((row) => row.storeCode === verifiedSite.siteCode);

    if (reportDateRange.from) {
      rows = rows.filter((row) => row.visitDate && row.visitDate >= reportDateRange.from);
    }
    if (reportDateRange.to) {
      rows = rows.filter((row) => row.visitDate && row.visitDate <= reportDateRange.to);
    }

    rows.sort((a, b) => (b.visitDate || "").localeCompare(a.visitDate || "") || (b.transactionalId || 0) - (a.transactionalId || 0));
    renderDsrReportRows(rows);
    renderReportAnalytics(rows);
  } catch (error) {
    console.error("Failed to load DSR report:", error);
    renderDsrReportRows([]);
  }
}

document.querySelectorAll('[data-page="dsr-report"]').forEach((link) => {
  link.addEventListener("click", loadDsrReport);
  link.addEventListener("click", loadCalendar);
  link.addEventListener("click", loadSalesFyCard);
});

sidebarCollapseToggle.addEventListener("click", () => {
  const collapsed = sidebar.classList.toggle("collapsed");
  sidebarCollapseIcon.classList.toggle("bi-chevron-left", !collapsed);
  sidebarCollapseIcon.classList.toggle("bi-chevron-right", collapsed);
  sidebarCollapseToggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
  sidebarCollapseToggle.setAttribute("title", collapsed ? "Expand sidebar" : "Collapse sidebar");
});
