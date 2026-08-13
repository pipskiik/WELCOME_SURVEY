const terminal = document.getElementById("terminal");
const inputLine = document.getElementById("input-line");
const userInput = document.getElementById("user-input");
const errorPopup = document.getElementById("error-popup");


const bootSequence = [
    { text: "WELCOME_SURVEY v1.0.0.0", delay: 1000 },
    { text: "", delay: 500 },

    { text: "Welcome!", delay: 800 },
    { text: "", delay: 500 },

    { text: "Initializing Survey Environment...", delay: 700 },
    { text: "Establishing Secure Connection...", delay: 700 },
    { text: "Verifying User Clearance...", delay: 700 },
    { text: "Loading Survey Modules...", delay: 700 },

    { text: "    [MODULE_01] .................. OK", delay: 400 },
    { text: "    [MODULE_02] .................. OK", delay: 400 },
    { text: "    [MODULE_03] .................. OK", delay: 400 },

    { text: "", delay: 400 },

    { text: "Retrieving Survey Configuration...", delay: 700 },

    { text: "    [CONFIG_A1] .................. OK", delay: 400 },
    { text: "    [CONFIG_B7] .................. OK", delay: 400 },
    { text: "    [CONFIG_C3] .................. OK", delay: 400 },

    { text: "", delay: 400 },

    { text: "Running System Diagnostics...", delay: 700 },

    { text: "    [SYS_CHECK_01] ............... OK", delay: 400 },
    { text: "    [SYS_CHECK_02] ............... OK", delay: 400 },
    { text: "    [SYS_CHECK_03] ............... OK", delay: 400 },

    { text: "", delay: 400 },

    { text: "Diagnostics complete.", delay: 600 },
    { text: "All systems nominal.", delay: 600 },

    { text: "", delay: 800 },

    { text: "WELCOME_SURVEY LOADING: FINISHED", delay: 1000 },

    { text: "", delay: 500 },

    { text: "BEGIN?", delay: 500 },
    { text: "Y/N", delay: 0 }
];


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function typeLine(text) {

    for (let character of text) {
        terminal.textContent += character;

        await wait(15);
    }

    terminal.textContent += "\n";
}


async function runBootSequence() {

    for (let line of bootSequence) {

        await wait(line.delay);

        await typeLine(line.text);
    }

    showInput();
}


function showInput() {

    inputLine.style.display = "block";

    terminal.appendChild(inputLine);

    userInput.focus();

    userInput.addEventListener("keydown", handleInput);
}


async function handleInput(event) {

    if (event.key !== "Enter") {
        return;
    }

    const answer = userInput.value.toUpperCase();

    if (answer === "Y") {

        userInput.disabled = true;

        terminal.textContent += "\n> Y\n\n";
        terminal.textContent += "WELCOME_SURVEY INITIALIZING...\n";

        /*
        We'll put the actual survey here later.
        */

    }

    else if (answer === "N") {

        userInput.disabled = true;

        terminal.textContent += "\n> N\n\n";

        await wait(1000);

        terminal.textContent += "ABORTING WELCOME_SURVEY...\n";

        await wait(1500);

        terminal.textContent += "ERROR.\n";

        await wait(1000);

        errorPopup.style.display = "block";

    }

    else {

        userInput.value = "";

    }
}


runBootSequence();
