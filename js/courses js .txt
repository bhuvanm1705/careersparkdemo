document.addEventListener("DOMContentLoaded", () => {

    const user = JSON.parse(localStorage.getItem("careerSparkUser"));
    if (!user) {
        window.location.href = "../pages/login.html";
        return;
    }

    const container = document.getElementById("myCoursesContainer");
    const enrolled = user.enrolledCourses || [];

    container.innerHTML = "";

    if (enrolled.length === 0) {
        container.innerHTML = `
            <div class="col-md-12 text-center">
                <p>No courses enrolled yet.</p>
            </div>`;
        return;
    }

    enrolled.forEach(entry => {
        const progress = calculateProgress(entry);

        container.innerHTML += `
            <div class="col-md-4">
                <div class="course-card">
                    <h4>${entry.course}</h4>

                    <p>${progress}% completed</p>

                    <div class="progress">
                        <div class="progress-bar"
                             style="width:${progress}%">
                        </div>
                    </div>

                    <a href="../course.html?course=${encodeURIComponent(entry.course)}"
                        class="btn btn-primary btn-sm">
                        Continue
                    </a>
                </div>
            </div>
        `;
    });

});

/* =========================
   PROGRESS CALCULATION
   (3 actions per level)
========================= */
function calculateProgress(entry) {
    let completed = 0;

    ["beginner", "intermediate", "advanced"].forEach(level => {
        if (entry[level]?.course) completed++;
        if (entry[level]?.game) completed++;
        if (entry[level]?.quiz) completed++;
    });

    if (entry.practiceCompleted) completed++;
    if (entry.certificateIssued) completed++;

    // Total = 11 steps
    return Math.round((completed / 11) * 100);
}
