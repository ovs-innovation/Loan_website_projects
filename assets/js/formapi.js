 
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
 

  if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const mobile = this.mobile.value.trim();
      const message = this.message.value.trim();
      const loanPreferenceField = this.querySelector('[name="loan-preference"]');
      const loanPreference = loanPreferenceField
        ? loanPreferenceField.value.trim()
        : "";

      if (!name || !email || !mobile || !message) {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill all details before submitting.",
        });
        return;
      }

      const formData = { name, email, mobile, message };
      if (loanPreference) {
        formData.loanPreference = loanPreference;
      }
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
    const response = await fetch("https://api.nekipay.com/api/contact-us", {
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
    const response = await fetch("https://loan-website-projects.onrender.com/api/feedback", {
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


  
 
 
document.addEventListener('DOMContentLoaded', function() {
    // 1. Get the form and modal elements using their IDs
    const loanForm = document.getElementById('loanFormSingle');
    const modalElement = document.getElementById('loanModal');
    
    // Check if the form exists before adding the submit listener
    if (!loanForm) return;

    loanForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Ensure form validation passes before proceeding
        if (!loanForm.checkValidity()) {
            e.stopPropagation();
            loanForm.classList.add('was-validated');
            return;
        }

        // --- 2. Collect Data using unique IDs ---
        // We must use specific IDs to differentiate between the two number inputs.
        const phone = document.getElementById('phoneInput')?.value || "";
        const email = document.getElementById('emailInput')?.value || "";
        const name = document.getElementById('nameInput')?.value || "";
        const loanType = document.getElementById('loanTypeSelect')?.value || "";
        const applicantType = document.getElementById('applicantTypeSelect')?.value || "";
        const loanAmount = document.getElementById('loanAmountInput')?.value || "";

        const payload = {
            phone,
            email,
            name,
            loanType,
            applicantType,
            loanAmount,
        };

       // console.log("Submitting payload:", payload);
        
        // --- 3. API Call Logic (using your provided structure) ---
        try {
            // Show loader using SweetAlert (Swal must be loaded on the page)
            Swal.fire({
                title: "Sending...",
                text: "Please wait while we submit your application.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const res = await fetch(
                "https://api.nekipay.com/api/loan/apply-loan",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            
            // Close the loader before showing success/failure message
            Swal.close(); 
            
            if (res.ok) {
                // Success
                loanForm.reset();
                loanForm.classList.remove('was-validated'); 
                
                // Close the Bootstrap modal if open
                if (typeof bootstrap !== 'undefined' && modalElement) {
                    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
                    modalInstance.hide();
                }

                Swal.fire({
                    title: "Application Submitted!",
                    text: "Thank you for applying. We will get back to you soon.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                }).then(() => {
                     // Reload the page only after user clicks OK on success
                     window.location.reload(); 
                });
            } else {
                // API returned an error (e.g., 400, 500)
                Swal.fire({
                    title: "Submission Failed",
                    text: "There was an error submitting your application. Please check your data and try again later.",
                    icon: "error",
                    confirmButtonColor: "#d33",
                });
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            // Close any open loader
            Swal.close(); 
            
            // Network/Connection Error
            Swal.fire({
                title: "Network Error",
                text: "Something went wrong. Please check your connection and try again.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    });

    // Reset validation when modal is closed
    if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', function () {
            loanForm.classList.remove('was-validated');
            loanForm.reset();
        });
    }
});
 