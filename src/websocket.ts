import type { WebSocketHandler } from 'bun'
import { open, message, close } from './controller.ts'

export const websocket: WebSocketHandler = {
	open,
	message,
	close,
}
