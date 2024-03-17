const staticMakdown = 'markdown-converter-v1';
const assets = [
    '/',
    '/src',
    '/assets',
    '/node_modules'
]

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCoffee).then(cache => {
            cache.addAll(assets)
        })
    )
})