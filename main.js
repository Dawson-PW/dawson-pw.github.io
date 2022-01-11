
/////////////////////////////////

//Disable the individual controls at the start of the program, as no cues exist and none are selected.
IndividualControlDisable();

////////////////////////////////////////////
///INITIALISATION SECTION

//Create default values for when new cues are created and added to the main array system.
var Default_Status = "WAITING";
var Default_Volume = 1;
var Default_Pan = 0;
var Default_Output = 1;
var Default_Option = "WAIT";
var Default_CurrentPosition = "00:00:00"

//Def the counters we will need
var CurrentCue = 0;
var TotalAmountOfCues = 0;

var CueSettingsSelector = 0;
/////////

//setup the main cue array (used as a 2D array)
var CueArray = [];

//secondary cue array
var CueArray2 = [];

//blobs from audio directory load
var blobs;

//////////////////////////////////////////////


//check the width and other factors to see if this device is suitable to run GoCue, if it isn't redirect.
let width = window.innerWidth;
if (width < 800) {
    window.location.replace('/noentry.html');
} else if (screen.availHeight > screen.availWidth){
    window.location.replace('/noentry.html');
}

//////

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = 'Make sure you have saved your cue list if you want to be able to access it again.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});

//////

off_cuesettings()

///////////////////////////////////////////////
//SETUP FUNCTIONS

//counter,type,length,description,active,current
function CreateCueBox(type,counter,FileName,Duration,Option) {
    starthere_appender = document.getElementById("cue_list");

    var cuediv = document.createElement("div");
    cuediv.className="cue_div";
    cuediv.id="cue_"+String(counter);
    starthere_appender.appendChild(cuediv);

    //////////////////////////////////////////

    maincuediv_appender = document.getElementById("cue_"+counter)

    ////////////////////////////////

    var cueselector = document.createElement("button");
    cueselector.style="width: 6%; background-color: transparent; border: none; margin: 0px;";
    cueselector.id="cueselector_"+String(counter)
    cueselector.setAttribute('onclick', 'ChangeCueSelector('+counter+')');
    maincuediv_appender.appendChild(cueselector);
    ///////////

    cueselector_appender = document.getElementById("cueselector_"+String(counter));
    
    ///////////

    var cueselector_inner = document.createElement("div");
    cueselector_inner.className="cue_info";
    cueselector_inner.id="cueselectorinner_"+String(counter);
    cueselector_appender.appendChild(cueselector_inner);

    //////

    cueselector_inner_appender = document.getElementById("cueselectorinner_"+String(counter));

    ////

    var cueselectorimage = document.createElement("img");
    cueselectorimage.src = "../BLANK.png";
    cueselectorimage.style = "width:3.15vw;height:3.15vw;";
    cueselectorimage.id = "cueselectorimage_"+String(counter)
    cueselector_inner_appender.appendChild(cueselectorimage);

    /////////////////////////

    cuebutton_outer = document.createElement("button");
    cuebutton_outer.style = "width: 88%; background-color: #218f9e;";
    cuebutton_outer.id = "cuebutton_outer_"+String(counter);
    cuebutton_outer.setAttribute('onclick', "cuebuttonclicked("+counter+")");
    maincuediv_appender.appendChild(cuebutton_outer);

    /////
    cuebutton_appender = document.getElementById("cuebutton_outer_"+String(counter))

    /////

    cuename = document.createElement("div");
    cuename.className = "cue_name";
    cuename.id = "cue_name_id_"+String(counter);
    cuebutton_appender.appendChild(cuename);

    ////

    cuename_appender = document.getElementById("cue_name_id_"+String(counter));

    ///

    cuenametext = document.createElement("P");
    cuenametext.id = "cue_name_text_id_"+counter;
    cuenametext_text = document.createTextNode(String(FileName));
    cuenametext.appendChild(cuenametext_text);
    cuename_appender.appendChild(cuenametext);



    //////////////////////////////////////////

    cueduration = document.createElement("div");
    cueduration.className = "cue_duration";
    cueduration.id = "cue_duration_id_"+String(counter);
    cuebutton_appender.appendChild(cueduration);

    ////

    cueduration_appender = document.getElementById("cue_duration_id_"+String(counter));

    ///

    cuedurationtext = document.createElement("P");
    cuedurationtext.id = "cue_duration_text_id_"+String(counter);
    cuedurationtext.style = "text-align: right;";
    cuedurationtext_text = document.createTextNode(Duration);
    cuedurationtext.appendChild(cuedurationtext_text);
    cueduration_appender.appendChild(cuedurationtext);





    //////////////////////////////////////////

    cueicon = document.createElement("div");
    cueicon.className = "cue_icon";
    cueicon.id = "cue_icon_id_"+String(counter);
    cuebutton_appender.appendChild(cueicon);

    ////

    cueicon_appender = document.getElementById("cue_icon_id_"+String(counter));

    ///

    var cueiconimage = document.createElement("img");

    //check to see if this is an audio cue or a note cue
    if (type=="AUDIO") {
        cueiconimage.src = "../SPEAKER.png";
    } else if (type=="NOTE") {
        cueiconimage.src = "../NOTE.png";
    }
    
    cueiconimage.style = "width:3.15vw;height:3.15vw;";
    cueicon_appender.appendChild(cueiconimage);



    //////////////////////////////////////////

    cueicon2 = document.createElement("div");
    cueicon2.className = "cue_icon_2";
    cueicon2.id = "cue_icon_2_id_"+String(counter);
    cuebutton_appender.appendChild(cueicon2);

    ////

    cueicon2_appender = document.getElementById("cue_icon_2_id_"+String(counter));

    ///

    var cueicon2image = document.createElement("img");
    cueicon2image.id = "cue_icon_2_image_id_"+String(counter);

    //check to see if this is PLAY, FOLLOW or WAIT
    if (Option=="PLAY") {
        cueicon2image.src = "../PLAY_ICON.png";
    } else if (Option=="FOLLOW") {
        cueicon2image.src = "../FOLLOW_ICON.png";
    } else if (Option=="WAIT") {
        cueicon2image.src = "../WAIT_ICON.png";
    }

    cueicon2image.style = "width:3.15vw;height:3.15vw;";
    cueicon2_appender.appendChild(cueicon2image);

    ////////////////////////////////////

    ////////////////////////////////

    var cuesettings = document.createElement("button");
    cuesettings.style="width: 6%; background-color: #218f9e; margin: 0px;";
    cuesettings.id="cuesettings_"+String(counter)
    cuesettings.setAttribute('onclick', 'ChangeCueSettings('+counter+')');
    maincuediv_appender.appendChild(cuesettings);
    ///////////

    cuesettings_appender = document.getElementById("cuesettings_"+String(counter));
    
    ///////////

    var cuesettings_inner = document.createElement("div");
    cuesettings_inner.className="cue_settings";
    cuesettings_inner.id="cuesettingsinner_"+String(counter);
    cuesettings_appender.appendChild(cuesettings_inner);

    //////

    cuesettings_inner_appender = document.getElementById("cuesettingsinner_"+String(counter));

    ////

    var cuesettingsimage = document.createElement("img");
    cuesettingsimage.src = "../SETTINGS_ICON.png";
    cuesettingsimage.style = "width:3.15vw;height:3.15vw;";
    cuesettingsimage.id = "cueselectorimage_"+String(counter)
    cuesettings_inner_appender.appendChild(cuesettingsimage);
};
///////////////////////////////////////////////////////////////
//the first thing to happen is user is presented with a screen saying that they need to select a directory for files
directoryselector_on()

//Code that gets activated when new cue added
function addnewcue(cueinfo) {
    //cueinfo is the blob specific for the cue added
    console.log("NEW CUE ADDED...");

    //add one to the total cue counter because a new cue has been added
    TotalAmountOfCues++;

    //update the counter in the corner of the screen
    document.getElementById("totalcue_display").innerHTML = TotalAmountOfCues+" cues";


    const AudioLocation = URL.createObjectURL(cueinfo);
    const FileName = cueinfo.name;

    console.log("=========")
    console.log("AUDIOLOCATION=");
    console.log(AudioLocation)
    console.log("=========")

    //////////////
    //create a sound element for this cue
    var soundcue = document.createElement("AUDIO");

    soundcue.setAttribute("src",AudioLocation);
    
    soundcue.id = "audiocue_"+TotalAmountOfCues;
    //soundcue.removeAttribute("controls");
    //soundcue.setAttribute("preload","auto");
    document.body.appendChild(soundcue);

    /////////////////////////////////////////////////////////
    //CREATE THE ACTUAL AUDIO STUFF

    // for legacy browsers
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    const audioContext = new AudioContext();

    // get the audio element
    const audioElement = document.querySelector('#audiocue_'+TotalAmountOfCues);

    // pass it into the audio context
    const track = audioContext.createMediaElementSource(audioElement);

    window['gainNode_'+TotalAmountOfCues] = audioContext.createGain();

    //const volumeControl = document.querySelector('#volume');

    //volumeControl.addEventListener('input', function() {
    //    gainNode.gain.value = this.value;
    //}, false);

    const pannerOptions = { pan: 0 };
    window['panner_'+TotalAmountOfCues] = new StereoPannerNode(audioContext, pannerOptions);

    //const pannerControl = document.querySelector('#panner');

    //pannerControl.addEventListener('input', function() {
    //    panner.pan.value = this.value;
    //}, false);

    track.connect(window['gainNode_'+TotalAmountOfCues]).connect(window['panner_'+TotalAmountOfCues]).connect(audioContext.destination);
    
    ////////////////////////////////////////////////////////
    var UploadFile = document.getElementById('audiocue_'+String(TotalAmountOfCues));

    UploadFile.onloadedmetadata = function() {
        const FileDuration = UploadFile.duration;
        CueArray.push([Default_Status,"AUDIO",FileName,FileDuration,Default_Volume,Default_Pan,Default_Output,Default_Option,Default_CurrentPosition,AudioLocation]);
        console.log(CueArray[TotalAmountOfCues-1])

        //////////////////////////////////////
        TimeRemaining = FileDuration - UploadFile.currentTime;
        const TimeRemainingFormatted = ConvertTime(TimeRemaining);
        CueArray[TotalAmountOfCues-1][8] = TimeRemainingFormatted

        //create the actual graphical box
        CreateCueBox(CueArray[TotalAmountOfCues-1][1],TotalAmountOfCues,CueArray[TotalAmountOfCues-1][2],CueArray[TotalAmountOfCues-1][8],CueArray[TotalAmountOfCues-1][7],TotalAmountOfCues);


        if (TotalAmountOfCues==1) {
            CurrentCue=1;
        };
        
        ChangeCueSelector(CurrentCue)

        for (let a = 1; a < TotalAmountOfCues+1; a++) {
            //only do the following if it is a audio cue
            if (CueArray[a-1][1]=="AUDIO") {
                console.log("AUDIO CUE")
                window['timechecker_cue_'+a] = document.getElementById('audiocue_'+a);
                window['timechecker_cue_'+a].ontimeupdate = (event) => {
                    //console.log('The currentTime attribute has been updated for cue'+String(a));
    
                    TimeRemaining = CueArray[a-1][3] - window['timechecker_cue_'+a].currentTime;
                    const TimeRemainingFormatted = ConvertTime(TimeRemaining);
                    CueArray[a-1][8] = TimeRemainingFormatted

                    //check to see how long is left and if it is 0, check if this cue was was a FOLLOW
                    if (TimeRemaining==0) {
                        if (CueArray[a-1][7]=="FOLLOW") {
                            NextCueReturn = GoNextCue(CurrentCue,TotalAmountOfCues)
                            CurrentCue = NextCueReturn.CurrentCue;
                            TotalAmountOfCues = NextCueReturn.TotalAmountOfCues;
                        }
                    };
    
                    //update the time remaining
                    document.getElementById("cue_duration_text_id_"+a).childNodes[0].nodeValue = TimeRemainingFormatted;
                };
            };
        }

    };
};

/////////////////////////////////////////////////////////////
//document.addEventListener('keyup', event => {
//    if (event.code === 'Space') {
//       console.log("-------------------------------------------")
//        console.log("ATTEMPING TO PlAY CUE")
//        console.log("CUE "+CurrentCue)
//        console.log("TOTAL AMOUNT OF CUE "+TotalAmountOfCues)
//        console.log("===========================================")
//    
//        NextCueReturn = GoNextCue(CurrentCue,TotalAmountOfCues)
//        CurrentCue = NextCueReturn.CurrentCue;
//        TotalAmountOfCues = NextCueReturn.TotalAmountOfCues;
//    }
//})
/////////////////////////////////////////////////////

document.getElementById("go").addEventListener("click", function go() {
    console.log("-------------------------------------------")
    console.log("ATTEMPING TO PlAY CUE")
    console.log("CUE "+CurrentCue)
    console.log("TOTAL ARMOUNT OF CUE "+TotalAmountOfCues)
    console.log("===========================================")

    //we need to check to see if the cue was FOLLOW or WAIT
    //if WAIT is used, then do nothing
    //if FOLLOW is used then get the duration of the current cue, and after that time then play the next one

    cuestatus = CueArray[CurrentCue-1][7];
    cuelength = CueArray[CurrentCue-1][3];
    cuelength_ms = cuelength * 1000;

    //if (cuestatus=="FOLLOW") {
    //    setTimeout(() => {
    //        go()
    //    }, cuelength_ms);
    // };
    
    

    NextCueReturn = GoNextCue(CurrentCue,TotalAmountOfCues)
    CurrentCue = NextCueReturn.CurrentCue;
    TotalAmountOfCues = NextCueReturn.TotalAmountOfCues;
});

////////////////////////////
function ChangeCueSelector(Cue) {
    console.log("CHANGECUESELECTOR FUNC | CUE = "+Cue)
    
    //run a check to see if we've gone past all available cues
    if (Cue > TotalAmountOfCues) {
        console.log("END OF CUE LIST - CHANGECUESELECTOR FUNC")

        //make the cue pointer invisible
        try {
            for (var i = 1; i < Infinity; i++) {
                document.getElementById("cueselectorimage_"+String(i)).src = "../BLANK.png";
            } 
        } catch {
            return;
        }
        return;
    }

    for (var i = 1; i < Cue+1; i++) {
        document.getElementById("cueselectorimage_"+String(i)).src = "../BLANK.png";
    }

    document.getElementById("cueselectorimage_"+String(Cue)).src = "../CURRENT.png";

    try {
        for (var i = Cue+1; i < Infinity; i++) {
            document.getElementById("cueselectorimage_"+String(i)).src = "../BLANK.png";
        } 
    } catch {
        CurrentCue = Cue;
        return;
    }
}

///////////////////////////

function GoNextCue(CurrentCue,TotalAmountOfCues) {
    //check to see if we've gone past the last cue
    //if we have do nothing
    if (CurrentCue > TotalAmountOfCues) {
        console.log("END OF CUE LIST!");
        
        // return multiple values
        return {
            CurrentCue,
            TotalAmountOfCues
        };
    }

    //run a check to see if this is an audio or a note cue
    if (CueArray[CurrentCue-1][1]=="NOTE") {
        //dont need to try playing as its a note cue
        //move onto next cue
        CurrentCue++;

        //change the cue selector pointer while we're here
        ChangeCueSelector(CurrentCue,TotalAmountOfCues)

        // return multiple values
        return {
            CurrentCue,
            TotalAmountOfCues
        };
    }
    // get the audio element
    const audioElement = document.getElementById('audiocue_'+CurrentCue);

    //run a check to make sure it isn't already playing
    if (audioElement.paused != true) {
        console.log("already playing... skipping")
        // return multiple values
        return {
            CurrentCue,
            TotalAmountOfCues
        };
    }

    audioElement.play();

    //move onto next cue
    CurrentCue++;

    //change the cue selector pointer while we're here
    ChangeCueSelector(CurrentCue,TotalAmountOfCues)

    // return multiple values
    return {
        CurrentCue,
        TotalAmountOfCues
    };
}

////////////////////////////
function IndividualControlDisable() {
    document.getElementById("play").style.opacity="0.25";
    document.getElementById("pause").style.opacity="0.25";
    //document.getElementById("rewind").style.opacity="0.25";
    document.getElementById("stop").style.opacity="0.25";
}

function IndividualControlEnable() {
    document.getElementById("play").style.opacity="1";
    document.getElementById("pause").style.opacity="1";
    //document.getElementById("rewind").style.opacity="1";
    document.getElementById("stop").style.opacity="1";
}

////

function ConvertTime(seconds) {
    Formatted = new Date(seconds * 1000).toISOString().substr(11, 8);
    return Formatted;
}

///////////////////////////

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

///////////////////////

function on_cuesettings() {
    document.getElementById("cue_settings").style.display = "block";
}

function off_cuesettings() {
    document.getElementById("cue_settings").style.display = "none";
}

////////////////////////////////////////////////////////////////////////////
function AddNote() {
    on();

    document.getElementById("cancel_noteadd_overlay").addEventListener("click", function() {
        off();
        console.log("NO NOTE ADDED! - CANCEL PRESSED");
        return;
    });

    document.getElementById("accept_noteadd_overlay").addEventListener("click", function() {
        off()

        //before we continue, run a check of the length to see if the cancel was clicked or not
        if (document.getElementById('notecue_input').value.length == 0) {
            console.log("NO NOTE ADDED!");
            return;
        };

        var NoteMSG = document.getElementById('notecue_input').value;

        //add one to the total cue counter because a new cue has been added
        TotalAmountOfCues++;

        //update the counter in the corner of the screen
        document.getElementById("totalcue_display").innerHTML = TotalAmountOfCues+" cues";

        //////////////

        CueArray.push([Default_Status,"NOTE",NoteMSG,"00:00:00",Default_Volume,Default_Pan,Default_Output,Default_Option,Default_CurrentPosition]);

        //create the actual graphical box
        CreateCueBox(CueArray[TotalAmountOfCues-1][1],TotalAmountOfCues,CueArray[TotalAmountOfCues-1][2],CueArray[TotalAmountOfCues-1][8],CueArray[TotalAmountOfCues-1][7]);

        if (TotalAmountOfCues==1) {
            CurrentCue=1;
            console.log("FIRST CUE SO SETTING CURRENT CUE TRACKER TO 1 FROM 0")
        };
        
        ChangeCueSelector(CurrentCue,TotalAmountOfCues)

        //final thing is to reset the input
        document.getElementById('notecue_input').value = "";
    });

}


//////////////////////////////////

function cuebuttonclicked(cuenum) {
    IndividualControlEnable();

    document.getElementById('play').onclick = function() {
        // get the audio element
        const audioElement = document.getElementById('audiocue_'+cuenum);
        audioElement.play();

        IndividualControlDisable();
    }

    document.getElementById('pause').onclick = function() {
        const audioElement = document.getElementById('audiocue_'+cuenum);
        audioElement.pause();

        IndividualControlDisable();
    }

    //document.getElementById('rewind').onclick = function() {
    //    IndividualControlDisable();
    //}

    document.getElementById('stop').onclick = function() {
        // get the audio element
        const audioElement = document.getElementById('audiocue_'+cuenum);
        audioElement.pause();
        audioElement.currentTime = 0;

        IndividualControlDisable();
    }
};

function ChangeCueSettings(cue) {

    document.getElementById("volume").value = window['gainNode_'+cue].gain.value;

    document.getElementById("panner").value = window['panner_'+cue].pan.value;

    //check if it's follow or wait and set the buttons as appropriate
    if (CueArray[cue-1][7] == "WAIT") {
        waitbutton = document.getElementById("wait")
        waitbutton.style.backgroundImage = "url('WAITPRESSED.png')";

        followbutton = document.getElementById("follow")
        followbutton.style.backgroundImage = "url('FOLLOW.png')";
    } else if (CueArray[cue-1][7] == "FOLLOW") {
        waitbutton = document.getElementById("wait")
        waitbutton.style.backgroundImage = "url('WAIT.png')";

        followbutton = document.getElementById("follow")
        followbutton.style.backgroundImage = "url('FOLLOWPRESSED.png')";
    }

    console.log("OPENING CUE SETTINGS PAGE FOR CUE "+cue);
    on_cuesettings();
    //document.getElementById("cuename_input").value=CueArray[cue-1][2];
    CueSettingsSelector = cue;
}

document.getElementById("cuesettingsave").addEventListener("click", function() {
    //console.log("REPLACING EXISTING CUE NAME, WHICH WAS CUE "+cue+" - "+CueArray[cue-1])
   // CueArray[cue-1][2] = document.getElementById("cuename_input").value;
    //document.getElementById("cue_name_text_id_"+cue).childNodes[0].nodeValue = document.getElementById("cuename_input").value;

    // get the audio element
    window['gainNode_'+CueSettingsSelector].gain.value = document.getElementById("volume").value;
    console.log("SET VOLUME TO "+document.getElementById("volume").value)

    CueArray[CueSettingsSelector-1][4] = window['gainNode_'+CueSettingsSelector].gain.value;

    // get the audio element
    window['panner_'+CueSettingsSelector].pan.value = document.getElementById("panner").value;
    console.log("SET PAN TO "+document.getElementById("panner").value)

    CueArray[CueSettingsSelector-1][5] = window['panner_'+CueSettingsSelector].pan.value;
    
    //document.getElementById("volume").value="1";
    
    off_cuesettings();
    console.log("========")
});


////
function waitpressed_cuesettings() {
    waitbutton = document.getElementById("wait")
    waitbutton.style.backgroundImage = "url('WAITPRESSED.png')";

    followbutton = document.getElementById("follow")
    followbutton.style.backgroundImage = "url('FOLLOW.png')";

    CueArray[CueSettingsSelector-1][7] = "WAIT";

    cueimage = document.getElementById("cue_icon_2_image_id_"+String(CueSettingsSelector));
    cueimage.src = "WAIT_ICON.png";
}

function followpressed_cuesettings() {
    waitbutton = document.getElementById("wait")
    waitbutton.style.backgroundImage = "url('WAIT.png')";

    followbutton = document.getElementById("follow")
    followbutton.style.backgroundImage = "url('FOLLOWPRESSED.png')";

    CueArray[CueSettingsSelector-1][7] = "FOLLOW";

    cueimage = document.getElementById("cue_icon_2_image_id_"+String(CueSettingsSelector));
    cueimage.src = "FOLLOW_ICON.png";
}

///////////////////////////////////////////////////////////////////////////////////////////
////LOADING AND SAVING PRODUCTION

//SAVE
function saveproduction() {
    //gets to here is save button is pressed
    console.log("ABOUT TO ATTEMPT TO SAVE ARRAY TO FILE")

    var arraylength = CueArray.length;

    const now = new Date()
    
    jsonpasser = JSON.stringify(CueArray, null, ' ')

    //console.log(jsonpasser)

    var blob = new Blob([jsonpasser], { type: "application/json;charset=utf-8" });
    saveAs(blob, now.getTime()+".gocue");
};



////////////////////////////////
//LOAD
//the following is code for when load production button is pressed
const loadproductionfile = document.getElementById('load_production_file');
loadproductionfile.addEventListener('change', (event) => {

    console.log("LOAD PRODUCTION FILE BUTTON PRESSED")

    //before we continue, run a check of the length to see if the cancel was clicked or not
    if (document.getElementById('load_production_file').value.length == 0) {
        console.log("NO PRODUCTION FILE SELECTED!");
        return;
    };

    var producfilepath = document.getElementById('load_production_file').value;

    // get file extension
    const extension = producfilepath.split('.').pop();

    console.log(extension)
    if (extension != "gocue") {
        console.log("INCORRECT FILE EXTENSION... RETURNING...");
        return;
    }


    var file_to_read = document.getElementById("load_production_file").files[0];
    var fileread = new FileReader();
    fileread.onload = function(e) {
        //once loaded, put into array and make the cue boxes
        var content = e.target.result;
        var intern = JSON.parse(content); // parse json
        CueArray = intern;

        var arraylength2 = CueArray.length;

        for(let i = 1 ; i < arraylength2+1; i++) {
            CreateCueBox(CueArray[i-1][1],i,CueArray[i-1][2],CueArray[i-1][3],CueArray[i-1][7])

            //in order to get the actual audio location, we need to get the file name from the array 
            //we then search through the directory blobs until we find the index for the one that matches the filename
            //console.log("BLOBS!!")
            //console.log(blobs.name)
            //console.log("=========")
            console.log("TRYING TO FIND A FILE WITH FILENAME: "+CueArray[i-1][2])

            //for 

            var currentindexsearch = blobs.findIndex(item => item.name === CueArray[i-1][2])

            if (currentindexsearch == -1) {
                alert("ERROR! A file cannot be found. Please reload the page and ensure you selected the correct directory.");
                return;
            }

            console.log("CURRENT INDEX="+currentindexsearch)
            

            var AudioLocation = URL.createObjectURL(blobs[currentindexsearch]);

            console.log("=========")
            console.log("AUDIOLOCATION=");
            console.log(AudioLocation)
            console.log("=========")

            //////////////
            //create a sound element for this cue
            var soundcue = document.createElement("AUDIO");

            soundcue.setAttribute("src",AudioLocation);
            
            soundcue.id = "audiocue_"+i;
            //soundcue.removeAttribute("controls");
            //soundcue.setAttribute("preload","auto");
            document.body.appendChild(soundcue);

            /////////////////////////////////////////////////////////
            //CREATE THE ACTUAL AUDIO STUFF

            // for legacy browsers
            const AudioContext = window.AudioContext || window.webkitAudioContext;

            const audioContext = new AudioContext();

            // get the audio element
            const audioElement = document.querySelector('#audiocue_'+i);

            // pass it into the audio context
            const track = audioContext.createMediaElementSource(audioElement);

            window['gainNode_'+i] = audioContext.createGain();

            //const volumeControl = document.querySelector('#volume');

            //volumeControl.addEventListener('input', function() {
            //    gainNode.gain.value = this.value;
            //}, false);

            const pannerOptions = { pan: 0 };
            window['panner_'+i] = new StereoPannerNode(audioContext, pannerOptions);

            //const pannerControl = document.querySelector('#panner');

            //pannerControl.addEventListener('input', function() {
            //    panner.pan.value = this.value;
            //}, false);

            track.connect(window['gainNode_'+i]).connect(window['panner_'+i]).connect(audioContext.destination);
            
            ////////////////////////////////////////////////////////

            ////////////////////////////////////////////////////////
            var UploadFile = document.getElementById('audiocue_'+i);

            window['gainNode_'+i].gain.value = CueArray[i-1][4];
            window['panner_'+i].pan.value = CueArray[i-1][5];

            UploadFile.onloadedmetadata = function() {
                console.log("METADATA LOADED FOR CUE "+i)
                const FileDuration = UploadFile.duration;
                console.log("DURATION="+FileDuration)

                //////////////////////////////////////
                TimeRemaining = FileDuration - UploadFile.currentTime;

                //only do the following if it is a audio cue
                if (CueArray[i-1][1]=="AUDIO") {
                    console.log("AUDIO CUE")
                    window['timechecker_cue_'+i] = document.getElementById('audiocue_'+i);

                    var FileDuration2 = window['timechecker_cue_'+i].duration;

                    const TimeRemainingFormatted2 = ConvertTime(FileDuration2);
                    CueArray[i-1][8] = TimeRemainingFormatted2
                    //update the time remaining
                    document.getElementById("cue_duration_text_id_"+i).childNodes[0].nodeValue = TimeRemainingFormatted2;

                    window['timechecker_cue_'+i].ontimeupdate = (event) => {
        
                        TimeRemaining = CueArray[i-1][3] - window['timechecker_cue_'+i].currentTime;
                        const TimeRemainingFormatted = ConvertTime(TimeRemaining);
                        CueArray[i-1][8] = TimeRemainingFormatted
                        //console.log("TIME REMAINING FORMATTED= "+TimeRemainingFormatted)

                        //check to see how long is left and if it is 0, check if this cue was was a FOLLOW
                        if (TimeRemaining==0) {
                            if (CueArray[i-1][7]=="FOLLOW") {
                                NextCueReturn = GoNextCue(CurrentCue,TotalAmountOfCues)
                                CurrentCue = NextCueReturn.CurrentCue;
                                TotalAmountOfCues = NextCueReturn.TotalAmountOfCues;
                            }
                        };
        
                        //update the time remaining
                        document.getElementById("cue_duration_text_id_"+i).childNodes[0].nodeValue = TimeRemainingFormatted;
                    };
                };

            };

        };

        //update the counter in the corner of the screen
        document.getElementById("totalcue_display").innerHTML = arraylength2+" cues";

        console.log("DEV 9.1.22:")
        console.log(CueArray)

        CurrentCue=1
        TotalAmountOfCues = arraylength2;
        ChangeCueSelector(CurrentCue)

        console.log("END!")
    };
    fileread.readAsText(file_to_read);

});


///////////////////////////////////////////////////////////////////////////////////////

function directoryselector_on() {
    document.getElementById("directoryselectorscr").style.display = "block";
}

function directoryselector_off() {
    document.getElementById("directoryselectorscr").style.display = "none";
}

/////

function directoryselector2_on() {
    document.getElementById("directoryselector2scr").style.display = "block";
}

function directoryselector2_off() {
    document.getElementById("directoryselector2scr").style.display = "none";
}





function CreateBox(counter,name) {
    var starthere_appender = document.getElementById("fileselectorscr");
  
    var filediv = document.createElement("div");
    filediv.className="filesel_div";
    filediv.id="filesel_"+String(counter);
    starthere_appender.appendChild(filediv);
  
    //////////////////////////////////////////
  
    var mainfilediv_appender = document.getElementById("filesel_"+counter)
  
    /////////////////////////
    var counter2=counter+1
  
    var fileselbutton_outer = document.createElement("button");
    fileselbutton_outer.style = "width: 100%; background-color: #218f9e;";
    fileselbutton_outer.id = "fileselbutton_outer_"+String(counter);
    fileselbutton_outer.setAttribute('onclick', 'fileclicked('+counter+')');
    mainfilediv_appender.appendChild(fileselbutton_outer);
  
    /////
    var fileselbutton_appender = document.getElementById("fileselbutton_outer_"+String(counter))
    //document.getElementById("fileselbutton_outer_"+String(counter)).onclick='fileclicked('+counter+1+')';
    /////
  
    var fileselname = document.createElement("div");
    fileselname.className = "fileselector_name";
    fileselname.id = "filesel_name_id_"+String(counter);
    fileselbutton_appender.appendChild(fileselname);
  
    ////
  
    var fileselname_appender = document.getElementById("filesel_name_id_"+String(counter));
  
    ///
  
    var fileselnametext = document.createElement("P");
    fileselnametext.id = "cue_name_text_id_"+counter;
    var fileselnametext_text = document.createTextNode(String(name));
    fileselnametext.appendChild(fileselnametext_text);
    fileselname_appender.appendChild(fileselnametext);
};


function fileselector_on() {
    document.getElementById("fileselectorscr").style.display = "block";
}

function fileselector_off() {
    document.getElementById("fileselectorscr").style.display = "none";
}

document.getElementById("sound-upload-input").addEventListener("click", function() {
    fileselector_on()
});

function fileclicked(cuecount) {
    //gets to here when you click on a file in the file selector window after you open a directory
    //we want to add the file we click on into an audio cue and the CueArray

    //hide the file selector screen
    fileselector_off();

    //cuecount is the array index we clicked on - starts at 0
    addnewcue(blobs[cuecount]);
}