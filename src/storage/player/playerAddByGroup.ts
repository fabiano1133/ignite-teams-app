import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(
  playerName: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playersGetByGroup(group);

    const playerAllreadyExists = storedPlayers.filter(
      (player) => player.name === playerName.name
    );

    if (playerAllreadyExists.length > 0) {
      throw new AppError("Já existe um jogador com esse nome.");
    }

    const storage = JSON.stringify([...storedPlayers, playerName]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error: any) {
    throw new AppError(error.message);
  }
}
