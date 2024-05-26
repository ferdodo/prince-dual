import { Character, Game, GameState } from "core";

export function computeIndication(
	myCharacter: Character | null,
	game: Game | null
): string {
	if (myCharacter === null) {
		return "";
	}

	if (game === null) {
		return "";
	}

	switch (game.state) {
		case GameState.WaitingPlayerB:
			return "Attente d'un deuxieme joueur";
		case GameState.Matte:
			switch (myCharacter) {
				case Character.PlayerA:
				case Character.PlayerB:
					return "Attendez...";
				default:
					return "";
			}
		case GameState.AWins:
			switch (myCharacter) {
				case Character.PlayerA:
					return "Vous gagnez !";
				case Character.PlayerB:
					return "Vous perdez !";
				default:
					return "";
			}
		case GameState.BWins:
			switch (myCharacter) {
				case Character.PlayerA:
					return "Vous perdez !";
				case Character.PlayerB:
					return "Vous gagnez !";
				default:
					return "";
			}
		case GameState.AWinsByFault:
			switch (myCharacter) {
				case Character.PlayerA:
					return "Gagné ! L'adversaire a frappé trop tôt !";
				case Character.PlayerB:
					return "Perdu ! vous frappez trop tôt !";
				default:
					return "";
			}
		case GameState.BWinsByFault:
			switch (myCharacter) {
				case Character.PlayerA:
					return "Perdu ! vous frappez trop tôt !";
				case Character.PlayerB:
					return "Gagné ! L'adversaire a frappé trop tôt !";
				default:
					return "";
			}
		default:
			return "";
	}
}
