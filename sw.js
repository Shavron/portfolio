var cacheName = "CACHE-6";
var filesToCache = [
  "./",
  "./index.html",
  "./css/main.css",
  "./js/main.js",
  "./js/bootstrap.min.js",
  "./js/waypoints.min.js",
  "./js/jquery.min.js",
  "./js/inview.min.js",
  "./js/easypiechart.js",
  "./js/counterup.min.js",
  "./js/magnific-popup.min.js",
  "./css/animate.css",
  "./css/bootstrap.min.css",
  "./css/font-awesome.min.css",
  "./css/magnific-popup.css",
  "./css/responsive.css"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return (
        response ||
        fetch(e.request).then(function(response) {
          return caches.open(cacheName).then(cache => {
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});

// first hit network then if error fallback to cache

// self.addEventListener("fetch", function(e) {
//   e.respondWith(
//     fetch(e.request)
//     .then(function(response){
//       return caches.open(cacheName).then(cache => {
//             cache.put(e.request, response.clone());
//             return response;
//           });
//     })
//     .catch(function() {
//       return caches.match(e.request);
//     })
//   );
// });
