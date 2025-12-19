/*********************************
 * AUTH & USER INIT
 *********************************/
const user = JSON.parse(localStorage.getItem("careerSparkUser"));

if (!user) {
    window.location.href = "pages/login.html";
}

if (!user.enrolledCourses) {
    user.enrolledCourses = [];
    saveUser();
}

/*********************************
 * CONSTANTS & DOM
 *********************************/
const LEVELS = ["beginner", "intermediate", "advanced"];
const courseSelect = document.getElementById("courseSelect");
const levelsContainer = document.getElementById("levelsContainer");
const progressBox = document.getElementById("courseProgress");
const progressBar = document.getElementById("progressBar");

/*********************************
 * HELPERS
 *********************************/
function saveUser() {
    localStorage.setItem("careerSparkUser", JSON.stringify(user));
}

function getCourseEntry(course) {
    return user.enrolledCourses.find(c => c.course === course);
}

function enrollCourse(course) {
    let entry = getCourseEntry(course);

    if (!entry) {
        entry = {
            course,
            beginner: { course: false, game: false, quiz: false },
            intermediate: { course: false, game: false, quiz: false },
            advanced: { course: false, game: false, quiz: false },
            practiceCompleted: false,
            certificateIssued: false
        };
        user.enrolledCourses.push(entry);
        saveUser();
    }
    return entry;
}

/*********************************
 * COURSE DROPDOWN
 *********************************/
Object.keys(COURSE_DATA).forEach(course => {
    const opt = document.createElement("option");
    opt.value = course;
    opt.textContent = course;
    courseSelect.appendChild(opt);
});

/*********************************
 * LEVEL LOGIC
 *********************************/
function isLevelCompleted(entry, level) {
    return entry[level].course &&
           entry[level].game &&
           entry[level].quiz;
}

function isLevelUnlocked(entry, level) {
    if (level === "beginner") return true;
    if (!entry) return false;

    if (level === "intermediate")
        return isLevelCompleted(entry, "beginner");

    if (level === "advanced")
        return isLevelCompleted(entry, "intermediate");

    return false;
}

/*********************************
 * COURSE SELECTION
 *********************************/
courseSelect.addEventListener("change", () => {
    levelsContainer.innerHTML = "";
    const course = courseSelect.value;
    if (!course) return;

    const entry = getCourseEntry(course);

    LEVELS.forEach(level => {
        const unlocked = isLevelUnlocked(entry, level);
        const completed = entry && isLevelCompleted(entry, level);

        levelsContainer.innerHTML += `
        <div class="panel panel-default" style="margin-top:20px;opacity:${unlocked ? 1 : 0.5}">
            <div class="panel-heading">
                <strong>${level.toUpperCase()}</strong>
                ${completed ? "✅ Completed" : unlocked ? "" : "🔒 Locked"}
            </div>
            <div class="panel-body text-center">
                <button class="btn btn-primary btn-sm"
                    ${!unlocked || entry?.[level]?.course ? "disabled" : ""}
                    onclick="startCourse('${course}','${level}')">
                    Course
                </button>

                <button class="btn btn-info btn-sm"
                    ${!unlocked || entry?.[level]?.game ? "disabled" : ""}
                    onclick="startGame('${course}','${level}')">
                    Game
                </button>

                <button class="btn btn-success btn-sm"
                    ${!unlocked || entry?.[level]?.quiz ? "disabled" : ""}
                    onclick="startQuiz('${course}','${level}')">
                    Quiz
                </button>
            </div>
        </div>`;
    });

    if (entry) renderExtras(entry);
});

/*********************************
 * ACTIONS (PER PART)
 *********************************/
function startCourse(course, level) {
    // Navigate to the learning page
    const coursePath = course.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `courses/${coursePath}/${level}/learning.html`;
}

function startGame(course, level) {
    // Navigate to the game page
    const coursePath = course.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `courses/${coursePath}/${level}/game.html`;
}

function startQuiz(course, level) {
    // Navigate to the quiz page
    const coursePath = course.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `courses/${coursePath}/${level}/quiz.html`;
}

/*********************************
 * PRACTICE & CERTIFICATE
 *********************************/
function renderExtras(entry) {
    // Show practice sheet after completing beginner level
    if (isLevelCompleted(entry, "beginner")) {
        levelsContainer.innerHTML += `
        <div class="panel panel-warning text-center" style="margin-top:25px;">
            <button class="btn btn-warning btn-lg"
                ${entry.practiceCompleted ? "disabled" : ""}
                onclick="startPractice('${entry.course}')">
                Practice Sheet
            </button>
        </div>`;
    }

    // Show certificate download button after completing beginner level
    if (isLevelCompleted(entry, "beginner")) {
        levelsContainer.innerHTML += `
        <div class="panel panel-success text-center" style="margin-top:20px;">
            <button class="btn btn-success btn-lg"
                onclick="downloadCertificate('${entry.course}')">
                🎓 Download Certificate
            </button>
        </div>`;
    }
}

function startPractice(course) {
    if (course === "Python") {
        // Open Google Colab notebook for Python
        window.open("https://colab.research.google.com/drive/12HjHw-qEbPMhbg5HsZhCbndBjf2UVf56?usp=sharing", "_blank");
        
        // Mark practice as completed
        const entry = getCourseEntry(course);
        entry.practiceCompleted = true;
        saveUser();
        refreshUI(entry);
    } else {
        // For other courses, navigate to practice page
        const coursePath = course.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `courses/${coursePath}/practice.html`;
    }
}

function downloadCertificate(course) {
    // Navigate to certificate page for generation and download
    const coursePath = course.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `courses/${coursePath}/certificate.html`;
}

/*********************************
 * PROGRESS (SYNCED)
 *********************************/
function calculateProgress(entry) {
    let completed = 0;

    LEVELS.forEach(level => {
        if (entry[level].course) completed++;
        if (entry[level].game) completed++;
        if (entry[level].quiz) completed++;
    });

    if (entry.practiceCompleted) completed++;
    if (entry.certificateIssued) completed++;

    return Math.round((completed / 11) * 100);
}

function refreshUI(entry) {
    const percent = calculateProgress(entry);
    progressBox.style.display = "block";
    progressBar.style.width = percent + "%";
    progressBar.textContent = percent + "%";
    courseSelect.dispatchEvent(new Event("change"));
}
// AUTO SELECT COURSE FROM URL
const params = new URLSearchParams(window.location.search);
const courseFromURL = params.get("course");

if (courseFromURL && courseSelect) {
    courseSelect.value = courseFromURL;
    courseSelect.dispatchEvent(new Event("change"));
}

