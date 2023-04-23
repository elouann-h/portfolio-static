// Elements already shown for the observers
const alreadyShown = [];

// Header properties
const showHeader = 7300;
let shown = false;

// Set top of the page each time the page is loaded
window.addEventListener("beforeunload", function() {
    window.scrollTo(0, 0);
});

// Check if the width is smaller than 1209px
const isMobile = window.matchMedia("only screen and (max-width: 1209px)").matches;
if (!isMobile) {
// Each time the users scrolls
    document.addEventListener("wheel", function(event) {
        // Header properties
        const header = document.querySelector('#tempo-header');
        const headerClassList = header.classList;

        // If the user scrolls down and the header is not shown
        if (window.scrollY > showHeader && !shown) {
            // Show the header with the animation
            if (headerClassList.contains('slide-in-blurred-top-reversed')) {
                headerClassList.remove('slide-in-blurred-top-reversed');
            }
            headerClassList.add('slide-in-blurred-top');
            setTimeout(() => {
                headerClassList.remove('slide-in-blurred-top');
                header.style.opacity = "1";
            }, 1000);
            // Set the header as shown
            shown = true;
        }
        // If the user scrolls up and the header is shown
        else if (window.scrollY < showHeader && shown) {
            // Hide the header with the animation
            if (headerClassList.contains('slide-in-blurred-top')) {
                headerClassList.remove('slide-in-blurred-top');
            }
            headerClassList.add('slide-in-blurred-top-reversed');
            setTimeout(() => {
                headerClassList.remove('slide-in-blurred-top-reversed');
                header.style.opacity = "0";
            }, 1000);
            // Set the header as not shown
            shown = false;
        }
    });
}
else {
    alert("We recommend you to use a bigger screen to see the website properly. A mobile version will be available soon.");
}

// Create the observer for the different elements
const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible and not already shown
        if (entry.isIntersecting && !alreadyShown.includes(entry.target.id)) {
            // Add the animation class
            entry.target.classList.add('fade-in');
            // Add the element to the already shown elements
            alreadyShown.push(entry.target.id);
        }
    });
});

// Observe the different elements
[
    "#about-me-first",
    "#about-me-second",
    "#about-me-third",
    "#my-skills-title",
    "#my-projects-title",
    "#projects-list",
].forEach(id => {
    observer.observe(document.querySelector(id));
});

// Languages and their properties
const languages = [
    {
        name: 'HTML',
        level: 70,
        color: '#e34c26'
    },
    {
        name: 'CSS',
        level: 40,
        color: '#264de4'
    },
    {
        name: 'SCSS',
        level: 40,
        color: '#c6538c'
    },
    {
        name: 'JavaScript',
        level: 90,
        color: '#f0db4f',
    },
    {
        name: 'TypeScript',
        level: 70,
        color: '#007acc'
    },
    {
        name: 'C',
        level: 30,
        color: '#a8b9cc'
    },
    {
        name: 'Python',
        level: 80,
        color: '#3776ab'
    },
    {
        name: 'Golang',
        level: 40,
        color: '#00add8'
    },
    {
        name: 'React',
        level: 5,
        color: '#61dafb'
    },
    {
        name: 'Angular',
        level: 5,
        color: '#dd0031'
    },
    {
        name: 'NodeJS',
        level: 80,
        color: '#339933'
    },
    {
        name: 'MongoDB',
        level: 50,
        color: '#47a248'
    },
    {
        name: 'SQLite',
        level: 100,
        color: '#003b57'
    }
];

// Add the skills to the page
const skillDiv = document.querySelector('#my-skills-list');
for (const language of languages) {
    skillDiv.innerHTML += `
        <div class="skill">
            <div class="skill-name"><h1 class="project-name">${language.name}</h1></div>
            <div class="skill-level">
                <div class="skill-bar">
                    <div class="skill-bar-fill" id="${language.name.toLowerCase()}"></div>
                </div>
            </div>
        </div>
    `;
    // Set the width and the color of the bar
    const div = document.querySelector(`#${language.name.toLowerCase()}`);
    div.style.width = `${language.level}%`;
    div.style.backgroundColor = language.color;
}