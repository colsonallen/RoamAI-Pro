export default {
  onload: ({ extensionAPI }) => {
    // Add a command to the Roam command palette
    extensionAPI.ui.commandPalette.addCommand({
      label: "Open AI Chat (Blueprint)",
      callback: () => openAIChatPanel(),
    });
  },
  onunload: () => {
    // If we created any DOM elements or intervals, clean them here
  },
};

function openAIChatPanel() {
  // Attempt to open an "extension" type window in the right sidebar
  window.roamAlphaAPI.ui.rightSidebar.addWindow({
    window: {
      type: "extension",
      id: "ac-ai-chat",
      render: (el) => {
        // We'll render our UI directly into `el`
        renderChatUI(el);
      },
    },
  });
}

function renderChatUI(containerEl) {
  // Clear anything previously rendered
  containerEl.innerHTML = "";

  // Apply Blueprint or custom classes. We'll nest everything in a 'bp3-card'.
  const wrapper = document.createElement("div");
  wrapper.classList.add("bp3-card", "ac-chat-wrapper");
  wrapper.style.margin = "8px"; // optional inline style

  // Title
  const titleEl = document.createElement("h3");
  titleEl.classList.add("bp3-heading");
  titleEl.textContent = "Claude Chat";
  wrapper.appendChild(titleEl);

  // Messages area (scrollable)
  const messagesEl = document.createElement("div");
  messagesEl.classList.add("ac-chat-messages", "bp3-running-text");
  messagesEl.style.height = "200px";
  messagesEl.style.overflowY = "auto";
  messagesEl.style.border = "1px solid #ccc";
  messagesEl.style.padding = "8px";
  messagesEl.style.marginBottom = "8px";
  wrapper.appendChild(messagesEl);

  // Input (Blueprint text area)
  const inputEl = document.createElement("textarea");
  inputEl.classList.add("bp3-input");
  inputEl.setAttribute("rows", "3");
  inputEl.placeholder = "Type your prompt...";
  wrapper.appendChild(inputEl);

  // Send button
  const sendBtn = document.createElement("button");
  sendBtn.classList.add("bp3-button", "bp3-intent-primary", "ac-chat-send-button");
  sendBtn.style.marginTop = "8px";
  sendBtn.textContent = "Send to Claude";
  sendBtn.onclick = async () => {
    const userText = inputEl.value.trim();
    if (!userText) return;

    // Display user text
    const userMsg = document.createElement("div");
    userMsg.textContent = `You: ${userText}`;
    messagesEl.appendChild(userMsg);

    // Clear input
    inputEl.value = "";

    // Here is where you'd do your MCP call to Claude
    // For example, a fetch request to your local Claude server:
    let claudeReply = "Dummy response. Replace with real Claude call!";
    try {
      // Example only:
      // const response = await fetch("http://localhost:3333/claude", { ... });
      // claudeReply = await response.text();
    } catch (err) {
      console.error("Claude request failed:", err);
      claudeReply = "Error contacting Claude.";
    }

    // Display Claude reply
    const claudeMsg = document.createElement("div");
    claudeMsg.textContent = `Claude: ${claudeReply}`;
    messagesEl.appendChild(claudeMsg);

    // Auto-scroll messages to bottom
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };
  wrapper.appendChild(sendBtn);

  containerEl.appendChild(wrapper);
}
