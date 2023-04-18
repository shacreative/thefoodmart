let menuOpen = false;

function toggleMenu() {
  TweenMax.to(".menu-list-container", 1, { // Update duration to 0.5 seconds for a smoother animation
    right: menuOpen ? "-25%" : 0,
    ease: Power3.easeInOut,
  });

  TweenMax.to("main", 1, { // Update duration to 0.5 seconds for a smoother animation
    left: menuOpen ? 0 : "-25%",
    ease: Power3.easeInOut,
    onComplete: function() {
      menuOpen = !menuOpen; // Set menuOpen to false after the animation is complete
    }
  });
}

// Event listeners to menu links
const menuLinks = document.querySelectorAll(".menu-list-container a");
for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener("click", function(event) {
   setTimeout(function() {
      toggleMenu();
      window.location.href = event.target.href; // Navigate to the link's href after a delay
    }, 300);
  });
}

// Live Time and Date Section
let time = document.getElementsByClassName("current-time")[0];
setInterval(() => {
    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000);

let dateElement = document.getElementsByClassName("current-date")[0];
let currentDate = new Date();
let options = { year: 'numeric', month: 'long', day: 'numeric' };
let dateString = currentDate.toLocaleDateString(undefined, options);
dateElement.innerHTML = dateString;


 