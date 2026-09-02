/**
 * Configuration: Paste your deployed Google Apps Script Web App URL below.
 * Follow the instructions in README.md or Code.gs to obtain this URL.
 */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzimeVpI8xU4Vj5XB79mREIkvAipukzoHnUIKLO_my43_4evrsecbZ2ZK98Odybqv5Q/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("submissionForm");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const submitBtn = document.getElementById("submitBtn");
  const statusMessage = document.getElementById("statusMessage");

  /**
   * Helper to display success or error messages
   * @param {string} text - Message text
   * @param {"success" | "error" | "clear"} type - Status type
   */
  function showStatus(text, type) {
    if (type === "clear") {
      statusMessage.textContent = "";
      statusMessage.className = "status-message";
      return;
    }

    statusMessage.textContent = text;
    statusMessage.className = `status-message ${type}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showStatus("", "clear");

    const name = nameInput.value.trim();
    const ageStr = ageInput.value.trim();
    const age = Number(ageStr);

    // 1. Client-side Validation
    if (!name) {
      showStatus("Please enter your name.", "error");
      nameInput.focus();
      return;
    }

    if (!ageStr || isNaN(age) || !Number.isInteger(age) || age < 1 || age > 120) {
      showStatus("Please enter a valid age between 1 and 120.", "error");
      ageInput.focus();
      return;
    }

    // 2. Configuration Check
    if (SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE" || !SCRIPT_URL.trim()) {
      showStatus("Please configure your Google Apps Script URL in script.js before submitting.", "error");
      return;
    }

    // 3. Submit Data to Google Sheets via Google Apps Script
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      // We use Content-Type: text/plain to ensure standard CORS compliance with Google Apps Script
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          name: name,
          age: age
        })
      });

      let result;
      try {
        result = await response.json();
      } catch (parseErr) {
        // Fallback in case Google returns non-JSON or opaque response
        result = { status: response.ok ? "success" : "error" };
      }

      if (result && result.status === "success") {
        showStatus("Details submitted successfully!", "success");
        form.reset();
      } else {
        const errorMsg = (result && result.message) ? result.message : "Submission failed. Please try again.";
        showStatus(errorMsg, "error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      showStatus("Submission failed. Please check your connection or script URL and try again.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });
});
