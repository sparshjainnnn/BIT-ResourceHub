// Subject Data
const data = {
  1: {
    1: ["Maths-1", "Physics", "IOT", "POP C", "IEE"],
    2: ["Maths-2", "Chemistry", "IPP", "IEC", "CAED"]
  },
  2: {
    3: ["Maths-3", "DDCO", "OS", "OOPS", "DSA"],
    4: ["Maths-4", "ADA", "MC", "DBMS", "BIO"]
  },
  3: {
    5: ["CN", "TOC", "SEPM", "DWH", "RM"],
    6: ["Coming Soon"]
  },
  4: {
    7: ["Coming Soon"],
    8: ["Coming Soon"]
  }
};

let currentYear, currentSem, currentSubject;

// Update breadcrumb text
function updateBreadcrumb(parts) {
  const bc = document.getElementById("breadcrumb");
  bc.innerHTML = "";
  parts.forEach((part, i) => {
    if (i < parts.length - 1) {
      bc.innerHTML += `<span onclick="breadcrumbNav(${i})">${part}</span> › `;
    } else {
      bc.innerHTML += part;
    }
  });
}

// Navigate from breadcrumb
function breadcrumbNav(level) {
  if (level === 0) {
    goHome();
  } else if (level === 1) {
    openYear(currentYear);
  } else if (level === 2) {
    openSemester(currentSem);
  }
}

function goHome() {
  hideAll();
  document.getElementById("main").classList.remove("hidden");
  updateBreadcrumb(["Home"]);
}

function openYear(year) {
  currentYear = year;
  hideAll();
  document.getElementById("year").classList.remove("hidden");
  updateBreadcrumb(["Home", `Year ${year}`]);

  const semContainer = document.getElementById("semesters");
  semContainer.innerHTML = "";

  Object.keys(data[year]).forEach(sem => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = "Semester " + sem;
    card.onclick = () => openSemester(sem);
    semContainer.appendChild(card);
  });
}

function openSemester(sem) {
  currentSem = sem;
  hideAll();
  document.getElementById("semester").classList.remove("hidden");
  updateBreadcrumb(["Home", `Year ${currentYear}`, `Sem ${sem}`]);

  const subContainer = document.getElementById("subjects");
  subContainer.innerHTML = "";

  data[currentYear][sem].forEach(subject => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = subject;
    card.onclick = () => openSubject(subject);
    subContainer.appendChild(card);
  });
}

function openSubject(subject) {
  currentSubject = subject;
  hideAll();
  document.getElementById("subject").classList.remove("hidden");
  updateBreadcrumb(["Home", `Year ${currentYear}`, `Sem ${currentSem}`, subject]);

  const modContainer = document.getElementById("modules");
  modContainer.innerHTML = `<h2>${subject}</h2>`;

  if (subject === "Coming Soon") {
    modContainer.innerHTML += "<p>Content Coming Soon...</p>";
    return;
  }

  // Sample Google Drive links (replace later)
  const sampleNotesLink = "https://drive.google.com/";
  const samplePyqLink = "https://drive.google.com/";

  for (let i = 1; i <= 5; i++) {
    const module = document.createElement("div");
    module.className = "module";
    module.innerHTML = `
      <strong>Module ${i}</strong><br>
      <button class="notes-btn" onclick="window.open('${sampleNotesLink}', '_blank')">Notes</button>
      <button class="pyq-btn" onclick="window.open('${samplePyqLink}', '_blank')">PYQ</button>
    `;
    modContainer.appendChild(module);
  }
}

function hideAll() {
  document.querySelectorAll("#main, #year, #semester, #subject").forEach(div => {
    div.classList.add("hidden");
  });
}

// Initialize
goHome();
