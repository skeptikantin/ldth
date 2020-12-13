// Populate this area to include info etc.

PennController.ResetPrefix(null)
PennController.DebugOff();

// Define the sequence of blocks in the trial
Sequence("intro",
    "instructions",
    randomize("training"),
    "intermission",
    sepWithN( "break" , randomize("experiment") , 24),
    "debrief",
    SendResults(),
    "goodbye")

// Header at the beginning of each trial
Header(
    // use global variable element to store participants' name
    newVar("ParticipantName")
        .global()
    ,
    // delay of 500ms before every trial
    newTimer(500)
        .start()
        .wait()
)
// Log the participant
//.log("Name", getVar("ParticipantName"))
.log("ParticipantID", PennController.GetURLParameter("participant") );


newTrial("intro",

    newText("<p>Welcome!</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p><strong>Informed Consent</strong>:</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p><strong>Voluntary participation:</strong> I understand that my participation in this study is voluntary.<br/>" +
        "<strong>Withdrawal:</strong> I can withdraw my participation at any time during the experiment.<br/>"+
        "<strong>Risks:</strong> There are no risks involved.<br/>"+
        "<strong>Equipment:</strong> I am participating from a device with a <strong>physical keyboard</strong>.<br/>"+
        "<strong>Environment:</strong> I participate from a quiet environment and can work uninterrupted.</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p>By hitting SPACE I consent to the above.")
        .css("font-family", "Verdana")
        .print()
    ,
    newKey(" ")
        .log()
        .once()
        .wait()
)

newTrial("instructions",

    newText("<p><strong>The word decision task</strong></p>")
        .css("font-size", "1.2em")
        .print()
    ,
    newText("<p>In this experiment, your task is to decide<br/>"+
        "whether the word on the screen is a word of English or not.<br/></p>" +
        "<p>Please respond as quickly, but as accurately as possible.</p>" +
        "<p>Press the <b>J</b> key if <strong>the word is a word</strong> (think J resembles 'yes')<br/>and the <b>F</b> key if <strong>it is not a word</strong> (think F = 'false').</p>")
        .print()
    ,
    newText("<p>Please place your index fingers on the J and F keys, respectively,<br>and press SPACE when you are ready to begin the training phase.</p>")
        .print()
   ,
    newKey(" ")
    .log()
    .once()
    .wait()

)

Template("training.csv", row =>
    newTrial("training",

        // set up a timer so there is a x ms break between trials
        newTimer(500)
            .start()
            .wait()
        ,
        // Blank line
        newText("<p> </p>")
        ,

        // Show item
        newText("Item", row.Word)
            .css("font-size", "1.5em")
            .css("font-family", "Verdana")
            .center()
            .print()
            .log()
        ,
        // Set up response buttons
        newKey("key", "FJ")
            .log()
            .once()
            .wait()
        ,
        getKey("key")
            .test.pressed(row.Corr)
            .success(newText("success", "<p>Correct!</p>").css("font-color", "green").center().print())
            .failure(newText("failure", "<p>Incorrect!</p>").css("font-color", "red").center().print())
        ,
        newTimer(500)
            .start()
            .wait()
    )
// log info
        .log("Word", row.Word)
        .log("Cond", row.Cond)
        .log("Frequency", row.Frequency)
        .log("Condition", row.Condition)
        .log("LengthWord", row.LengthWord)
        .log("Group", row.Group)
        .log("Corr", row.Corr)
)

newTrial("intermission",
    newText("<p>Well done, you should be good to go.<br/>" +
    "Remember: try to be as quick and as accurate as possible.</p>" +
    "<p>(<strong>F = false, not a word</strong> and <strong>J = yes, word</strong>)</p>" +
    "<p>You are now going to do the same for 48 more words.<br/>(No feedback will be given.)</p>"+
    "<p>The experiment will pause after every 24 words,<br/>" +
    "at which point you are welcome to take a break if you want.</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<p>Please place your index fingers on the F and J keys, respectively,<br/>and press SPACE when you are ready to start the main experiment.</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newKey(" ")
        .log()
        .once()
        .wait()
)

Template("main.csv", row =>
    newTrial("experiment",

        // set up a timer so there is a x ms break between trials
        newTimer(500)
            .start()
            .wait()
        ,
        // Show item
        newText("Item", row.Word)
            .css("font-size", "1.5em")
            .css("font-family", "Verdana")
            .center()
            .print()
            .log()
        ,
        // set up the response buttons
        newKey("FJ")
            .log()
            .once()
            .wait()
     )
        .log("Word", row.Word)
        .log("Cond", row.Cond)
        .log("Frequency", row.Frequency)
        .log("Condition", row.Condition)
        .log("LengthWord", row.LengthWord)
        .log("Group", row.Group)
        .log("Corr", row.Corr)
    ,
    newTrial("break",

        newText("<p>Well done, you've earned a little rest if you want.</p>" +
            "Press SPACE to continue.")
            .css("font-family", "Verdana")
            .print()
        ,
        newKey(" ")
            .log()
            .wait()
    )
)

newTrial("debrief",

    newText("<p>That's (almost) it, thank you!</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .print()
    ,

    newText("<p>Please indicate your handedness (voluntary, but helpful for interpreting results):</p>")
        .css("font-family", "Verdana")
        .print()
    ,
    newScale("handedness", "right-handed", "left-handed", "no dominant hand", "rather not say")
        .css("font-family", "Verdana")
        .settings.vertical()
        .print()
        .log()
    ,
    newButton("send", "Send results & proceed to verification link")
        .size(300)
        .center()
        .print()
        .wait()
)

// now send results before the good-bye and validation message
SendResults()

newTrial("goodbye",
    newText("<p>Thank you very much for your time and effort!</p>")
        .css("font-size", "1.2em")
        .css("font-family", "Verdana")
        .print()
    ,
    newText("<strong><a href='https://app.prolific.co/submissions/complete?cc=878EA3AF'>Click here to return to Prolific to validate your participation.</a></strong>")
        .css("font-size", "1em")
        .print()
    ,
    newText("<p><br/>You can contact the corresponding researcher <a href='https://www.sfla.ch/' target='_blank'>here</a> (opens new tab).</p>")
        .css("font-size", ".8em")
        .print()
    ,
    newButton("void")
        .wait()
) // the good-bye message

// Define additional functions:
    .setOption( "countsForProgressBar" , false )
// Make sure the progress bar is full upon reaching this last (non-)trial

// Function to include a break after N trials
function SepWithN(sep, main, n) {
    this.args = [sep,main];

    this.run = function(arrays) {
        assert(arrays.length == 2, "Wrong number of arguments (or bad argument) to SepWithN");
        assert(parseInt(n) > 0, "N must be a positive number");
        let sep = arrays[0];
        let main = arrays[1];

        if (main.length <= 1)
            return main
        else {
            let newArray = [];
            while (main.length){
                for (let i = 0; i < n && main.length>0; i++)
                    newArray.push(main.pop());
                for (let j = 0; j < sep.length; ++j)
                    newArray.push(sep[j]);
            }
            return newArray;
        }
    }
}
function sepWithN(sep, main, n) { return new SepWithN(sep, main, n); }

_AddStandardCommands(function(PennEngine){
    this.test = {
        passed: function(){
            return !PennEngine.controllers.running.utils.valuesForNextElement ||
                !PennEngine.controllers.running.utils.valuesForNextElement.failed
        }
    }
});