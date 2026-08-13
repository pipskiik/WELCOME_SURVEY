/* =========================================
   ELEMENTS
   ========================================= */

const boot = document.getElementById("boot");
const answer = document.getElementById("answer");
const cursor = document.getElementById("cursor");

const loading = document.getElementById("loading");
const survey = document.getElementById("survey");

const startupAudio = document.getElementById("startupAudio");


/* =========================================
   INPUT
   ========================================= */

let inputLocked = false;

document.addEventListener("keydown", function(event) {

    if (inputLocked) {
        return;
    }

    const key = event.key.toLowerCase();


    /* =====================================
       Y = BEGIN
       ===================================== */

    if (key === "y") {

        inputLocked = true;

        answer.textContent = "Y";

        cursor.style.display = "none";

        setTimeout(() => {
            beginSurvey();
        }, 500);
    }


    /* =====================================
       N = DON'T BEGIN
       ===================================== */

    else if (key === "n") {

        inputLocked = true;

        answer.textContent = "N";

        cursor.style.display = "none";

        setTimeout(() => {
            noResponse();
        }, 500);
    }

});


/* =========================================
   BEGIN SURVEY
   ========================================= */

function beginSurvey() {

    /*
        The audio starts HERE.

        Since this function was triggered by
        the user's Y key press, the browser
        should allow the audio to play.
    */

    startupAudio.currentTime = 0;

    startupAudio.play().catch(error => {
        console.log("Audio could not start:", error);
    });


    /* Hide boot */

    boot.style.display = "none";


    /* Show loading */

    loading.style.display = "block";


    /* Begin loading sequence */

    runLoadingSequence();
}


/* =========================================
   LOADING SEQUENCE
   ========================================= */

const loadingMessages = [
    "INITIALIZING WELCOME_SURVEY...",
    "LOADING SYSTEM...",
    "CHECKING MEMORY...",
    "CONNECTING...",
    "ESTABLISHING USER SESSION...",
    "LOADING SURVEY DATA...",
    "PLEASE WAIT..."
];


function runLoadingSequence() {

    let index = 0;


    function nextMessage() {

        if (index >= loadingMessages.length) {

            setTimeout(() => {

                loading.style.display = "none";

                survey.style.display = "block";

                startSurvey();

            }, 800);

            return;
        }


        loading.textContent +=
            loadingMessages[index] + "\n";

        index++;


        setTimeout(nextMessage, 500);
    }


    nextMessage();
}


/* =========================================
   MAIN SURVEY
   ========================================= */

function startSurvey() {

    survey.innerHTML = `
WELCOME_SURVEY

--------------------------------

CONNECTION ESTABLISHED.

WELCOME, USER.

YOUR PARTICIPATION IS REQUIRED.

--------------------------------
`;

    /*
        The rest of the survey will go here.
    */
}


/* =========================================
   N RESPONSE
   ========================================= */

function noResponse() {

    boot.innerHTML = `
WELCOME_SURVEY

BEGIN?

N

...
`;


    setTimeout(() => {

        boot.innerHTML +=
            "THAT IS NOT AN ACCEPTABLE RESPONSE.";

    }, 1500);
}
