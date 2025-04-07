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

// Home - button to enter portal - change of pic:

document.addEventListener("DOMContentLoaded", function () {
  const welcomeImage = document.getElementById("image_welcome");
  const carousel = document.getElementById("carousel");
  const welcomeTwoImage = document.getElementById("image_carousel1");
  const toggleButton = document.getElementById("carouselbutton");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  const images = [
    "assets/images/carousel1.png",
    "assets/images/carousel2.png",
    "assets/images/carousel3.png",
  ];
  let currentIndex = 0;

  toggleButton.addEventListener("click", function () {
    welcomeImage.classList.toggle("hidden");
    carousel.classList.toggle("hidden");
  });

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    welcomeTwoImage.src = images[currentIndex];
  });

  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    welcomeTwoImage.src = images[currentIndex];
  });
});

// Home - change #carouselbutton #next #prev on hover:

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    "#carouselbutton, #prev, #next, #bookingbutton1, #sendbutton"
  );

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      if (this.id === "next") {
        this.style.transform = "translateX(5px)";
      } else if (this.id === "prev") {
        this.style.transform = "translateX(-5px)";
      } else {
        this.style.transform = "scale(1.1)";
      }
      this.style.backgroundColor = "#D4A017";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0) scale(1)";
      this.style.backgroundColor = "#C29722";
    });
  });
});

// Astrology - feed table via csv file:

document.addEventListener("DOMContentLoaded", function () {
  loadCSV(".assets/js/transits2025.csv");
});

function loadCSV(file) {
  fetch(file)
    .then((response) => response.text())
    .then((text) => {
      let rows = text.split("\n").map((row) => row.split(","));
      createTable(rows);
    })
    .catch((error) => console.error("Error loading CSV:", error));
}

function createTable(data) {
  let table = document.getElementById("transittable");
  let thead = table.querySelector("thead");
  let tbody = table.querySelector("tbody");

  thead.innerHTML = "";
  tbody.innerHTML = "";

  let headerRow = document.createElement("tr");
  data[0].forEach((col, index) => {
    let th = document.createElement("th");
    th.textContent = col;
    th.onclick = () => sortTable(index);
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  data.slice(1).forEach((rowData) => {
    let row = document.createElement("tr");
    rowData.forEach((cellData) => {
      let cell = document.createElement("td");
      cell.textContent = cellData;
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}

function sortTable(columnIndex) {
  let table = document.getElementById("transittable");
  let tbody = table.querySelector("tbody");
  let rows = Array.from(tbody.querySelectorAll("tr"));

  let sortedRows = rows.sort((rowA, rowB) => {
    let cellA = rowA.cells[columnIndex].textContent.trim();
    let cellB = rowB.cells[columnIndex].textContent.trim();
    return cellA.localeCompare(cellB, undefined, { numeric: true });
  });

  tbody.innerHTML = "";
  sortedRows.forEach((row) => tbody.appendChild(row));
}

function filterTable() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let rows = document
    .getElementById("transittable")
    .querySelectorAll("tbody tr");

  rows.forEach((row) => {
    let rowText = row.textContent.toLowerCase();
    row.style.display = rowText.includes(input) ? "" : "none";
  });
}

// Media - feed grip with random pics from folder:

document.addEventListener("DOMContentLoaded", function () {
  const imageFolder = "./assets/images/grid/";

  const imageList = [
    "grid1.jpg",
    "grid2.jpg",
    "grid3.jpg",
    "grid4.jpg",
    "grid5.jpg",
    "grid6.jpg",
    "grid7.jpg",
    "grid8.jpg",
    "grid9.jpg",
    "grid10.jpg",
    "grid11.jpg",
    "grid12.jpg",
    "grid13.jpg",
    "grid14.jpg",
    "grid15.jpg",
    "grid16.jpg",
    "grid17.jpg",
    "grid18.jpg",
    "grid19.jpg",
    "grid20.jpg",
  ];

  function getRandomImages(count) {
    const shuffled = [...imageList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const imgElements = document.querySelectorAll(".random-img");
  const randomImages = getRandomImages(imgElements.length);

  imgElements.forEach((img, index) => {
    img.src = imageFolder + randomImages[index];
  });
});

// Contact - Google Map API with frame changes on list click:

let map;
let marker;

const locations = {
  myaddress: { lat: 40.47008, lng: -3.72246 },
  ecocentro: { lat: 40.44309907536504, lng: -3.7048766821824914 },
  almazen: { lat: 40.42296818297007, lng: -3.6797885085424262 },
  orionsbelt: { lat: 40.411239571356596, lng: -3.7005968857769007 },
  haxanshus: { lat: 55.79678590716495, lng: 13.802301328179203 },
};

function initMap() {
  map = new google.maps.Map(document.getElementById("mymap"), {
    center: locations.myaddress,
    zoom: 14,
  });

  marker = new google.maps.Marker({
    position: locations.myaddress,
    map: map,
    title: "Default Location",
  });

  document.querySelectorAll(".mapbutton").forEach((button) => {
    button.addEventListener("click", function () {
      const parentDiv = this.closest(".address");
      const locationId = parentDiv.id;

      if (locations[locationId]) {
        const newLocation = locations[locationId];

        map.setCenter(newLocation);
        map.setZoom(16);

        marker.setPosition(newLocation);
        marker.setTitle(parentDiv.querySelector("h3 a").innerText);
      }
    });
  });
}
