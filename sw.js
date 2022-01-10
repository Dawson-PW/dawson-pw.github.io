var APP_PREFIX = 'GoCue_'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
    '/',                     // If you have separate JS/CSS files,
    '/index.html',            // add path to those files here
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/apple-touch-icon.png',
    '/AUDIO_ADD.png',
    '/BLANK.png',
    '/CURRENT.png',
    '/directoryimporter.js',
    '/favicon-16x16.png',
    '/favicon-32.png',
    '/favicon-32x32.png',
    '/favicon.ico',
    '/FOLLOW.png',
    '/FOLLOWPRESSED.png',
    '/FOLLOW_ICON.png',
    '/GO.png',
    '/GO_DOWN.png',
    '/Logo.png',
    '/Logo.svg',
    '/main.js',
    '/noentry.html',
    '/NOTE.png',
    '/NOTE_ADD.png',
    '/PAUSE.png',
    '/PAUSE_DOWN.png',
    '/PLAY.png',
    '/PLAY_DOWN.png',
    '/PLAY_ICON.png',
    '/REWIND.png',
    '/REWIND_DOWN.png',
    '/serviceworker-cache-polyfill.js',
    '/SETTINGS_ICON.png',
    '/SPEAKER.png',
    '/SPEAKER_MUTE.png',
    '/STOP.png',
    '/STOP_DOWN.png',
    '/styles.css',
    '/WAIT.png',
    '/WAITPRESSED.png',
    '/WAIT_ICON.png'
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})