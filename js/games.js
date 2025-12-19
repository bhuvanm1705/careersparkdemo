/*********************************
 * AUTH & USER INIT
 *********************************/
const user = JSON.parse(localStorage.getItem("careerSparkUser"));

if (!user) {
    window.location.href = "pages/login.html";
}

if (!user.gameProgress) {
    user.gameProgress = {};
    saveUser();
}

/*********************************
 * CONSTANTS & DOM
 *********************************/
const careerSelect = document.getElementById("careerSelect");
const gamesContainer = document.getElementById("gamesContainer");
const careerDescription = document.getElementById("careerDescription");
const careerDescText = document.getElementById("careerDescText");

/*********************************
 * HELPERS
 *********************************/
function saveUser() {
    localStorage.setItem("careerSparkUser", JSON.stringify(user));
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
    gamesContainer.innerHTML = "";
    const career = careerSelect.value;
    
    if (!career) {
        careerDescription.style.display = "none";
        return;
    }

    const careerInfo = CAREER_DATA[career];
    
    // Show career description
    careerDescription.style.display = "block";
    careerDescText.textContent = `Test your ${career} skills through interactive games and quizzes!`;
    
    // Render games and quizzes for this career
    renderCareerGames(career);
});

/*********************************
 * RENDER CAREER GAMES
 *********************************/
function renderCareerGames(career) {
    const careerInfo = CAREER_DATA[career];
    
    gamesContainer.innerHTML = `
        <div class="row">
            <div class="col-md-12">
                <h3 class="text-center">${careerInfo.icon} ${career} - Interactive Learning</h3>
            </div>
        </div>
    `;

    // Game Card
    const gameCard = `
        <div class="row" style="margin-bottom: 30px;">
            <div class="col-md-6">
                <div class="game-card">
                    <div class="game-icon">🎮</div>
                    <h4>${career} Skills Game</h4>
                    <p>Interactive game to test and improve your ${career.toLowerCase()} skills through challenges and scenarios.</p>
                    <button class="btn btn-light btn-lg" onclick="startCareerGame('${career}')">
                        Play Game
                    </button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="quiz-card">
                    <div class="game-icon">📝</div>
                    <h4>${career} Knowledge Quiz</h4>
                    <p>Comprehensive quiz covering key concepts and practical knowledge in ${career.toLowerCase()}.</p>
                    <button class="btn btn-light btn-lg" onclick="startCareerQuiz('${career}')">
                        Take Quiz
                    </button>
                </div>
            </div>
        </div>
    `;
    
    gamesContainer.innerHTML += gameCard;

    // Add progress tracking if user has played before
    if (user.gameProgress[career]) {
        const progress = user.gameProgress[career];
        const progressCard = `
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-success">
                        <div class="panel-heading">
                            <h4>Your Progress in ${career}</h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <p><strong>Game Score:</strong> ${progress.gameScore || 0}/100</p>
                                    <p><strong>Games Played:</strong> ${progress.gamesPlayed || 0}</p>
                                </div>
                                <div class="col-md-6">
                                    <p><strong>Quiz Score:</strong> ${progress.quizScore || 0}/100</p>
                                    <p><strong>Quizzes Taken:</strong> ${progress.quizzesTaken || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        gamesContainer.innerHTML += progressCard;
    }
}

/*********************************
 * GAME ACTIONS
 *********************************/
function startCareerGame(career) {
    // Initialize progress if not exists
    if (!user.gameProgress[career]) {
        user.gameProgress[career] = {
            gameScore: 0,
            gamesPlayed: 0,
            quizScore: 0,
            quizzesTaken: 0
        };
    }

    // For now, simulate game completion
    // In real implementation, this would navigate to actual game
    const confirmed = confirm(`Start ${career} Skills Game?\n\nThis will open an interactive game to test your ${career} knowledge and skills.`);
    
    if (confirmed) {
        // Simulate game completion with random score
        const score = Math.floor(Math.random() * 40) + 60; // Score between 60-100
        user.gameProgress[career].gamesPlayed++;
        user.gameProgress[career].gameScore = Math.max(user.gameProgress[career].gameScore, score);
        saveUser();
        
        alert(`Game completed! Your score: ${score}/100`);
        refreshGamesUI();
    }
}

function startCareerQuiz(career) {
    // Initialize progress if not exists
    if (!user.gameProgress[career]) {
        user.gameProgress[career] = {
            gameScore: 0,
            gamesPlayed: 0,
            quizScore: 0,
            quizzesTaken: 0
        };
    }

    // For now, simulate quiz completion
    // In real implementation, this would navigate to actual quiz
    const confirmed = confirm(`Start ${career} Knowledge Quiz?\n\nThis quiz will test your understanding of ${career} concepts and practices.`);
    
    if (confirmed) {
        // Simulate quiz completion with random score
        const score = Math.floor(Math.random() * 30) + 70; // Score between 70-100
        user.gameProgress[career].quizzesTaken++;
        user.gameProgress[career].quizScore = Math.max(user.gameProgress[career].quizScore, score);
        saveUser();
        
        alert(`Quiz completed! Your score: ${score}/100`);
        refreshGamesUI();
    }
}

function refreshGamesUI() {
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