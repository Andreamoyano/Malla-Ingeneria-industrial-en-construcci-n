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
  "ICS2122": ["ICS2121", "ICS2123", "ICS2563"],
  "ICC2304": ["CREDITOS_90"],
  "ICS2613": ["CREDITOS_270"],
  "ICS2813": ["CREDITOS_250"]
};

// Actualiza créditos aprobados
function updateCredits() {
  const approved = document.querySelectorAll('.course.approved');
  let total = 0;
  approved.forEach(c => {
    total += parseInt(c.dataset.credits || 0);
  });
  document.getElementById("creditos").innerText = `Créditos aprobados: ${total}`;
  return total;
}

// Desbloquea cursos si se cumplen requisitos
function updateUnlocks() {
  const allCourses = document.querySelectorAll('.course');
  const approved = Array.from(document.querySelectorAll('.course.approved')).map(c => c.dataset.code);
  const totalCredits = updateCredits();

  allCourses.forEach(course => {
    const code = course.dataset.code;
    const reqs = prereqs[code];

    if (!reqs) {
      course.classList.add('unlocked');
      return;
    }

    const unlocked = reqs.every(r => {
      if (r.startsWith("CREDITOS_")) {
        const reqCredits = parseInt(r.split("_")[1]);
        return totalCredits >= reqCredits;
      }
      return approved.includes(r);
    });

    if (unlocked) {
      course.classList.add('unlocked');
      course.classList.remove('locked');
    } else {
      course.classList.add('locked');
    }
  });
}

// Clic para aprobar cursos
document.querySelectorAll('.course').forEach(course => {
  course.addEventListener('click', () => {
    if (course.classList.contains('unlocked') && !course.classList.contains('approved')) {
      course.classList.add('approved');
      updateUnlocks();
    }
  });
});

// Mostrar créditos aprobados
document.body.insertAdjacentHTML('beforeend', '<p id="creditos">Créditos aprobados: 0</p>');

// Iniciar desbloqueo inicial
updateUnlocks();
