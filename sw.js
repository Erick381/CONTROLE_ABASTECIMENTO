const STATIC_CACHE_NAME = "fuelproof-static-cache-v1";
const DYNAMIC_CACHE_NAME = "fuelproof-dynamic-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/cadastro-veiculo.html",
  "/abastecimento.html",
  "/historico.html",
  "/detalhes-abastecimento.html",
  "/assets/css/style.css",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      console.log("Precaching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener("fetch", event => {
  // For API requests, always go to the network
  if (event.request.url.includes("/api/")) {
    return event.respondWith(fetch(event.request));
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchRes => {
        return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
          cache.put(event.request.url, fetchRes.clone());
          return fetchRes;
        });
      });
    })
  );
});
