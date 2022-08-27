export enum GameState {
	WaitingPlayerA = "WaitingPlayerA",
	WaitingPlayerB = "WaitingPlayerB",
	Matte = 'Matte',
	Hajime = 'Hajime',
	AWins = 'AWins',
	BWins = 'BWins',
	AWinsByFault = 'AWinsByFault',
	BWinsByFault = 'BWinsByFault',
	PlayerADisconnected = 'PlayerADisconnected',
	PlayerBDisconnected = 'PlayerBDisconnected',
}

export type Game = {
	state: GameState,
	playerA?: Number,
	playerB?: Number
}
