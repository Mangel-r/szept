// SZEPT: świeża strona z sieci; offline tylko wcześniej pobrane pliki graficzne.
const CACHE='szept-pwa-assets-v1';
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png']).catch(()=>{})));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(self.clients.claim())});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate')return; // nie przechowuj HTML z danymi logowania
 if(/\.(png|webp|jpg|jpeg|svg)$/.test(new URL(req.url).pathname))event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return resp})));
});
