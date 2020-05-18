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
      <div id='programmer-options'>
        <button>✅ Programmer is done, Assistant's turn</button>
        <button>🏁 I think we're done.</button>
      </div>

      <div id='extended-programmer-options' style="display: none;">
        <button>⛔️ Code seems incorrect</button>
        <button>⚠️ Code seems poorly designed</button>
        <button>⚠️ Code seems inefficient</button>
        <button>🤔 I don’t understand</button>
        <button>😀 Thanks, good idea!</button>
        <button>✅ Programmer is done, Assistant's turn</button>
        <button>🏁 I think we're done.</button>
      </div>

      <div id='synthesizer-options' style="display: none;">
        <button>❓Please add another example</button>
        <button>❓Please write more code</button>
        <button>🤔 I'm having trouble, can you check our work up to this point?</button>
        <button>😀 Thanks, good idea!</button>
        <button>⏱ Please wait, still thinking...</button>
        <button>✅ Assistant is done, Programmer's turn</button>
        <button>🏁 I think we're done.</button>
      </div>

    </div>

    <div id="mode-switcher">
      <a class="active" id='show-programmer-options' href="#" >Simple User</a>
      <a id='show-extended-programmer-options' href="#" >Extended User</a>
      <a id='show-synthesizer-options' href="#">Synthesizer</a>
    </div>
    </div>
  `
  )

  textBox.parentElement.appendChild(chatOptions)

  document.querySelectorAll('#chat-options button').forEach(button => {
    button.addEventListener("click", () => { sendChat(button.textContent) });
  })

  document.querySelector('#show-synthesizer-options').addEventListener("click", () => {
    document.querySelector("#programmer-options").style.display = "none";
    document.querySelector("#extended-programmer-options").style.display = "none";
    document.querySelector("#synthesizer-options").style.display = "block";
  });

  document.querySelector('#show-extended-programmer-options').addEventListener("click", () => {
    document.querySelector("#programmer-options").style.display = "none";
    document.querySelector("#synthesizer-options").style.display = "none";
    document.querySelector("#extended-programmer-options").style.display = "block";
  });

  document.querySelector('#show-programmer-options').addEventListener("click", () => {
    document.querySelector("#synthesizer-options").style.display = "none";
    document.querySelector("#extended-programmer-options").style.display = "none";
    document.querySelector("#programmer-options").style.display = "block";
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

