export default {
  onload: ({ extensionAPI }) => {
    extensionAPI.ui.commandPalette.addCommand({
      label: "Open AI Chat (Block UID)",
      callback: () => openAIChatWithBlock("https://roamresearch.com/#/app/Bradley_Parsons/page/kYzHSG1X8"),
    });
  },
  onunload: () => {},
};

/**
 * Opens a right sidebar window pinned to the block with `block-uid`,
 * then injects a custom chat UI into that sidebar DOM element.
 */
function openAIChatWithBlock(blockUid) {
  // 1. Tell Roam to open the block in the right sidebar
  window.roamAlphaAPI.ui.rightSidebar.addWindow({
    window: {
      type: "block",
      "block-uid": blockUid,
    },
  });

  // 2. Wait a short moment for the sidebar DOM to appear
  setTimeout(() => {
    // The side window's DOM usually has `sidewindowkey="block:MY_BLOCK_UID"`
    const sideWindow = document.querySelector(`div[sidewindowkey^="${blockUid}"]`);
    if (!sideWindow) {
      console.error("Could not find the side window DOM for block:", blockUid);
      return;
    }

    // Clear any existing content from that sidebar area
    sideWindow.innerHTML = "";

    // 3. Insert your chat UI
    const wrapper = document.createElement("div");
    wrapper.style.padding = "8px";

    // Title
    const titleEl = document.createElement("h3");
    titleEl.textContent = "Claude Chat";
    wrapper.appendChild(titleEl);

    // Message area
    const messagesEl = document.createElement("div");
    messagesEl.style.height = "200px";
    messagesEl.style.overflowY = "auto";
    messagesEl.style.border = "1px solid #ccc";
    messagesEl.style.marginBottom = "8px";
    wrapper.appendChild(messagesEl);

    // Input
    const inputEl = document.createElement("textarea");
    inputEl.placeholder = "Type your message...";
    inputEl.rows = 2;
    inputEl.style.width = "100%";
    wrapper.appendChild(inputEl);

    // Send Button
    const sendBtn = document.createElement("button");
    sendBtn.textContent = "Send";
    sendBtn.style.display = "block";
    sendBtn.style.marginTop = "8px";
    sendBtn.onclick = async () => {
      const text = inputEl.value.trim();
      if (!text) return;

      // Append user text
      const userMsg = document.createElement("div");
      userMsg.textContent = `You: ${text}`;
      messagesEl.appendChild(userMsg);

      inputEl.value = "";

      // TODO: Make real call to Claude. For now, pretend we got a response:
      let claudeReply = "Hello! (Dummy response)";
      // e.g. fetch("http://localhost:3333/claude", { method: "POST", body: ... })

      // Show response
      const claudeMsg = document.createElement("div");
      claudeMsg.textContent = `Claude: ${claudeReply}`;
      messagesEl.appendChild(claudeMsg);

      messagesEl.scrollTop = messagesEl.scrollHeight;
    };
    wrapper.appendChild(sendBtn);

    sideWindow.appendChild(wrapper);
  }, 300);
}
