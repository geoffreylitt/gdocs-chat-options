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
    <div id='chat-options'>
      <div id='programmer-options'>

        <button>⛔️ Code seems incorrect</button>
        <button>⚠️ Code seems poorly designed</button>
        <button>⚠️ Code seems inefficient</button>
        <button>🤔 I don’t understand</button>
        <button>😀 Thanks, good idea!</button>
        <button>✅ I'm done, it's your turn</button>
        <button>🏁 I think we're done.</button>
        <div>
          <a id='show-synthesizer-options' href="#" style="font-size: 10px;">(Show synthesizer options)</a>
        </div>
      </div>

      <div id='synthesizer-options' style="display: none;">

        <h3>Synthesizer control panel</h3>

        <button>❓Please add another example</button>
        <button>❓Please write more code</button>
        <button>🤔 I'm having trouble, can you check our work up to this point?</button>
        <button>😀 Thanks, good idea!</button>
        <button>⏱ Please wait, still thinking...</button>
        <button>✅ I'm done, it's your turn</button>
        <button>🏁 I think we're done.</button>
        <div>
          <a id='show-programmer-options' href="#" style="font-size: 10px;">(Show user options)</a>
        </div>
      </div>
    </div>`
  )

  textBox.parentElement.appendChild(chatOptions)

  document.querySelectorAll('#chat-options button').forEach(button => {
    button.addEventListener("click", () => { sendChat(button.textContent) });
  })

  document.querySelector('#show-synthesizer-options').addEventListener("click", () => {
    document.querySelector("#programmer-options").style.display = "none";
    document.querySelector("#synthesizer-options").style.display = "block";
  });

  document.querySelector('#show-programmer-options').addEventListener("click", () => {
    document.querySelector("#synthesizer-options").style.display = "none";
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

        #show-synthesizer-options {
          color: #ccc;
        }
      </style>`))

}

onDomReady(setup)

