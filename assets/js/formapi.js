 
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
 

  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const mobile = this.mobile.value.trim();
      const message = this.message.value.trim();

      if (!name || !email || !mobile || !message) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill all details before submitting.",
        });
        return;
      }

      const formData = { name, email, mobile, message };
      await sendContactMessage(formData);
      this.reset();
    });
  }

});



// Include SweetAlert2 (if not already added in HTML)
if (typeof Swal === "undefined") {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
  document.head.appendChild(script);
}

export async function sendContactMessage(formData) {
  try {
    // Show loader
    Swal.fire({
      title: "Sending...",
      text: "Please wait while we send your mail.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Call your backend API
    const response = await fetch("/api/contact-us", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    Swal.close(); // Hide loader

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        text: "Your response has been recorded",
        timer: 2500,
        showConfirmButton: false,
      });
      return { success: true };
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message || "Something went wrong",
      });
      return { success: false };
    }
  } catch (error) {
    Swal.close();
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Unable to send message. Please check your internet",
    });
    return { success: false, error };
  }
}

export async function sendFeedbackMessage(formData) {
  try {
    // Show loader
    Swal.fire({
      title: "Sending...",
      text: "Please wait while we send your feedback.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Call your backend API
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    Swal.close(); // Hide loader

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your feedback has been submitted successfully",
        timer: 2500,
        showConfirmButton: false,
      });
      return { success: true };
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message || "Something went wrong",
      });
      return { success: false };
    }
  } catch (error) {
    Swal.close();
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Network Error",
      text: "Unable to send feedback. Please check your internet",
    });
    return { success: false, error };
  }
}



 
  const steps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  let currentStep = 0;

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep++;
      if (currentStep < steps.length) {
        steps[currentStep].classList.add("active");
      }
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      steps[currentStep].classList.remove("active");
      currentStep--;
      steps[currentStep].classList.add("active");
    });
  });

  document
    .getElementById("loanForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("🎉 Form submitted successfully!");
    });