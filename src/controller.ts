import type { ServerWebSocket } from 'bun'
import type { ConnectMessage, TextMessage } from './model'

const connections = new Set<ServerWebSocket>()
const TOPIC = 'chat'

export const open = (ws: ServerWebSocket) => {
	console.log('Client connected')
	ws.subscribe(TOPIC)
	connections.add(ws)

	const message: ConnectMessage = {
		type: 'connect',
		data: {
			count: connections.size,
		},
	}
	ws.send(JSON.stringify(message))
	ws.publish(TOPIC, JSON.stringify(message))
}

export const close = (ws: ServerWebSocket) => {
	ws.unsubscribe(TOPIC)
	connections.delete(ws)
	const message: ConnectMessage = {
		type: 'connect',
		data: {
			count: connections.size,
		},
	}
	ws.send(JSON.stringify(message))
	ws.publish(TOPIC, JSON.stringify(message))
}

export const message = (ws: ServerWebSocket, recieved: string) => {
	let message: TextMessage
	try {
		message = JSON.parse(recieved)
	} catch (error) {
		console.log('Invalid message')
		ws.send(JSON.stringify({ type: 'error', data: 'Invalid message' }))
		return
	}
	message.data.date = Date.now()
	message.data.username = message.data.username || 'Anonymous'
	ws.publish(TOPIC, JSON.stringify(message))
	message.type = 'echo'
	ws.send(JSON.stringify(message))
}
