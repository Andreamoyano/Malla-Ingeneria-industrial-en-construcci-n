const prereqs = {
  "MAT1610": ["MAT1000"],
  "MAT1620": ["MAT1610"]
};

document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  courses.forEach(course => {
    const code = course.dataset.code;
    if (!prereqs[code]) {
      course.classList.add("unlocked");
    } else {
      course.classList.add("locked");
    }

    course.addEventListener("click", () => {
      if (course.classList.contains("unlocked") && !course.classList.contains("approved")) {
        course.classList.add("approved");
        updateUnlocks();
      }
    });
  });
});

function updateUnlocks() {
  Object.keys(prereqs).forEach(code => {
    const course = document.querySelector(`.course[data-code="${code}"]`);
    if (!course || course.classList.contains("approved")) return;

    const requirements = prereqs[code];
    const fulfilled = requirements.every(req =>
      document.querySelector(`.course[data-code="${req}"]`)?.classList.contains("approved")
    );

    if (fulfilled) {
      course.classList.remove("locked");
      course.classList.add("unlocked");
    }
  });
}
