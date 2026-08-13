const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");

const terminalScreen = document.getElementById("terminal-screen");
const terminal = document.getElementById("terminal");

const inputLine = document.getElementById("input-line");
const userInput = document.getElementById("user-input");

const errorPopup = document.getElementById("error-popup");

const typingSound = document.getElementById("typing-sound");
const ambienceSound = document.getElementById("ambience-sound");
const beepSound = document.getElementById("beep-sound");


/* =========================================
   BOOT SEQUENCE
   ========================================= */

const bootSequence = [

    {
        text: "WELCOME_SURVEY v1.0.0.0",
        delay: 1000
    },

    {
        text: "",
        delay: 1000
    },

    {
        text: "Welcome!",
        delay: 1000
    },

    {
        text: "",
        delay: 1500
    },


    /* SURVEY ENVIRONMENT */

    {
        text: "Initializing Survey Environment...",
        delay: 4000,
        beep: true
    },

    {
        text: "Establishing Secure Connection...",
        delay: 6000,
        beep: true
    },

    {
        text: "Verifying User Clearance...",
        delay: 5000,
        beep: true
    },


    /* MODULES */

    {
        text: "Loading Survey Modules...",
        delay: 4500,
        beep: true
    },

    {
        text: "    [MODULE_01] .................. OK",
        delay: 3000,
        beep: true
    },

    {
        text: "    [MODULE_02] .................. OK",
        delay: 4000,
        beep: true
    },

    {
        text: "    [MODULE_03] .................. OK",
        delay: 3500,
        beep: true
    },


    {
        text: "",
        delay: 1500
    },


    /* CONFIGURATION */

    {
        text: "Retrieving Survey Configuration...",
        delay: 5000,
        beep: true
    },

    {
        text: "    [CONFIG_A1] .................. OK",
        delay: 3500,
        beep: true
    },

    {
        text: "    [CONFIG_B7] .................. OK",
        delay: 4500,
        beep: true
    },

    {
        text: "    [CONFIG_C3] .................. OK",
        delay: 3000,
        beep: true
    },


    {
        text: "",
        delay: 1500
    },


    /* SYSTEM DIAGNOSTICS */

    {
        text: "Running System Diagnostics...",
        delay: 6000,
        beep: true
    },

    {
        text: "    [SYS_CHECK_01] ............... OK",
        delay: 4000,
        beep: true
    },

    {
        text: "    [SYS_CHECK_02] ............... OK",
        delay: 5000,
        beep: true
    },

    {
        text: "    [SYS_CHECK_03] ............... OK",
        delay: 3500,
        beep: true
    },


    {
        text: "",
        delay: 1500
    },


    /* FINALIZATION */

    {
        text: "Diagnostics complete.",
        delay: 3000
    },

    {
        text: "All systems nominal.",
        delay: 3500
    },

    {
        text: "",
        delay: 2000
    },

    {
        text: "WELCOME_SURVEY LOADING: FINISHED",
        delay: 3000,
        beep: true
    },

    {
        text: "",
        delay: 1500
    },

    {
        text: "BEGIN?",
        delay: 2000
    },

    {
        text: "Y/N",
        delay: 500
    }

];


/* =========================================
   WAIT FUNCTION
   ========================================= */

function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* =========================================
   TYPING SOUND
   ========================================= */

async function typeLine(text) {

    /*
        Start typing sound.
    */

    typingSound.currentTime = 0;

    typingSound.volume = 0.35;

    typingSound.play().catch(() => {});


    /*
        Type the text one character
        at a time.
    */

    for (let character of text) {

        terminal.textContent += character;

        await wait(18);

    }


    /*
        Stop typing sound.
    */

    typingSound.pause();

    typingSound.currentTime = 0;


    terminal.textContent += "\n";

}


/* =========================================
   BEEP
   ========================================= */

function playBeep() {

    beepSound.currentTime = 0;

    beepSound.volume = 0.55;

    beepSound.play().catch(() => {});

}


/* =========================================
   RUN BOOT SEQUENCE
   ========================================= */

async function runBootSequence() {

    for (let line of bootSequence) {

        await wait(line.delay);

        await typeLine(line.text);


        /*
            Only play the beep when
            the line specifically
            requests one.
        */

        if (line.beep) {

            playBeep();

        }

    }


    showInput();

}


/* =========================================
   SHOW Y/N INPUT
   ========================================= */

function showInput() {

    inputLine.style.display = "block";

    terminal.appendChild(inputLine);

    userInput.focus();

    userInput.addEventListener(
        "keydown",
        handleInput
    );

}


/* =========================================
   HANDLE Y/N
   ========================================= */

async function handleInput(event) {

    if (event.key !== "Enter") {

        return;

    }


    const answer =
        userInput.value.toUpperCase();


    /* =========================
       YES
       ========================= */

    if (answer === "Y") {

        userInput.disabled = true;

        terminal.textContent +=
            "\n> Y\n\n";

        terminal.textContent +=
            "WELCOME_SURVEY INITIALIZING...\n";

        /*
            ACTUAL SURVEY WILL GO HERE.
        */

    }


    /* =========================
       NO
       ========================= */

    else if (answer === "N") {

        userInput.disabled = true;

        terminal.textContent +=
            "\n> N\n\n";


        await wait(1000);


        terminal.textContent +=
            "ABORTING WELCOME_SURVEY...\n";


        await wait(1500);


        terminal.textContent +=
            "ERROR.\n";


        await wait(1000);


        errorPopup.style.display = "block";

    }


    /* =========================
       INVALID INPUT
       ========================= */

    else {

        userInput.value = "";

    }

}


/* =========================================
   INITIAL BEGIN BUTTON
   ========================================= */

startButton.addEventListener(
    "click",
    async function() {

        /*
            Hide initial screen.
        */

        startScreen.style.display = "none";


        /*
            Show terminal.
        */

        terminalScreen.style.display = "block";


        /*
            Start background ambience.

            Because this happens as a
            direct result of the player's
            click, browsers should allow it.
        */

        ambienceSound.volume = 0.15;

        ambienceSound.play().catch(() => {});


        /*
            Begin the boot sequence.
        */

        runBootSequence();

    }
);
