/* Service worker — Escape Game TMS
   Objectif : après une première visite en ligne, le jeu (page + librairies
   TensorFlow.js + modèle MoveNet) fonctionne entièrement hors-ligne. */
'use strict';

const CACHE = 'tms-v1';
const APP_SHELL = ['./', './index.html'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const sameOrigin = new URL(e.request.url).origin === self.location.origin;

  if (sameOrigin) {
    // Page : réseau d'abord (pour récupérer les mises à jour), cache en secours.
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
    );
  } else {
    // CDN (tf.js, pose-detection) + fichiers du modèle MoveNet : versions
    // épinglées donc immuables → cache d'abord, réseau seulement au premier chargement.
    e.respondWith(
      caches.match(e.request).then(hit =>
        hit || fetch(e.request).then(res => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        })
      )
    );
  }
});
