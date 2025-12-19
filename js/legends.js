/*********************************
 * LEGENDS DATA
 *********************************/
const LEGENDS_DATA = {
    // DIRECTORS
    "christopher-nolan": {
        name: "Christopher Nolan",
        category: "Director",
        image: "images/person1.jpg",
        famous_works: ["Inception", "Interstellar", "The Dark Knight", "Dunkirk", "Tenet"],
        biography: "Christopher Nolan is a British-American filmmaker known for his complex narratives and innovative visual techniques.",
        achievements: ["Academy Award nominations", "BAFTA Awards", "Directors Guild Awards"],
        career_path: "Started with short films, then independent features, eventually becoming one of Hollywood's most respected directors."
    },
    "ss-rajamouli": {
        name: "S.S. Rajamouli",
        category: "Director",
        image: "movie/raj.jpg",
        famous_works: ["Baahubali: The Beginning", "Baahubali 2: The Conclusion", "RRR", "Eega", "Magadheera"],
        biography: "S.S. Rajamouli is an Indian filmmaker known for his epic action dramas and fantasy films, regarded as the highest-grossing Indian director of all time.",
        achievements: ["Academy Award for Best Original Song", "Golden Globe Award", "Padma Shri", "National Film Awards"],
        career_path: "Started in television, moved to feature films, and became a pioneer of pan-Indian cinema with global recognition."
    },
    "steven-spielberg": {
        name: "Steven Spielberg",
        category: "Director",
        image: "images/person2.jpg",
        famous_works: ["Jurassic Park", "E.T.", "Schindler's List", "Jaws", "Indiana Jones"],
        biography: "Steven Spielberg is one of the most influential filmmakers in the history of cinema.",
        achievements: ["3 Academy Awards", "Presidential Medal of Freedom", "Kennedy Center Honors"],
        career_path: "Started as a television director, moved to feature films, and became a legendary filmmaker and producer."
    },
    "quentin-tarantino": {
        name: "Quentin Tarantino",
        category: "Director",
        image: "images/person3.jpg",
        famous_works: ["Pulp Fiction", "Kill Bill", "Django Unchained", "Inglourious Basterds"],
        biography: "Quentin Tarantino is known for his distinctive style, nonlinear storylines, and pop culture references.",
        achievements: ["2 Academy Awards for Best Original Screenplay", "Palme d'Or winner"],
        career_path: "Worked in a video rental store, wrote screenplays, and became an acclaimed independent filmmaker."
    },
    "martin-scorsese": {
        name: "Martin Scorsese",
        category: "Director",
        image: "images/staff-1.jpg",
        famous_works: ["Goodfellas", "The Departed", "Taxi Driver", "The Wolf of Wall Street"],
        biography: "Martin Scorsese is an American filmmaker known for his gritty crime dramas and character studies.",
        achievements: ["Academy Award for Best Director", "AFI Life Achievement Award"],
        career_path: "Film school graduate who started with independent films and became a master of cinema."
    },
    "james-cameron": {
        name: "James Cameron",
        category: "Director",
        image: "images/staff-2.jpg",
        famous_works: ["Avatar", "Titanic", "Terminator", "Aliens"],
        biography: "James Cameron is known for his groundbreaking visual effects and epic storytelling.",
        achievements: ["3 Academy Awards", "Highest-grossing films of all time"],
        career_path: "Started as a special effects artist and became a visionary director and technology innovator."
    },
    "denis-villeneuve": {
        name: "Denis Villeneuve",
        category: "Director",
        image: "images/staff-3.jpg",
        famous_works: ["Dune", "Blade Runner 2049", "Arrival", "Sicario"],
        biography: "Denis Villeneuve is a Canadian filmmaker known for his thoughtful science fiction and thriller films.",
        achievements: ["Academy Award nominations", "BAFTA Awards", "Critics' Choice Awards"],
        career_path: "Started in Canadian cinema and became an internationally acclaimed director."
    },

    // ACTORS
    "leonardo-dicaprio": {
        name: "Leonardo DiCaprio",
        category: "Actor",
        image: "images/project-1.jpg",
        famous_works: ["The Revenant", "Inception", "Titanic", "The Wolf of Wall Street"],
        biography: "Leonardo DiCaprio is an American actor and environmental activist known for his versatile performances.",
        achievements: ["Academy Award for Best Actor", "3 Golden Globe Awards", "Environmental activism"],
        career_path: "Child actor who transitioned to leading man roles and became one of Hollywood's biggest stars."
    },
    "meryl-streep": {
        name: "Meryl Streep",
        category: "Actor",
        image: "images/project-2.jpg",
        famous_works: ["The Devil Wears Prada", "Sophie's Choice", "The Iron Lady", "Doubt"],
        biography: "Meryl Streep is widely regarded as one of the greatest actresses of all time.",
        achievements: ["3 Academy Awards", "21 Academy Award nominations", "Presidential Medal of Freedom"],
        career_path: "Theater background, transitioned to film, and became the most nominated actor in Oscar history."
    },
    "robert-de-niro": {
        name: "Robert De Niro",
        category: "Actor",
        image: "images/project-3.jpg",
        famous_works: ["Taxi Driver", "Goodfellas", "The Godfather Part II", "Raging Bull"],
        biography: "Robert De Niro is known for his intense method acting and collaborations with Martin Scorsese.",
        achievements: ["2 Academy Awards", "AFI Life Achievement Award", "Kennedy Center Honors"],
        career_path: "Method actor who became one of the most respected performers in cinema history."
    },
    "tom-hanks": {
        name: "Tom Hanks",
        category: "Actor",
        image: "images/project-4.jpg",
        famous_works: ["Forrest Gump", "Cast Away", "Philadelphia", "Saving Private Ryan"],
        biography: "Tom Hanks is known for his everyman persona and dramatic range.",
        achievements: ["2 Academy Awards", "Presidential Medal of Freedom", "Kennedy Center Honors"],
        career_path: "Comedy actor who transitioned to dramatic roles and became America's most beloved actor."
    },
    "denzel-washington": {
        name: "Denzel Washington",
        category: "Actor",
        image: "images/project-5.jpg",
        famous_works: ["Training Day", "Malcolm X", "Fences", "Flight"],
        biography: "Denzel Washington is known for his powerful performances and directorial work.",
        achievements: ["2 Academy Awards", "Tony Award", "Cecil B. DeMille Award"],
        career_path: "Theater actor who became a leading man and respected director in Hollywood."
    },
    "scarlett-johansson": {
        name: "Scarlett Johansson",
        category: "Actor",
        image: "images/project-6.jpg",
        famous_works: ["Black Widow", "Her", "Marriage Story", "Lost in Translation"],
        biography: "Scarlett Johansson is known for her versatility in both independent and blockbuster films.",
        achievements: ["2 Academy Award nominations", "BAFTA Award", "Tony Award nomination"],
        career_path: "Child actor who became a leading actress in both arthouse and commercial cinema."
    },

    // MUSIC DIRECTORS
    "hans-zimmer": {
        name: "Hans Zimmer",
        category: "Music Director",
        image: "images/project-7.jpg",
        famous_works: ["Inception", "Interstellar", "The Lion King", "Gladiator", "Dune"],
        biography: "Hans Zimmer is a German film score composer known for his innovative electronic and orchestral compositions.",
        achievements: ["Academy Award", "2 Golden Globe Awards", "Grammy Awards"],
        career_path: "Started as a synthesizer player, moved to film scoring, and became one of the most influential composers."
    },
    "john-williams": {
        name: "John Williams",
        category: "Music Director",
        image: "images/project-8.jpg",
        famous_works: ["Star Wars", "Harry Potter", "Jurassic Park", "E.T.", "Indiana Jones"],
        biography: "John Williams is considered one of the greatest film composers of all time.",
        achievements: ["5 Academy Awards", "25 Grammy Awards", "Kennedy Center Honors"],
        career_path: "Jazz pianist who became a film and television composer, creating some of cinema's most iconic themes."
    },
    "ennio-morricone": {
        name: "Ennio Morricone",
        category: "Music Director",
        image: "images/project-9.jpg",
        famous_works: ["The Good, the Bad and the Ugly", "Cinema Paradiso", "The Hateful Eight"],
        biography: "Ennio Morricone was an Italian composer known for his innovative film scores.",
        achievements: ["Academy Award", "Grammy Awards", "Golden Globe Awards"],
        career_path: "Classical composer who revolutionized film music, especially in Western films."
    },
    "ar-rahman": {
        name: "A.R. Rahman",
        category: "Music Director",
        image: "images/work_1.png",
        famous_works: ["Slumdog Millionaire", "Roja", "Lagaan", "Dil Se"],
        biography: "A.R. Rahman is an Indian composer known for blending traditional Indian music with electronic sounds.",
        achievements: ["2 Academy Awards", "2 Grammy Awards", "Padma Bhushan"],
        career_path: "Started in advertising jingles, moved to film music, and became internationally acclaimed."
    },
    "ludwig-goransson": {
        name: "Ludwig Göransson",
        category: "Music Director",
        image: "images/loc.png",
        famous_works: ["Black Panther", "The Mandalorian", "Creed", "Tenet"],
        biography: "Ludwig Göransson is a Swedish composer known for his innovative approach to film and television scoring.",
        achievements: ["Academy Award", "Emmy Awards", "Grammy Awards"],
        career_path: "Studied at USC, collaborated with various artists, and became a sought-after film composer."
    },
    "trent-reznor": {
        name: "Trent Reznor",
        category: "Music Director",
        image: "images/img_bg_1.jpg",
        famous_works: ["The Social Network", "Gone Girl", "Soul", "Mank"],
        biography: "Trent Reznor is known for his industrial rock background and atmospheric film scores.",
        achievements: ["Academy Award", "Grammy Awards", "Rock and Roll Hall of Fame"],
        career_path: "Rock musician who transitioned to film scoring and became an acclaimed composer."
    }
};

/*********************************
 * LEGEND NAVIGATION
 *********************************/
function openLegend(legendId) {
    // Navigate to individual legend page
    window.location.href = `pages/legends/${legendId}.html`;
}

/*********************************
 * INITIALIZE PAGE
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
    console.log("Legends page loaded with", Object.keys(LEGENDS_DATA).length, "legends");
});