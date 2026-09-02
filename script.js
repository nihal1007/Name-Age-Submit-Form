const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzimeVpI8xU4Vj5XB79mREIkvAipukzoHnUIKLO_my43_4evrsecbZ2ZK98Odybqv5Q/exec";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("submissionForm");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const submitBtn = document.getElementById("submitBtn");
  const statusMessage = document.getElementById("statusMessage");


  function showStatus(text, type) {

    statusMessage.textContent = text;

    statusMessage.className = `status-message ${type}`;
  }


  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    statusMessage.className = "status-message";

    const name = nameInput.value.trim();
    const age = Number(ageInput.value);


    // Check name
    if (!name) {

      showStatus("Please enter your name.", "error");

      nameInput.focus();

      return;
    }


    // Check age
    if (
      !ageInput.value ||
      isNaN(age) ||
      !Number.isInteger(age) ||
      age < 1 ||
      age > 120
    ) {

      showStatus(
        "Please enter a valid age between 1 and 120.",
        "error"
      );

      ageInput.focus();

      return;
    }


    // Disable button while submitting
    submitBtn.disabled = true;

    submitBtn.textContent = "Submitting...";


    try {

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

      } catch (error) {

        result = {
          status: response.ok ? "success" : "error"
        };

      }


      if (result.status === "success") {

        showStatus(
          "Details submitted successfully!",
          "success"
        );

        form.reset();

      } else {

        showStatus(
          "Submission failed. Please try again.",
          "error"
        );

      }


    } catch (error) {

      console.error("Submission error:", error);

      showStatus(
        "Submission failed. Please check your connection.",
        "error"
      );

    } finally {

      submitBtn.disabled = false;

      submitBtn.textContent = "Submit";

    }

  });

});
