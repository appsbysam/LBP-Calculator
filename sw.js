const CACHE='lbp-change-v1.1';
const ASSETS=['./','index.html','styles.css?v=11','app.js?v=11','manifest.webmanifest','assets/icon-master.svg?v=11','assets/favicon-32.png?v=11','assets/apple-touch-icon.png?v=11'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const clone=r.clone();caches.open(CACHE).then(c=>c.put(e.request,clone));return r}).catch(()=>caches.match(e.request)))})
