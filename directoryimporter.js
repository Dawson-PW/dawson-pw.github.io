/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

import {
    fileOpen,
    directoryOpen,
    fileSave,
    supported
} from 'https://unpkg.com/browser-fs-access';
  

(async () => {
if (supported) {
    console.log('Using the File System Access API.');
} else {
    console.log('Using the fallback implementation.');
}

const listDirectory = (blobs) => {
    let fileStructure = '';
    blobs
    .sort((a, b) => a.webkitRelativePath.localeCompare(b))
    .forEach((blob) => {
        // The File System Access API currently reports the `webkitRelativePath`
        // as empty string `''`.
        fileStructure += `${blob.webkitRelativePath}\n`;
    });
    console.log(fileStructure);
};

const openDirectoryButton = document.querySelector('#opendirectorybutton');
openDirectoryButton.addEventListener('click', async () => {
    try {
        blobs = await directoryOpen();
        //console.log(blobs[0].name)

        //const blobs2 = blobs[0]

        //const url = URL.createObjectURL(blobs2);
        
        //var audiothingy = document.getElementById("audio")
        //audiothingy.src = url;
        //console.log(url)

        for (let i = 0; i < blobs.length; i++) {
        CreateBox(i,blobs[i].name)
        directoryselector_off()
        console.log(i)
        }


        //listDirectory(blobs);
    } catch (err) {
        if (err.name !== 'AbortError') {
        return console.error(err);
        }
        console.log('The user aborted a request.');
    }
});

openDirectoryButton.disabled = false;

////////////////////////

const saveButton = document.querySelector('#saveprodbutton2');
saveButton.addEventListener('click', async () => {
    try {
        // Save a file.
        //gets to here is save button is pressed
        console.log("ABOUT TO ATTEMPT TO SAVE ARRAY TO FILE")

        var arraylength = CueArray.length;

        const now = new Date()
        
        var jsonpasser = JSON.stringify(CueArray, null, ' ')

        //console.log(jsonpasser)

        var blob = new Blob([jsonpasser], { type: "application/json" });

        await fileSave(blob, {
            fileName: 'UntitledProduction.gocue',
            extensions: ['.gocue'],
            excludeAcceptAllOption: true,
        });
        
    } catch (err) {
        if (err.name !== 'AbortError') {
        return console.error(err);
        }
        console.log('The user aborted a request.');
    }
});

})();