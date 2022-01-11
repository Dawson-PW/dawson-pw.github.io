self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('GoCue').then(function(cache) {
     return cache.addAll([
        './',                     // If you have separate JS/CSS files,
        './index.html',            // add path to those files here
        './android-chrome-192x192.png',
        './android-chrome-512x512.png',
        './apple-touch-icon.png',
        './AUDIO_ADD.png',
        './BLANK.png',
        './CURRENT.png',
        './directoryimporter.js',
        './favicon-16x16.png',
        './favicon-32.png',
        './favicon-32x32.png',
        './favicon.ico',
        './FOLLOW.png',
        './FOLLOWPRESSED.png',
        './FOLLOW_ICON.png',
        './GO.png',
        './GO_DOWN.png',
        './Logo.png',
        './Logo.svg',
        './main.js',
        './noentry.html',
        './NOTE.png',
        './NOTE_ADD.png',
        './PAUSE.png',
        './PAUSE_DOWN.png',
        './PLAY.png',
        './PLAY_DOWN.png',
        './PLAY_ICON.png',
        './REWIND.png',
        './REWIND_DOWN.png',
        './SETTINGS_ICON.png',
        './SPEAKER.png',
        './SPEAKER_MUTE.png',
        './STOP.png',
        './STOP_DOWN.png',
        './styles.css',
        './WAIT.png',
        './WAITPRESSED.png',
        './WAIT_ICON.png',
        './js/FileSaver.js',
        './js/LICENSE.md',
        'https://unpkg.com/browser-fs-access'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});