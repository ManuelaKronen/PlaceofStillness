// Navigation bar - highlighting active tab:

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar a");
  const allLinks = document.querySelectorAll("a");

  let activePage = sessionStorage.getItem("activeNav") || "index.html";

  navLinks.forEach((link) => {
    if (link.getAttribute("href").includes(activePage)) {
      link.classList.add("active");
    }
  });

  allLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (!this.getAttribute("href").includes(".html")) return;

      sessionStorage.setItem("activeNav", this.getAttribute("href"));

      navLinks.forEach((l) => l.classList.remove("active"));

      navLinks.forEach((l) => {
        if (l.getAttribute("href") === this.getAttribute("href")) {
          l.classList.add("active");
        }
      });
    });
  });
});

// Shop - unfold booking area on click:

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("bookingbutton1");
  const cancelButton = document.querySelector(".close-form");
  const form = document.querySelector(".bookingform");

  toggleButton.addEventListener("click", function () {
    const isFormVisible = window.getComputedStyle(form).display !== "none";

    if (!isFormVisible) {
      form.style.display = "block";
      toggleButton.textContent = "Hide form";
    } else {
      form.style.display = "none";
      toggleButton.textContent = "Book now!";
    }
  });

  cancelButton.addEventListener("click", function (event) {
    event.preventDefault();
    form.style.display = "none";
    toggleButton.textContent = "Book now!";
  });
});

// Shop - booking form ajax:

$(document).ready(function () {
  $("#bookingformphp").submit(function (event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "booking.php",
      data: formData,
      dataType: "json",
      success: function (response) {
        alert(response.message);
        if (response.status === "success") {
          $("#bookingformphp")[0].reset();
        }
      },
      error: function () {
        alert("There was an error processing your request.");
      },
    });
  });
});
