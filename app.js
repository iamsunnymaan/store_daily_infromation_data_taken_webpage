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
if (currentDateInput) {
  currentDateInput.value = new Date().toISOString().slice(0, 10);
}

const FIXED_ACCESS_CODE = "DEMO123";
const FIXED_STORE_CODE = "STORE001";

const storeAccessForm = document.getElementById("storeAccessForm");
const storeAccessMessage = document.getElementById("storeAccessMessage");

function setStoreAccessMessage(message, isError) {
  if (!storeAccessMessage) return;
  storeAccessMessage.textContent = message;
  storeAccessMessage.classList.toggle("form-message-error", isError);
  storeAccessMessage.classList.toggle("form-message-success", !isError);
}

if (storeAccessForm) {
  storeAccessForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const accessCode = document.getElementById("accessCode").value.trim();
    const storeCode = document.getElementById("storeCode").value.trim();

    if (accessCode !== FIXED_ACCESS_CODE || storeCode !== FIXED_STORE_CODE) {
      setStoreAccessMessage("Invalid access code or store code.", true);
      return;
    }

    setStoreAccessMessage("Access granted.", false);
    console.log("Store access granted:", { accessCode, storeCode });
    showPage("dsr-report");
  });
}

sidebarCollapseToggle.addEventListener("click", () => {
  const collapsed = sidebar.classList.toggle("collapsed");
  sidebarCollapseIcon.classList.toggle("bi-chevron-left", !collapsed);
  sidebarCollapseIcon.classList.toggle("bi-chevron-right", collapsed);
  sidebarCollapseToggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
  sidebarCollapseToggle.setAttribute("title", collapsed ? "Expand sidebar" : "Collapse sidebar");
});
