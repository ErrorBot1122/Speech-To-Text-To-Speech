/* Vars */

let autoTalk = true;
let autoTalkDelay = 3000

let lastSttText = "";
let lang = navigator.lang || "en-US";

let ttsSpeak = window.speechSynthesis;
let ttsUtter = new SpeechSynthesisUtterance();
let sttRec = new webkitSpeechRecognition() || new SpeechRecognition();

let recordToggle = false;
let speechToggle = false;
let isSpeaking = false;

let sttTextP;
let startSttRecBtn;

let ttsSpeakVoice;
let startTtsSpeakBtn;


/* Functions */

function setup() {
  noCanvas();
  
  startSttRecBtn = createButton("Start Recording");
  startTtsSpeakBtn = createButton("Start Speaking");
  sttTextP = createP();
  
  startTtsSpeakBtn.hide()
  
  startSttRecBtn.mouseClicked(toggleRecording);
  startTtsSpeakBtn.mouseClicked(toggleSpeech);
  
  sttRec.onresult = gotSpeech;
}

function lastSttTextChanged() {
  sttTextP.html(lastSttText);
  
  startTtsSpeakBtn.show();
  
  if (autoTalk && !isSpeaking) {
    toggleRecording(null, false);
    
    setTimeout(() => toggleSpeech(null, true), autoTalkDelay);
  }
}

function gotSpeech(event) {
  if (event.isTrusted) {
    lastSttText = event.results[0][0].transcript;
    
    lastSttTextChanged();
  }
}

function toggleRecording(e, bool = !recordToggle, record = true) {
  recordToggle = bool;
  
  if (recordToggle) {
    sttRec.start();
    
    startTtsSpeakBtn.show();
        
    startSttRecBtn.html("Stop Recording");
  } else {
    
    sttRec.stop();
    
    if (text == "" || text == null) {
      startTtsSpeakBtn.hide()
    }
    
    if (!record) {      
      toggleSpeech(null, false);
    }
    
    startSttRecBtn.html("Start Recording");    
  }
}

function toggleSpeech(e, bool = !speechToggle) {
  speechToggle = bool;
  
  if (speechToggle) {
    ttsUtter.text = lastSttText;
    
    ttsSpeak.speak(ttsUtter);
    
    startTtsSpeakBtn.html("Stop Speaking");
  } else {
    ttsSpeak.cancel();
    
    startTtsSpeakBtn.html("Start Speaking");    
  }
}

function draw() {
  background(220);
}


/* Events */

ttsUtter.onstart = function() {
  isSpeaking = true;
  
  toggleRecording(null, false);
}

ttsUtter.onend = function() {
  isSpeaking = false;
}