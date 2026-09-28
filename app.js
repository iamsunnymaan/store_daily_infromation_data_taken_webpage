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

sidebarCollapseToggle.addEventListener("click", () => {
  const collapsed = sidebar.classList.toggle("collapsed");
  sidebarCollapseIcon.classList.toggle("bi-chevron-left", !collapsed);
  sidebarCollapseIcon.classList.toggle("bi-chevron-right", collapsed);
  sidebarCollapseToggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
  sidebarCollapseToggle.setAttribute("title", collapsed ? "Expand sidebar" : "Collapse sidebar");
});
