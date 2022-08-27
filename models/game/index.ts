export enum GameState {
	WaitingPlayerA,
	WaitingPlayerB,
	Matte ,
	Hajime,
	AWins,
	BWins,
	AWinsByFault,
	BWinsByFault,
	PlayerADisconnected,
	PlayerBDisconnected
}

export type Game = {
	state: GameState,
	playerA?: Number,
	playerB?: Number
}
