document.addEventListener("DOMContentLoaded", () => {

    /*********************************
     * AUTH
     *********************************/
    const user = JSON.parse(localStorage.getItem("careerSparkUser"));
    if (!user) {
        window.location.href = "../pages/login.html";
        return;
    }

    /*********************************
     * GET PARAMS
     *********************************/
    const params = new URLSearchParams(window.location.search);
    const course = params.get("course");
    const level = params.get("level");

    if (!course || !level) {
        alert("Invalid learning page");
        window.location.href = "../course.html";
        return;
    }

    /*********************************
     * DOM ELEMENTS
     *********************************/
    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");
    const learningTitle = document.getElementById("learningTitle");
    const learningDesc = document.getElementById("learningDesc");
    const learningContent = document.getElementById("learningContent");
    const finishBtn = document.getElementById("finishBtn");

    /*********************************
     * SET TITLES
     *********************************/
    heroTitle.innerText = course;
    heroSubtitle.innerText = `${level} Learning`;

    learningTitle.innerText = `${course} – ${level}`;
    learningDesc.innerText =
        "Read the content carefully. After completing learning, mark it as done.";

    /*********************************
     * LOAD CONTENT (FROM course-data.js)
     *********************************/
    const content =
        COURSE_DATA?.[course]?.[level]?.learning ||
        "Learning content will be added soon.";

    learningContent.innerHTML = `
        <p>${content}</p>
    `;

    /*********************************
     * HELPERS
     *********************************/
    function saveUser() {
        localStorage.setItem("careerSparkUser", JSON.stringify(user));
    }

    function getCourseEntry(courseName) {
        return user.enrolledCourses.find(c => c.course === courseName);
    }

    function enrollCourse(courseName) {
        let entry = getCourseEntry(courseName);
        if (!entry) {
            entry = {
                course: courseName,
                beginnerCompleted: false,
                intermediateCompleted: false,
                advancedCompleted: false,
                practiceCompleted: false,
                certificateIssued: false,

                // 👇 granular tracking
                beginnerLearning: false,
                beginnerGame: false,
                beginnerQuiz: false,

                intermediateLearning: false,
                intermediateGame: false,
                intermediateQuiz: false,

                advancedLearning: false,
                advancedGame: false,
                advancedQuiz: false
            };
            user.enrolledCourses.push(entry);
        }
        return entry;
    }

    /*********************************
     * FINISH LEARNING
     *********************************/
    finishBtn.addEventListener("click", () => {

        const entry = enrollCourse(course);

        if (level === "Beginner") entry.beginnerLearning = true;
        if (level === "Intermediate") entry.intermediateLearning = true;
        if (level === "Advanced") entry.advancedLearning = true;

        saveUser();

        alert("✅ Learning completed!");
        window.location.href = `../course.html?course=${encodeURIComponent(course)}`;
    });

});
