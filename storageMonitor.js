// storageMonitor.js
(function () {
  const toggleBtn = document.createElement("div");
  toggleBtn.id = "localStorageToggleBtn";
  toggleBtn.textContent = "localStorage表示";
  Object.assign(toggleBtn.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    background: "#333",
    color: "white",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    zIndex: 9999,
    fontSize: "12px"
  });
  document.body.appendChild(toggleBtn);

  const monitor = document.createElement("div");
  monitor.id = "localStorageMonitor";
  Object.assign(monitor.style, {
    position: "fixed",
    top: "50px",
    right: "10px",
    background: "rgba(0,0,0,0.85)",
    color: "white",
    padding: "10px",
    fontSize: "12px",
    borderRadius: "8px",
    zIndex: 9999,
    maxWidth: "320px",
    display: "none"
  });
  monitor.innerHTML = "<strong>localStorage:</strong><div id='storageContent'></div>";
  document.body.appendChild(monitor);

  function updateLocalStorageDisplay() {
    const keys = Object.keys(localStorage);
    const storageContent = keys.map(key => {
      const value = localStorage.getItem(key);
      return `<div><strong>${key}:</strong> ${value !== null ? value : "<i>null</i>"}</div>`;
    }).join("");
    document.getElementById("storageContent").innerHTML = storageContent;
  }

  updateLocalStorageDisplay();
  setInterval(updateLocalStorageDisplay, 1000);

  toggleBtn.addEventListener("click", () => {
    monitor.style.display = monitor.style.display === "none" ? "block" : "none";
  });
})();
