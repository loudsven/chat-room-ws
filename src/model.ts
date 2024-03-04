export type TextMessage = {
	type: 'message' | 'echo'
	data: { username: string; message: string; date: number }
}

export type ConnectMessage = {
	type: 'connect'
	data: {
		count: number
	}
}
