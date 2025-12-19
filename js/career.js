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

if (!user.careerProgress) {
    user.careerProgress = {};
    saveUser();
}

/*********************************
 * CONSTANTS & DOM
 *********************************/
const LEVELS = ["beginner", "intermediate", "advanced"];
const careerSelect = document.getElementById("careerSelect");
const coursesContainer = document.getElementById("coursesContainer");
const progressBox = document.getElementById("careerProgress");
const progressBar = document.getElementById("progressBar");
const careerDescription = document.getElementById("careerDescription");
const careerDescText = document.getElementById("careerDescText");

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

function isLevelCompleted(entry, level) {
    if (!entry) return false;
    return entry[level].course &&
           entry[level].game &&
           entry[level].quiz;
}

function isCourseCompleted(course) {
    const entry = getCourseEntry(course);
    if (!entry) return false;
    
    // Course is completed when beginner level is done
    return isLevelCompleted(entry, "beginner");
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
 * CAREER DROPDOWN
 *********************************/
Object.keys(CAREER_DATA).forEach(career => {
    const opt = document.createElement("option");
    opt.value = career;
    opt.textContent = `${CAREER_DATA[career].icon} ${career}`;
    careerSelect.appendChild(opt);
});

/*********************************
 * CAREER SELECTION
 *********************************/
careerSelect.addEventListener("change", () => {
    coursesContainer.innerHTML = "";
    const career = careerSelect.value;
    
    if (!career) {
        careerDescription.style.display = "none";
        progressBox.style.display = "none";
        return;
    }

    const careerInfo = CAREER_DATA[career];
    
    // Show career description
    careerDescription.style.display = "block";
    careerDescText.textContent = careerInfo.description;
    
    // Calculate and show progress
    updateCareerProgress(career);
    
    // Render courses
    renderCareerCourses(career, careerInfo.courses);
});

/*********************************
 * RENDER CAREER COURSES
 *********************************/
function renderCareerCourses(career, courses) {
    coursesContainer.innerHTML = `
        <div class="row">
            <div class="col-md-12">
                <h3 class="text-center">Required Courses for ${career}</h3>
            </div>
        </div>
    `;

    courses.forEach((course, index) => {
        const entry = getCourseEntry(course);
        const completed = isCourseCompleted(course);
        const isFirst = index === 0;
        const prevCompleted = index === 0 || isCourseCompleted(courses[index - 1]);
        const unlocked = isFirst || prevCompleted;

        const courseCard = `
            <div class="row" style="margin-bottom: 20px;">
                <div class="col-md-12">
                    <div class="course-card ${completed ? 'course-completed' : ''} ${!unlocked ? 'course-locked' : ''}">
                        <div class="row">
                            <div class="col-md-8">
                                <h4>
                                    ${completed ? '✅' : unlocked ? '📚' : '🔒'} 
                                    ${course}
                                    ${completed ? ' (Completed)' : !unlocked ? ' (Locked)' : ''}
                                </h4>
                                <p class="text-muted">
                                    ${!unlocked ? 'Complete the previous course to unlock this one' : 
                                      completed ? 'Great job! You\'ve completed this course.' : 
                                      'Ready to start learning'}
                                </p>
                            </div>
                            <div class="col-md-4 text-right">
                                ${unlocked ? `
                                    <button class="btn ${completed ? 'btn-success' : 'btn-primary'}" 
                                            onclick="startCareerCourse('${course}')">
                                        ${completed ? 'Review Course' : 'Start Course'}
                                    </button>
                                ` : `
                                    <button class="btn btn-default" disabled>
                                        Locked
                                    </button>
                                `}
                            </div>
                        </div>
                        
                        ${entry && unlocked ? renderCourseLevels(course, entry) : ''}
                    </div>
                </div>
            </div>
        `;
        
        coursesContainer.innerHTML += courseCard;
    });
}

/*********************************
 * RENDER COURSE LEVELS
 *********************************/
function renderCourseLevels(course, entry) {
    let levelsHTML = '<div class="row" style="margin-top: 15px; border-top: 1px solid #ddd; padding-top: 15px;">';
    
    LEVELS.forEach(level => {
        const unlocked = isLevelUnlocked(entry, level);
        const completed = isLevelCompleted(entry, level);
        
        levelsHTML += `
            <div class="col-md-4">
                <div class="panel panel-default" style="opacity:${unlocked ? 1 : 0.5}">
                    <div class="panel-heading text-center">
                        <strong>${level.toUpperCase()}</strong>
                        ${completed ? " ✅" : unlocked ? "" : " 🔒"}
                    </div>
                    <div class="panel-body text-center">
                        <button class="btn btn-primary btn-xs"
                            ${!unlocked || entry[level].course ? "disabled" : ""}
                            onclick="startCourse('${course}','${level}')">
                            Course
                        </button>
                        <button class="btn btn-info btn-xs"
                            ${!unlocked || entry[level].game ? "disabled" : ""}
                            onclick="startGame('${course}','${level}')">
                            Game
                        </button>
                        <button class="btn btn-success btn-xs"
                            ${!unlocked || entry[level].quiz ? "disabled" : ""}
                            onclick="startQuiz('${course}','${level}')">
                            Quiz
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    levelsHTML += '</div>';
    
    // Add practice and certificate buttons if beginner is completed
    if (isLevelCompleted(entry, "beginner")) {
        levelsHTML += `
            <div class="row" style="margin-top: 10px;">
                <div class="col-md-6 text-center">
                    <button class="btn btn-warning btn-sm"
                        ${entry.practiceCompleted ? "disabled" : ""}
                        onclick="startPractice('${course}')">
                        Practice Sheet
                    </button>
                </div>
                <div class="col-md-6 text-center">
                    <button class="btn btn-success btn-sm"
                        onclick="downloadCertificate('${course}')">
                        🎓 Certificate
                    </button>
                </div>
            </div>
        `;
    }
    
    return levelsHTML;
}

/*********************************
 * COURSE ACTIONS
 *********************************/
function startCareerCourse(course) {
    // Redirect to course.html with the specific course selected
    window.location.href = `course.html?course=${encodeURIComponent(course)}`;
}

function startCourse(course, level) {
    const coursePath = course.toLowerCase().replace(/\s+/g, '-').replace(/[&,]/g, '');
    window.location.href = `courses/${coursePath}/${level}/learning.html`;
}

function startGame(course, level) {
    const coursePath = course.toLowerCase().replace(/\s+/g, '-').replace(/[&,]/g, '');
    window.location.href = `courses/${coursePath}/${level}/game.html`;
}

function startQuiz(course, level) {
    const coursePath = course.toLowerCase().replace(/\s+/g, '-').replace(/[&,]/g, '');
    window.location.href = `courses/${coursePath}/${level}/quiz.html`;
}

function startPractice(course) {
    if (course === "Python") {
        window.open("https://colab.research.google.com/drive/12HjHw-qEbPMhbg5HsZhCbndBjf2UVf56?usp=sharing", "_blank");
        
        const entry = getCourseEntry(course);
        entry.practiceCompleted = true;
        saveUser();
        refreshCareerUI();
    } else {
        const coursePath = course.toLowerCase().replace(/\s+/g, '-').replace(/[&,]/g, '');
        window.location.href = `courses/${coursePath}/practice.html`;
    }
}

function downloadCertificate(course) {
    const coursePath = course.toLowerCase().replace(/\s+/g, '-').replace(/[&,]/g, '');
    window.location.href = `courses/${coursePath}/certificate.html`;
}

/*********************************
 * PROGRESS CALCULATION
 *********************************/
function updateCareerProgress(career) {
    const careerInfo = CAREER_DATA[career];
    const totalCourses = careerInfo.courses.length;
    let completedCourses = 0;
    
    careerInfo.courses.forEach(course => {
        if (isCourseCompleted(course)) {
            completedCourses++;
        }
    });
    
    const percent = Math.round((completedCourses / totalCourses) * 100);
    
    progressBox.style.display = "block";
    progressBar.style.width = percent + "%";
    progressBar.textContent = `${completedCourses}/${totalCourses} courses completed (${percent}%)`;
    
    // Save career progress
    user.careerProgress[career] = {
        completedCourses,
        totalCourses,
        percentage: percent
    };
    saveUser();
}

function refreshCareerUI() {
    const career = careerSelect.value;
    if (career) {
        careerSelect.dispatchEvent(new Event("change"));
    }
}

/*********************************
 * AUTO SELECT CAREER FROM URL
 *********************************/
const params = new URLSearchParams(window.location.search);
const careerFromURL = params.get("career");

if (careerFromURL && careerSelect) {
    careerSelect.value = careerFromURL;
    careerSelect.dispatchEvent(new Event("change"));
}