// For Progress Bars
document.querySelectorAll(".skills-prog li").forEach((li, i) => {
    const bar = li.querySelector(".skills-bar .bar");
    const percent = li.getAttribute("data-percent");
    
    setTimeout(() => {
        bar.style.width = percent + "%";
        bar.style.transitionDuration = ".5s";
    }, i * 150);
});

// For Software Skills (Stop Rotation at 100% and Show Progress Line)
document.querySelectorAll(".skills-soft li").forEach((li, i) => {
    const svg = li.querySelector("svg");
    const circle = svg.querySelector(".cbar");
    const percent = li.getAttribute("data-percent");
    const r = circle.getAttribute("r");
    const c = Math.PI * (r * 2);
    const cbar = (100 - percent) / 100 * c;

    function animateLine() {
        circle.style.strokeDashoffset = c;
        circle.style.strokeDasharray = c;
        circle.style.transitionDuration = "3s";

        const small = li.querySelector("small");

        circle.animate(
            { strokeDashoffset: cbar },
            { duration: 3000 }
        ).onfinish = () => {
            small.innerHTML = Math.ceil(percent) + "%";

            // If completion percentage reaches 100%, stop rotation and show the progress line
            if (percent >= 100) {
                clearInterval(animation);
                circle.style.transform = "none"; // Stop the rotation
                circle.style.display = 'block'; // Show the progress line
            }
        };
    }

    // Run the rotating animation
    const animation = setInterval(animateLine, i * 150);
});
