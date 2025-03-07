let box = document.querySelector(".box");
let btn = document.querySelector("#voiceBtn");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!window.SpeechRecognition) {
  alert("Speech recognition is not supported on this browser.");
}

const speakfun = (input) => {
  let speakInput = new SpeechSynthesisUtterance(input);
  speakInput.lang = "uk-US";
  speakInput.pitch=1;
  speakInput.rate=1;
  window.speechSynthesis.speak(speakInput);
};

const greeting = () => {
  let hour = new Date().getHours();
  let message = hour < 12 ? "Good morning! How may I help you?" : 
                hour < 16 ? "Heyy, good afternoon mate. Need help?" : 
                            "What's up? Good evening! Need assistance?";
  speakfun(message);
};

greeting();

const startVoiceInput = () => {
  if (!window.SpeechRecognition) return;
  let recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => btn.textContent = "Listening...";

  recognition.onresult = (event) => {
    let spokenText = event.results[0][0].transcript.toLowerCase();
    handleCommands(spokenText);
    toggleBackground();
  };

  recognition.onerror = () => speakfun("Sorry, I couldn't understand. Please try again.");
  recognition.onend = () => btn.textContent = "Start Listening";
  recognition.start();
};

const toggleBackground = () => {
  box.classList.toggle("btn-box");
  btn.textContent = box.classList.contains("btn-box") ? "Previous BG" : "Change BG";
};

btn.onclick = startVoiceInput;
const handleCommands = (command) => {
  let actions = {
    "hello": () => speakfun("Yup, how can I help you?"),
    "hey": () => speakfun("Yup, how can I help you?"),
    "open youtube": () => { speakfun("Getting you there."); window.open("https://www.youtube.com/"); },
    "time": () => speakfun("The current time is " + new Date().toLocaleTimeString()),
    "date": () => speakfun("Today's date is " + new Date().toLocaleDateString()),
    "weather": () => { speakfun("Checking the weather for you."); window.open("https://www.weather.com/"); },
    "news": () => { speakfun("Fetching the latest news."); window.open("https://news.google.com"); },
    "who made you": () => speakfun("I was made by Abhijit on March 6, 2025."),
  };

  if (actions[command]) {
    actions[command]();
    return;
  }

  if (command.includes("joke")) {
    let jokes = [
      "Why don’t skeletons fight each other? Because they don’t have the guts!",
      "What did one ocean say to the other ocean? Nothing, they just waved!",
      "Why do cows have hooves instead of feet? Because they lactose!",
    ];
    speakfun(jokes[Math.floor(Math.random() * jokes.length)]);
  } else if (command.includes("motivate me")) {
    let quotes = [
      "Believe you can and you're halfway there.",
      "Don't watch the clock; do what it does. Keep going.",
      "Success is not the key to happiness. Happiness is the key to success.",
    ];
    speakfun(quotes[Math.floor(Math.random() * quotes.length)]);
  }else {
    speakfun(`here is the result for ${command}`);
    window.open(`https://www.google.com/search?q=${command}`);
  }
};
