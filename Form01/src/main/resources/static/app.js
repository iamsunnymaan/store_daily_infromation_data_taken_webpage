const lists = {
  reasonsForDecrease: [
    "Low Walk-ins",
    "OOS of Fast Moving Products",
    "Insufficient Staff",
    "Mall Low Footfall",
    "Competitor Offers",
    "High Discount Expectation",
    "Product Pricing Concern",
    "Tester Not Available",
    "VM Display Weak",
    "AC / Environment Issue",
    "Customer Budget Concern",
    "Poor Conversion",
    "Product Not Available in Required Variant",
    "Billing Delay",
    "Internet / POS Issue",
    "Other"
  ],
  reasonsForIncrease: [
    "High Footfall",
    "Festival Season",
    "Good Offers",
    "Repeat Customers",
    "New Product Launch",
    "Strong Staff Performance",
    "Social Media Campaign",
    "Mall Event",
    "Good Inventory",
    "Better Visual Merchandising",
    "Other"
  ],
  actionTakenByStoreTeam: [
    "Customer Calling Done",
    "WhatsApp Outreach Done",
    "Clienteling Done",
    "Sampling Activity Done",
    "Cross Selling Focused",
    "Add-on Selling Focused",
    "Local Marketing Done",
    "Repeat Customers Contacted",
    "Team Briefing Conducted",
    "Escalation Shared to Concern Team",
    "Other"
  ],
  outOfStockProducts: Array.from({ length: 20 }, (_, index) => `Product ${String(index + 1).padStart(2, "0")}`),
  salesImprovementSuggestions: [
    "More Offers Required",
    "Additional Staff Required",
    "Better Product Availability",
    "Better VM Support",
    "Mall Marketing Support",
    "Local Activity Required",
    "Influencer Activity Required",
    "Product Training Required",
    "Tester Support Required",
    "Faster Replenishment Required",
    "Better Customer Engagement Activity",
    "Other"
  ]
};

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
    key: "projectMaintenanceIssues",
    title: "Project / Maintenance Related",
    options: [
      "No Issue",
      "AC Not Working",
      "Partial Cooling Issue",
      "Flooring Damage",
      "Ceiling Damage",
      "Electrical Issue",
      "Water Leakage",
      "Store Lighting Issue",
      "Signage Damage",
      "Trial Room Issue",
      "Plumbing Issue",
      "Internet / Network Issue",
      "Billing Counter Issue",
      "Store Cleanliness Issue",
      "Other"
    ]
  },
  {
    key: "vmIssues",
    title: "VM Related",
    options: [
      "No Issue",
      "Window Display Missing",
      "Promotional Display Pending",
      "Tester Display Missing",
      "Gondola Display Issue",
      "Branding Material Missing",
      "Store Not Looking Fresh",
      "Product Display Gap",
      "Seasonal Display Pending",
      "Pricing Communication Missing",
      "POP Material Missing",
      "Other"
    ]
  },
  {
    key: "productMerchandiseIssues",
    title: "Product / Merchandise Related",
    options: [
      "No Issue",
      "Fast Moving Products OOS",
      "New Launch Not Available",
      "Tester Not Available",
      "Stock Replenishment Delay",
      "Damaged Product Received",
      "Expiry Concern",
      "Barcode Issue",
      "Pricing Mismatch",
      "Other"
    ]
  }
];

let storeAccess = null;

const elements = {
  form: document.querySelector("#visitForm"),
  visitDate: document.querySelector("#visitDate"),
  visitDay: document.querySelector("#visitDay"),
  accessCode: document.querySelector("#accessCode"),
  site: document.querySelector("#site"),
  storeName: document.querySelector("#storeName"),
  displayStoreName: document.querySelector("#displayStoreName"),
  city: document.querySelector("#city"),
  state: document.querySelector("#state"),
  fetchStore: document.querySelector("#fetchStore"),
  fetchMessage: document.querySelector("#fetchMessage"),
  step1: document.querySelector("#step1"),
  step2: document.querySelector("#step2"),
  submitBtn: document.querySelector("#submitBtn"),
  submitSpinner: document.querySelector("#submitSpinner"),
  todaySales: document.querySelector("#todaySales"),
  targetView: document.querySelector("#targetView"),
  achievementView: document.querySelector("#achievementView"),
  totalTransactions: document.querySelector("#totalTransactions"),
  footfall: document.querySelector("#footfall"),
  footfallConversion: document.querySelector("#footfallConversion"),
  totalUnitsSold: document.querySelector("#totalUnitsSold"),
  atv: document.querySelector("#atv"),
  upt: document.querySelector("#upt"),
  rootCausePanel: document.querySelector("#rootCausePanel"),
  decreaseRoot: document.querySelector("#decreaseRoot"),
  increaseRoot: document.querySelector("#increaseRoot"),
  formMessage: document.querySelector("#formMessage"),
  appShell: document.querySelector("#appShell")
};

function setDefaultDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  
  // Last 2 days
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);
  const minYear = twoDaysAgo.getFullYear();
  const minMonth = String(twoDaysAgo.getMonth() + 1).padStart(2, '0');
  const minDay = String(twoDaysAgo.getDate()).padStart(2, '0');
  const minDateStr = `${minYear}-${minMonth}-${minDay}`;

  elements.visitDate.setAttribute("min", minDateStr);
  elements.visitDate.setAttribute("max", todayStr);
  elements.visitDate.value = todayStr;
  updateVisitDay();
}

function updateVisitDay() {
  if (!elements.visitDate.value) {
    elements.visitDay.value = "";
    return;
  }
  const date = new Date(`${elements.visitDate.value}T00:00:00`);
  elements.visitDay.value = date.toLocaleDateString("en-IN", { weekday: "long" });
}

function renderCheckList(container, name, options) {
  container.innerHTML = options.map((option) => {
    const id = `${name}-${option}`.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    return `
      <label for="${id}">
        <input id="${id}" type="checkbox" name="${name}" value="${option}">
        ${option}
      </label>
    `;
  }).join("");
}

function renderLists() {
  document.querySelectorAll("[data-list]").forEach((container) => {
    const name = container.dataset.list;
    renderCheckList(container, name, lists[name]);
  });
}

function renderAccordion() {
  const accordion = document.querySelector("#departmentAccordion");
  accordion.innerHTML = departmentSections.map((section, index) => `
    <div class="accordion-item ${index === 0 ? "open" : ""}">
      <button class="accordion-button" type="button" data-accordion="${section.key}" aria-expanded="${index === 0}">
        ${section.title}
        <span class="accordion-caret" aria-hidden="true"></span>
      </button>
      <div class="accordion-content">
        <div class="check-list" id="${section.key}List"></div>
      </div>
    </div>
  `).join("");

  departmentSections.forEach((section) => {
    renderCheckList(document.querySelector(`#${section.key}List`), section.key, section.options);
  });

  accordion.addEventListener("click", (event) => {
    const button = event.target.closest("[data-accordion]");
    if (!button) {
      return;
    }
    const item = button.closest(".accordion-item");
    const isOpen = item.classList.contains("open");

    if (!isOpen) {
      // Close all other accordion items
      accordion.querySelectorAll(".accordion-item").forEach((otherItem) => {
        otherItem.classList.remove("open");
        otherItem.querySelector(".accordion-button").setAttribute("aria-expanded", "false");
      });
      // Open this one
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    } else {
      // Toggle off if already open (optional, but issue says "only one section should remain expanded")
      item.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}

function numberValue(selector) {
  const value = document.querySelector(selector).value;
  return value === "" ? 0 : Number(value);
}

function formatMoney(value) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2
  }).format(value);
}

function calculateKpis() {
  console.log("[DEBUG_LOG] calculateKpis called. storeAccess target:", storeAccess?.todayTarget);
  const sales = numberValue("#todaySales");
  const target = storeAccess?.todayTarget ?? 0;
  const transactions = numberValue("#totalTransactions");
  const footfall = numberValue("#footfall");
  const units = numberValue("#totalUnitsSold");
  const achievement = target > 0 ? (sales / target) * 100 : 0;
  const conversion = footfall > 0 ? (transactions / footfall) * 100 : 0;

  elements.achievementView.textContent = `${achievement.toFixed(2)}%`;
  elements.footfallConversion.value = `${conversion.toFixed(2)}%`;
  elements.atv.value = transactions > 0 ? formatMoney(sales / transactions) : "0";
  elements.upt.value = transactions > 0 ? (units / transactions).toFixed(2) : "0";

  if (storeAccess) {
    console.log("[DEBUG_LOG] calculateKpis using target:", storeAccess.todayTarget);
    updateSalesStatus(storeAccess.todayTarget);
  }
}

function updateSalesStatus(target) {
  if (!target || target <= 0) return;
  const sales = numberValue("#todaySales");
  const achievement = (sales / target) * 100;
  
  let status = "";
  if (achievement >= 100) status = "Above Target";
  else if (achievement >= 95) status = "On Target";
  else if (achievement >= 50) status = "Below Target";
  else if (sales > 0) status = "Very Poor";

  if (status) {
    const radio = document.querySelector(`input[name="salesStatus"][value="${status}"]`);
    if (radio) {
      radio.checked = true;
      updateRootCauseVisibility();
    }
  }
}

async function fetchStore() {
  clearMessage("fetch");
  const site = elements.site.value.trim();
  const accessCode = elements.accessCode.value.trim();
  const visitDate = elements.visitDate.value;

  console.log("[DEBUG_LOG] fetchStore called with site:", site, "accessCode:", accessCode, "visitDate:", visitDate);

  if (!site || !accessCode || !visitDate) {
    setMessage("Please fill all fields.", true, "fetch");
    return;
  }

  elements.fetchStore.disabled = true;
  elements.fetchStore.textContent = "Fetching...";

  try {
    const params = new URLSearchParams({ 
      site_store_code: site, 
      accessCode,
      visitDate
    });
    const response = await fetch(`/api/stores/validate?${params}`);
    
    if (response.status === 401 || response.status === 403) {
      setMessage("Invalid Access Code.", true, "fetch");
      return;
    }
    
    if (response.status === 404) {
      setMessage("Store not found.", true, "fetch");
      return;
    }

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = body.message || "An error occurred on the server.";
      setMessage(errorMessage, true, "fetch");
      return;
    }

    storeAccess = body;
    console.log("[DEBUG_LOG] Fetch response body:", body);
    elements.storeName.value = body.stores || "";
    elements.displayStoreName.textContent = body.stores || "Store Visit Report";
    elements.city.value = body.city || "";
    elements.state.value = body.state || "";
    console.log("[DEBUG_LOG] Today Target from API:", body.todayTarget);
    elements.targetView.textContent = formatMoney(Number(body.todayTarget || 0));
    
    // Auto-select sales status based on achievement
    calculateKpis();
    updateSalesStatus(body.todayTarget);

    // Transition to Step 2
    elements.step1.style.display = "none";
    elements.step2.style.display = "block";
    elements.appShell.classList.remove("login-page");
    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (error) {
    setMessage("Connection error. Please try again.", true, "fetch");
    console.error("Fetch error:", error);
  } finally {
    elements.fetchStore.disabled = false;
    elements.fetchStore.textContent = "Fetch";
  }
}

function lockSections() {
  // Reset Step 2 if needed
}

function updateRootCauseVisibility() {
  const status = document.querySelector("input[name='salesStatus']:checked")?.value;
  if (!status) {
    elements.rootCausePanel.hidden = true;
    return;
  }

  const positive = status === "Above Target" || status === "On Target";
  elements.rootCausePanel.hidden = false;
  elements.increaseRoot.hidden = !positive;
  elements.decreaseRoot.hidden = positive;
}

function checkedValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
}

function requestPayload() {
  return {
    visitDate: elements.visitDate.value,
    visitDay: elements.visitDay.value,
    sitestorecode: elements.site.value.trim(),
    accessCode: elements.accessCode.value.trim(),
    storeName: elements.storeName.value.trim(),
    todaySales: numberValue("#todaySales"),
    todayTarget: Number(storeAccess?.todayTarget || 0),
    totalTransactions: numberValue("#totalTransactions"),
    footfall: numberValue("#footfall"),
    totalUnitsSold: numberValue("#totalUnitsSold"),
    salesStatus: document.querySelector("input[name='salesStatus']:checked")?.value || "",
    plannedStaffCount: numberValue("#plannedStaffCount"),
    actualPresentStaffCount: numberValue("#actualPresentStaffCount"),
    reasonsForDecrease: checkedValues("reasonsForDecrease"),
    reasonsForIncrease: checkedValues("reasonsForIncrease"),
    actionTakenByStoreTeam: checkedValues("actionTakenByStoreTeam"),
    mallMarketIssues: checkedValues("mallMarketIssues"),
    projectMaintenanceIssues: checkedValues("projectMaintenanceIssues"),
    vmIssues: checkedValues("vmIssues"),
    productMerchandiseIssues: checkedValues("productMerchandiseIssues"),
    outOfStockProducts: checkedValues("outOfStockProducts"),
    salesImprovementSuggestions: checkedValues("salesImprovementSuggestions"),
    remarks: document.querySelector("#remarks").value.trim()
  };
}

async function submitForm(event) {
  event.preventDefault();
  clearMessage("form");

  if (!storeAccess) {
    setMessage("Validate the store before submitting.", true, "form");
    return;
  }

  // Button behaviour
  elements.submitBtn.disabled = true;
  elements.submitBtn.textContent = "Submitting...";
  elements.submitSpinner.style.display = "block";
  setMessage("Saving data... Please wait.", false, "form");

  try {
    const response = await fetch("/api/visits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload())
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      setMessage("❌ Failed to save data. Please try again.", true, "form");
      return;
    }

    setMessage(`✅ Data Saved Successfully. Transaction ID: ${body.transactionId}`, false, "form");
    elements.form.reset();
    setDefaultDate();
    // Keep page open as requested
  } catch (error) {
    setMessage("❌ Failed to save data. Please try again.", true, "form");
    console.error("Submit error:", error);
  } finally {
    elements.submitBtn.disabled = false;
    elements.submitBtn.textContent = "Submit";
    elements.submitSpinner.style.display = "none";
  }
}

function setMessage(message, error, target = "form") {
  const element = target === "fetch" ? elements.fetchMessage : elements.formMessage;
  element.textContent = message;
  element.className = error ? "error" : "success";
  
  if (target === "fetch") {
    element.style.color = error ? "var(--danger)" : "var(--accent)";
  }
}

function clearMessage(target = "both") {
  if (target === "form" || target === "both") {
    elements.formMessage.textContent = "";
    elements.formMessage.className = "";
  }
  if (target === "fetch" || target === "both") {
    elements.fetchMessage.textContent = "";
    elements.fetchMessage.className = "";
  }
}

renderLists();
renderAccordion();
setDefaultDate();

elements.visitDate.addEventListener("change", () => {
  updateVisitDay();
  if (storeAccess && elements.site.value.trim() && elements.accessCode.value.trim()) {
    fetchStore();
  }
});
elements.fetchStore.addEventListener("click", fetchStore);
elements.todaySales.addEventListener("input", calculateKpis);
elements.totalTransactions.addEventListener("input", calculateKpis);
elements.footfall.addEventListener("input", calculateKpis);
elements.totalUnitsSold.addEventListener("input", calculateKpis);
document.querySelector("#salesStatusGroup").addEventListener("change", updateRootCauseVisibility);
elements.form.addEventListener("submit", submitForm);
