/*if user types any message in the input field and clicks the send button, show that message in the message section of msg.html */
let submitbutton;
let messageInput;
let messageContainer;
let loginPage;
let loginButton;
let arrowBottom;



function appendMessage(sender, text, align = "left") {
  if (!messageContainer) return;

  const messageDiv = document.createElement("div");
  messageDiv.classList.add(align === "right" ? "message-right" : "message-left");

  const senderLabel = document.createElement("p");
  senderLabel.classList.add("sender-name");
  senderLabel.innerText = sender;
  senderLabel.style.color = align === "right" ? "#e04b4b" : "#777";
  senderLabel.style.fontWeight = "400";
  senderLabel.style.fontSize = "0.8em";
  senderLabel.style.margin = "0 0 4px 0";

  const messageP = document.createElement("p");
  messageP.innerText = text;
  messageP.style.margin = "0";

  messageDiv.appendChild(senderLabel);
  messageDiv.appendChild(messageP);
  messageContainer.appendChild(messageDiv);
  messageContainer.scrollTop = messageContainer.scrollHeight;
  updateArrowBottomVisibility();
}

function sendMessage() {
  if (!messageInput || !messageContainer) return;
  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage("You", message, "left");
  messageInput.value = "";
  messageInput.focus();
}

function receiveMessage(message, sender) {
  if (!messageContainer || !message) return;
  appendMessage(sender || "Demo User 4", message, "right");
}

function getUserFromMessageButton(button) {
  if (!button) return null;
  return button.dataset.user || button.dataset.username || button.getAttribute("data-user") || button.getAttribute("data-username");
}

function openUserMessagePage(userName) {
  const targetUrl = userName ? `msg.html?user=${encodeURIComponent(userName)}` : "msg.html";
  window.location.href = targetUrl;
}

function initializeExploreMessageButtons() {
  const messageButtons = document.querySelectorAll(".message-button, .message-btn, .btn-message");
  if (!messageButtons.length) return;

  messageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const userName = getUserFromMessageButton(button);
      openUserMessagePage(userName);
    });
  });
}

function updateLoginButtonVisibility() {
  if (!loginButton) return;
  loginButton.style.display = loginPage ? "" : "none";
}

function updateArrowBottomVisibility() {
  if (!arrowBottom) return;
  if (!messageContainer) {
    arrowBottom.style.display = "none";
    return;
  }

  const hasOverflow = messageContainer.scrollHeight > messageContainer.clientHeight;
  arrowBottom.style.display = hasOverflow ? "" : "none";
}

function initializeChat() {
  submitbutton = document.querySelector(".send, .send-btn, .submit-button, button[type='submit'], input[type='submit']");
  messageInput = document.querySelector("#msg, input[name='msg'], textarea[name='msg'], input[placeholder*='message'], textarea, input[type='text']");
  messageContainer = document.querySelector(".message, .messages, .chat-messages, .chat-container");
  loginPage = document.querySelector(".login-page") || document.getElementById("login-page");
  loginButton = document.querySelector(".login-button") || document.getElementById("login-button");
  arrowBottom = document.querySelector(".arrow-bottom") || document.getElementById("arrow-bottom");

  if (submitbutton) {
    submitbutton.addEventListener("click", function (event) {
      if (event && typeof event.preventDefault === "function") {
        event.preventDefault();
      }
      sendMessage();
    });
  }

  if (messageInput) {
    messageInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
  }

  initializeExploreMessageButtons();
  updateLoginButtonVisibility();
  updateArrowBottomVisibility();
}

if (document.readyState !== "loading") {
  initializeChat();
} else {
  document.addEventListener("DOMContentLoaded", initializeChat);
}

// Example of receiving a message after 5 seconds for demonstration purposes
// Send messages one at a time, each 5 seconds after the previous
const demoMessages = [
  { text: "Hello! This is a message from the other user.", receiver: "Demo User 4" },
  { text: "Feel free to chat here!" },
  { text: "This is a demo message to show how messages from the other user will appear." },
  { text: "You can type your messages in the input field and click send to see them on the left side." },
  { text: "This chat interface is designed to show messages from you on the left and messages from the other user on the right." }
];

function sendDemoMessagesSequentially(messages, delayMs) {
  let idx = 0;
  function sendNext() {
    if (messages.length === 0) return;
    const m = messages[idx];
    receiveMessage(m.text, m.receiver);
    idx = (idx + 1) % messages.length;
    setTimeout(sendNext, delayMs);
  }
  setTimeout(sendNext, delayMs);
}

sendDemoMessagesSequentially(demoMessages, 5000);

let currentZoomedProfilePic = null;

const profilePics = document.querySelectorAll("[id='profilePic'], .profilePic");
profilePics.forEach((profilePic) => {
  profilePic.dataset.zoomed = "false";
  profilePic.addEventListener("click", () => {

    if (currentZoomedProfilePic && currentZoomedProfilePic !== profilePic) {
      currentZoomedProfilePic.style.transform = "scale(1)";
      currentZoomedProfilePic.style.cursor = "pointer";
      currentZoomedProfilePic.style.maxWidth = "";
      currentZoomedProfilePic.style.maxHeight = "";
      currentZoomedProfilePic.style.transformOrigin = "";
      currentZoomedProfilePic.style.position = "";
      currentZoomedProfilePic.style.top = "";
      currentZoomedProfilePic.style.left = "";
      currentZoomedProfilePic.style.zIndex = "";
      currentZoomedProfilePic.dataset.zoomed = "false";
      currentZoomedProfilePic = null;
    }

    const isZoomed = profilePic.dataset.zoomed === "true";
    if (isZoomed) {
      profilePic.style.transform = "scale(1)";
      profilePic.style.cursor = "pointer";
      profilePic.style.maxWidth = "";
      profilePic.style.maxHeight = "";
      profilePic.style.transformOrigin = "";
      profilePic.style.position = "";
      profilePic.style.top = "";
      profilePic.style.left = "";
      profilePic.style.zIndex = "";
      profilePic.dataset.zoomed = "false";
      currentZoomedProfilePic = null;
    } else {
      profilePic.style.transform = "scale(3)";
      profilePic.style.cursor = "zoom-out";
      profilePic.style.transition = "transform 0.3s ease";
      profilePic.style.transformOrigin = "center center";
      profilePic.style.maxWidth = "90vw";
      profilePic.style.maxHeight = "90vh";
      profilePic.style.position = "fixed";
      profilePic.style.top = "50%";
      profilePic.style.left = "50%";
      profilePic.style.zIndex = "9999";
      profilePic.dataset.zoomed = "true";
      currentZoomedProfilePic = profilePic;
    }
  });
});

//logic for user selection



const mode = localStorage.getItem("mode") || "light";
document.documentElement.setAttribute("data-theme", mode);
function toggleMode() {
  const currentMode = document.documentElement.getAttribute("data-theme");
  const newMode = currentMode === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newMode);
  localStorage.setItem("mode", newMode);
}

// alert("Welcome to Skill Swap! Please select your user profile to start chatting and swapping skills with others. Click on the profile pictures to zoom in and see more details about each user. Enjoy connecting and sharing your skills!\n\n\nThis is a demo website, so feel free to explore and interact with the chat interface. You can send messages and see how the chat works. Happy skill swapping!");











