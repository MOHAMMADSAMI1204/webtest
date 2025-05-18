// Particle.js Configuration
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false
    },
    "size": {
      "value": 3,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "color": "#ffffff"
      },
      "repulse": {
        "distance": 200,
        "duration": 1
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

// Typing Effect
const dynamicText = document.querySelector("h2 span");
const words = [
  { text: "YOUTUBER", color: "red" },
  { text: "GAMER", color: "#9f00ff" },
  { text: "DEVELOPER", color: "#00ffff" },
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.text.substring(0, charIndex);
  dynamicText.textContent = currentChar;
  dynamicText.style.color = currentWord.color;
  dynamicText.classList.add("stop-blinking");

  if (!isDeleting && charIndex < currentWord.text.length) {
    charIndex++;
    setTimeout(typeEffect, 200);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 100);
  } else {
    isDeleting = !isDeleting;
    dynamicText.classList.remove("stop-blinking");
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
};

typeEffect();

// Modal Handling
const minecraftButton = document.getElementById("minecraft-button");
const modal = document.getElementById("google-login-modal");
const closeModal = document.getElementById("close-modal");
const googleButton = document.querySelector(".google-button");

// Show modal on Minecraft button click
minecraftButton.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

// Close modal when clicking on close button
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Google Auth Implementation
let auth2;

function initGoogleAuth() {
  gapi.load('auth2', function() {
    auth2 = gapi.auth2.init({
      client_id: '134682184677-3anod23u35l4tqolav9k2us8r69n9kgh.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile email'
    }).then(function() {
      console.log('Google Auth initialized');
      attachSignInHandler();
    }).catch(function(error) {
      console.error('Google Auth init error:', error);
    });
  });
}

function attachSignInHandler() {
  googleButton.addEventListener('click', onGoogleSignIn);
}

function onGoogleSignIn(e) {
  e.preventDefault();
  
  if (!auth2) {
    console.error('Google Auth not initialized');
    return;
  }

  // Show loading state
  googleButton.innerHTML = '<div class="loading-spinner"></div> Signing in...';
  
  auth2.signIn().then(function(googleUser) {
    // Handle successful login
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Email: ' + profile.getEmail());
    console.log('Image URL: ' + profile.getImageUrl());
    
    // Restore button state
    googleButton.innerHTML = '<img src="Image/google-icon.png" class="icon" alt="Google Icon" /> Signed in!';
    
    // Show welcome message
    setTimeout(() => {
      alert(`Welcome, ${profile.getName()}!`);
      modal.style.display = "none";
      
      // Reset button after delay
      setTimeout(() => {
        googleButton.innerHTML = '<img src="Image/google-icon.png" class="icon" alt="Google Icon" /> Sign in';
      }, 2000);
    }, 500);
    
    // You can now use the profile info or send it to your backend
    // sendUserDataToBackend(googleUser.getAuthResponse().id_token);
    
  }).catch(function(error) {
    console.error('Google sign-in error:', error);
    
    // Restore button state
    googleButton.innerHTML = '<img src="Image/google-icon.png" class="icon" alt="Google Icon" /> Sign in';
    
    // Show error message
    if (error.error === 'popup_closed_by_user') {
      alert('Sign in was cancelled.');
    } else {
      alert('Sign in failed: ' + error.error);
    }
  });
}

// Load Google API client
function loadGoogleAPI() {
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/platform.js?onload=initGoogleAuth';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

// Add loading spinner style
const style = document.createElement('style');
style.textContent = `
  .loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    margin-right: 10px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Initialize everything when window loads
window.addEventListener('load', function() {
  // Start the typing effect is already running
  // Initialize Google Auth
  loadGoogleAPI();
  
  // You might want to check for existing session here
  // checkExistingSession();
});

// Example function to send user data to backend
function sendUserDataToBackend(idToken) {
  fetch('/api/auth/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: idToken })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Backend response:', data);
    // Handle backend response (e.g., store session token)
  })
  .catch(error => {
    console.error('Error sending token to backend:', error);
  });
}

// Example function to check existing session
function checkExistingSession() {
  if (auth2) {
    if (auth2.isSignedIn.get()) {
      const user = auth2.currentUser.get();
      const profile = user.getBasicProfile();
      console.log('User already signed in:', profile.getName());
      // Update UI accordingly
    }
  }
}