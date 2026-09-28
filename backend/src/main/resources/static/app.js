const navLinks = document.querySelectorAll(".nav-link, .view-toggle-option");
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

sidebarCollapseToggle.addEventListener("click", () => {
  const collapsed = sidebar.classList.toggle("collapsed");
  sidebarCollapseIcon.classList.toggle("bi-chevron-left", !collapsed);
  sidebarCollapseIcon.classList.toggle("bi-chevron-right", collapsed);
  sidebarCollapseToggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
  sidebarCollapseToggle.setAttribute("title", collapsed ? "Expand sidebar" : "Collapse sidebar");
});
