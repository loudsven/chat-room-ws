import { websocket } from './src/websocket.ts'

const server = Bun.serve({
	fetch(req, server) {
		if (server.upgrade(req)) return
		return new Response('Upgrade failed', { status: 500 })
	},
	websocket,
})

console.log('Server runs on:', server.url.origin)
