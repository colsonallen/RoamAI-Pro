export default {
  onload: ({ extensionAPI }) => {
    // Add a Roam command to open the chat window in the right sidebar
    extensionAPI.ui.commandPalette.addCommand({
      label: "Open Claude Chat",
      callback: () => openClaudeChat(),
    });
  },
  onunload: () => {
    // If you ever need to remove cleanup, do it here
  },
};

function openClaudeChat() {
  // Creates a new panel in Roam's right sidebar
  const panel = document.createElement("div");
  panel.classList.add("chat-container");

  // (Optional) Add a header
  const header = document.createElement("div");
  header.classList.add("chat-header");
  header.textContent = "Claude Chat Window";
  panel.appendChild(header);

  // Chat messages area
  const messagesDiv = document.createElement("div");
  messagesDiv.classList.add("chat-messages");
  panel.appendChild(messagesDiv);

  // Input box
  const input = document.createElement("textarea");
  input.classList.add("chat-input");
  input.placeholder = "Type your prompt...";
  panel.appendChild(input);

  // Send button
  const sendBtn = document.createElement("button");
  sendBtn.textContent = "Send to Claude";
  sendBtn.onclick = async () => {
    const userInput = input.value.trim();
    if (!userInput) return;

    // Display the user message
    const userMsg = document.createElement("div");
    userMsg.textContent = `You: ${userInput}`;
    messagesDiv.appendChild(userMsg);

    // Clear input field
    input.value = "";

    // Example: call local MCP server - adapt to your actual code
    try {
      // Placeholder fetch - adjust to your local server or `use_mcp_tool` approach
      // Here, you'd do something like:
      //    fetch("http://localhost:YOUR_PORT", { method: "POST", body: JSON.stringify(...) })
      // Or integrate your actual logic for sending the prompt to Claude.
      // For now, we'll just pretend we got a dummy response:
      const claudeResponse = "Hello from Claude! (Dummy response)";

      // Display Claude's response
      const claudeMsg = document.createElement("div");
      claudeMsg.textContent = `Claude: ${claudeResponse}`;
      messagesDiv.appendChild(claudeMsg);

      // Scroll messagesDiv to bottom
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  panel.appendChild(sendBtn);

  // Insert panel into sidebar
  window.roamAlphaAPI.ui.rightSidebar.addWindow({
    window: {
      type: "extension",
      id: "claude-chat",
      render: (el) => {
        el.appendChild(panel);
      },
    },
  });
}
