# GoCue  
![GoCue](https://github.com/Dawson-PW/dawson-pw.github.io/blob/master/Logolarge.png?raw=true)
 
Go Cue is an online and web-based theatre and live production audio cue playback system.  
This is a web-based application that has been tested on the latest version of Chrome on windows.

I would be delighted to hear your feedback on what you think could be improved, as everything is very new.

It is recommended that GoCue is run on Chrome due to us using a large amount of relatively new APIs and systems that aren't completely supported in all browsers yet. Please also ensure that your install of Chrome is up to date as it can be.

## Instructions  
When you launch GoCue, you will be presented with a button which asks you to pick a **directory** for where **all** of your audio cues are located. They must all be in the same folder to be able to access them later. It also can't be a folder on your device such as 'Documents' or 'Downloads' due to web permissions; it must be a subfolder.  
You will then likely be asked by your browser to accept the permission for GoCue to access the files in that folder; you must accept this for us to be able to access the files **in that folder** and that folder only, and be able to play them correctly.

Once you have added the directory, you will be presented with the main GoCue operating screen. This is where audio and note cues can be added, controlled and played, as well as changing settings for those cues.
  
In the bottom left corner there are two buttons, the add audio cue icon, and the add note cue icon:

#### Add Audio Cue  
![Add Audio Cue](https://github.com/Dawson-PW/dawson-pw.github.io/blob/master/AUDIO_ADD.png?raw=true)
When this button is clicked, it will present you with a list of all the files contained within the directory (folder) that you selected. To add an audio file to the main cue list, click anywhere in the appropriate box and it will be added to the end of any existing cues in the cue list. Cues are always added consecutively.   
  
   
At the moment, GoCue will still let you add a file which isn't an audio file, this is a bug which I am currently working on fixing, do not do this as it may crash!

#### Add Note Cue
![Add Note Cue](https://github.com/Dawson-PW/dawson-pw.github.io/blob/master/NOTE_ADD.png?raw=true)
When this button is clicked, it will ask you to enter into the textbox a description/name for this note cue which will be presented within the main cue list. You can either choose to cancel, and the cue won't be added, or to accept and the cue will be added to the end of any existing cues in the cue list.  
Note cues are the same as audio cues in the fact that cues are always added consecutively.

#### Main GO
This is the main GO next cue button which is why it's in such a prominent location on the page. It will play the cue that the cue selector pointer (explained next) is currently pointing to, as soon as this GO button is pressed, the pointer moves down the list and the cue begins.

#### Cue pointer
One a cue is added to the cue list, a small blue pointer arrow appears next to the cue name and box, this tells you the cue that will play when the main GO button is next pressed. If you click next to any cue it will move the cue pointer to that location and that will become the next cue that will play.  
This is implemented to allow you to go back to a previous cue if for some reason this is required, such as getting ahead of yourself when playing back and running the show, or to delay time.

#### Individual cue controls
Located directly underneath the main GO button, there are 3 buttons in a vertical arrangement; Play, Pause, Stop, these can only be used, accessed and clicked on once you select a cue, you can select a cue by clicking on one anywhere in the appropriate cue box. This will illuminate these 3 buttons and make them active. This will allow you to action on the individual cue you have selected. For instance, if a cue has been played too early, then you can click the cue and stop or pause it. You can also play a individual cue before or after it is controlled by the main GO button and cue pointer system, it is a totally independent control of that.

#### Cue information
In the main cue box, you can see that the name of the cue file is displayed to let the operator know what the cue is for, it corresponds to the file name of the file.  
To the right of that is a time which is how long is remaining on the audio file, when you play the cue it will count down how long is left.  
To the right of that again is either thhe speaker icon, which tells you that it is an audio cue, or it there is a notepad icon, this tells you it's a note cue and has no audio attached.  
There is then a hand icon to the right of that which lets you know that at the end of the current cue, it will pause and wait for either the individual cue control play button to be pressed, or more likely, the main GO button. This can be changed to a follow mode in the cue settings (explained below).  
Furthest right on the page is the settings icon, which if clicked will bring up the individual settings for that particular cue.

#### Cue Settings
Once you open the cue settings, you will be presented with a couple of options,  
the volume control will only affect that particular cue and default to the middle of the slider which is the normal and original volume of the cue, you can amplify the volume by sliding it to the right, or make the cue quieter by moving it to the left. When the save button is pressed, this will take affect immediately on the cue, if it is already playing then the volume will jump to the new setting.  
  
The other slider is for the pan of thast particular cue, it can be set from anywhere all the way to the left channel, to all the way to the right channel. It's default is in the middle which is the original audio, and centered panning of the cue. When the save button is pressed, this will take affect immediately on the cue, if it is already playing then the pan will jump to the new setting.  
  
Underneath the sliders, is two buttons, a red hand icon and a green arrow.  
The option that is selected has a grey background colour.  
  
The red hand icon lets you know that at the end of the current cue, when it finishes playing, it will pause and wait for either the individual cue control play button to be pressed, or more likely, the main GO button before the next cue begins.  
  
The green arrow represents that at the end when the cue finishes playing, the next cue will automatically begin. This functionality is almost identical to how a traditional playlist would work in an ordinary audio player. This could potentially be useful for preshow music etc. 
  
When the save button is pressed, all settings are immediately saved for that cue and take effect. 

#### Save Production button
When this button is pressed, all cue settings and options are saved, a file picker should appear which lets you select where you would like the config file (which has a .gocue file extension to stop you from accidentally loading in another file later) to be stored on your device. This will happen immediately. 

#### Load Production button
When this button is pressed, a file picker will appear which lets you load in the config file that you would have previously saved to your device. It will have a .gocue extension. You must have selected the same directory when you opened GoCue to when you originally added the files and cues. The file names of the audio cues must also not have changed from when they were added, otherwise, a conflict will happen and a crash may occur, or certain cues lost. 

## Warning  
I am a single developer who has created this system for a specific purpose and it may not meet all of your needs or requirements. If you have any suggestions, then please get in contact and I will try and help you wherever I can.  
Also, I can't be responsible for any issues that arise or are caused by my cue system in your operation. It is in very early development and may crash, break or stutter at any moment; I **strongly** advise against using this in any commercial or important events as it is only very lightly tested and I can't guarantee how the system will cope with your specific use case.
