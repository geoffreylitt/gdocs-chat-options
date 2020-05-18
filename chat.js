console.log('loaded chat.js')

function onDomReady(fn) {
  if (document.readyState!='loading') fn();
  else document.addEventListener('DOMContentLoaded', fn)
}

function setup() {
  var textBox = document.querySelector("textarea.docs-chat-edit-box")

  if (!textBox) {
    setTimeout(setup, 1000);
    return;
  }

  textBox.style.display = "none";

  document.querySelector(".docs-chat-edit-container").style.height = "350px";

  function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }

  function sendChat(chat) {
    textBox.value = chat;
    var event = new CustomEvent('keydown');
    event.keyCode = 13;
    textBox.dispatchEvent(event);
  }

  var chatOptions = htmlToElement(`
    <div>
    <div id='chat-options'>
      <div class="options-tab" id='programmer-options'>
        <button>🏁 Programmer is done with the task.</button>
      </div>

      <div class="options-tab" id='extended-programmer-options' style="display: none;">
        <button>⛔️ Code seems incorrect</button>
        <button>⚠️ Code seems poorly designed</button>
        <button>⚠️ Code seems inefficient</button>
        <button>🤔 I don’t understand</button>
        <button>😀 Thanks, good idea!</button>
        <button>🏁 Programmer is done with the task.</button>
      </div>

      <div class="options-tab" id='synthesizer-options' style="display: none;">
        <button>I have nothing to do, just keep going!</button>
        <button>❓Please add another example</button>
        <button>❓Please write more code</button>
        <button>🤔 I don’t understand</button>
        <button>😀 Thanks, good idea!</button>
        <button>⏱ Please wait, still thinking...</button>
        <button>✅ Assistant is done, Programmer's turn</button>
        <button>🏁 Assistant is done with the task.</button>
      </div>

      <div class="options-tab" id='moderator-options' style="display: none;">
        <button>▶️ New task starting</button>
        <button>Task is complete.</button>
        <button>✅ Programmer is done, Assistant's turn</button>
        <button>🏁 Programmer is done with the task.</button>
      </div>

    </div>

    <div id="mode-switcher">
      <a class="active" id='show-programmer-options' href="#" data-tab="programmer-options">Simple User</a>
      <a id='show-extended-programmer-options' href="#" data-tab="extended-programmer-options" >Extended User</a>
      <a id='show-synthesizer-options' href="#" data-tab="synthesizer-options">Synthesizer</a>
      <a id='show-synthesizer-options' href="#" data-tab="moderator-options">Moderator</a>
    </div>
    </div>
  `
  )

  textBox.parentElement.appendChild(chatOptions)

  document.querySelectorAll('#chat-options button').forEach(button => {
    button.addEventListener("click", () => {
      let message = `${button.textContent}\n(${new Date(Date.now()).toLocaleTimeString()})`
      sendChat(message)
    });
  })

  document.querySelectorAll('#mode-switcher a').forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".options-tab").forEach(div => div.style.display = "none" )
      let targetId = link.getAttribute("data-tab")
      document.getElementById(targetId).style.display = "block";
    });
  });

  document.body.appendChild(
    htmlToElement(`
      <style>
        #chat-options {
          width: 100%;
          padding: 10px;
          background-color: white;
          border-top: solid 2px #ddd;
        }

        #chat-options button {
          display: block;
          border-radius: 5px;
          padding: 2px 7px;
          font-size: 14px;
          margin: 5px;
        }

        #chat-options button:hover {
          background-color: #ddd;
          cursor: pointer;
        }

        #mode-switcher {
          border-top: solid thin #ddd;
          padding: 5px;
        }

        #mode-switcher a {
          color: #aaa;
          font-size: 12px;
          margin-right: 10px;
        }
      </style>`))

}

onDomReady(setup)

