// Requisitos de cada ramo (prerrequisitos)
const prereqs = {
  "MAT1610": ["MAT1000"],
  "MAT1620": ["MAT1610"],
  "FIS1514": ["MAT1610"],
  "QIM100A": ["QIM100"],
  "MAT1630": ["MAT1620"],
  "MAT1640": ["MAT1203", "MAT1620"],
  "ICS1113": ["MAT1203", "MAT1620", "IIC1103"],
  "EYP1113": ["MAT1630"],
  "FIS1533": ["MAT1630"],
  "ICS2523": ["EAE105A", "ICS1113"],
  "ICS2121": ["MAT1630", "ICS1113"],
  "ICS2563": ["EYP1113"],
  "ICS2123": ["ICS1113", "EYP1113"],
  "ICC2105": ["QIM100A", "FIS1514"],
  "ICC2204": ["EYP1113"],
  "ICS2122": ["ICS2121", "ICS2123", "ICS2563"]
};

function updateCredits() {
  const approved = document.querySelectorAll('.course.approved');
  let total = 0;
  approved.forEach(c => {
    total += parseInt(c.dataset.credits || 0);
  });
  document.getElementById("creditos").innerText = `Créditos aprobados: ${total}`;
}

function updateUnlocks() {
  const allCourses = document.querySelectorAll(".course");
  allCourses.forEach(course => {
    const code = course.dataset.code;
    const required = prereqs[code] || [];
    const passed = required.every(req =>
      document.querySelector(`.course[data-code="${req}"]`)?.classList.contains("approved")
    );

    if (required.length === 0 || passed) {
      course.classList.add("unlocked");
      course.classList.remove("locked");
    } else {
      course.classList.remove("unlocked");
      course.classList.add("locked");
    }
  });
}

document.querySelectorAll(".course").forEach(course => {
  course.addEventListener("click", () => {
    if (!course.classList.contains("unlocked")) return;

    course.classList.toggle("approved");  // ← permite apretar y desapretar
    updateUnlocks();
    updateCredits();
  });
});

updateUnlocks();
updateCredits();


