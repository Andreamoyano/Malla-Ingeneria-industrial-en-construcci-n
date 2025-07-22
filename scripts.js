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

// Actualiza créditos aprobados
function updateCredits() {
  const approved = document.querySelectorAll('.course.approved');
  let total = 0;
  approved.forEach(c => {
    total += parseInt(c.dataset.credits || 0);
  });
  document.getElementById("creditos").innerText = `Créditos aprobados: ${total}`;
}

// Verifica si un curso puede desbloquearse (todos sus requisitos están aprobados)
function canUnlock(code) {
  const required = prereqs[code] || [];
  return required.every(req =>
    document.querySelector(`.course[data-code="${req}"]`)?.classList.contains("approved")
  );
}

// Actualiza el estado de todos los cursos (locked, unlocked, approved)
function updateUnlocks() {
  const allCourses = document.querySelectorAll(".course");

  allCourses.forEach(course => {
    const code = course.dataset.code;
    const isApproved = course.classList.contains("approved");

    if (isApproved) {
      course.classList.remove("locked");
      course.classList.add("unlocked");
      return;
    }

    if (canUnlock(code)) {
      course.classList.add("unlocked");
      course.classList.remove("locked");
    } else {
      course.classList.remove("unlocked");
      course.classList.remove("approved");
      course.classList.add("locked");
    }
  });
}

// Habilita clic para alternar aprobación (on/off)
document.querySelectorAll(".course").forEach(course => {
  course.addEventListener("click", () => {
    if (!course.classList.contains("unlocked")) return;

    course.classList.toggle("approved"); // ← alterna estado
    updateUnlocks();
    updateCredits();
  });
});

// Inicializa
updateUnlocks();
updateCredits();


