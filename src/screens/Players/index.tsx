import { Header } from "@components/Header";
import { Container, Form, HeaderList, NumberPlayers } from "./styles";
import { HighLight } from "@components/HighLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList, TextInput } from "react-native";
import { useState, useEffect, useRef } from "react";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

type PropsParams = {
  group: string;
};

export function PlayersScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const [team, setTeam] = useState("Time A");

  const [newPlayerName, setNewPlayerName] = useState("");

  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();

  const navigate = useNavigation();

  const { group } = route.params as PropsParams;

  const newPlayerInputRef = useRef<TextInput>(null);

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0)
      return Alert.alert("Novo Jogador", "Informe o nome do jogador");

    const newPlayer = {
      name: newPlayerName,
      team,
    };
    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerInputRef.current?.blur();

      setNewPlayerName("");

      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert("Novo Jogador", error.message);
      }
      Alert.alert("Novo Jogador", "Não foi possível adicionar o jogador");
    }
  };

  const fetchPlayersByTeam = async () => {
    try {
      setIsLoading(true);

      const playersByTeam = await playersGetByGroupAndTeam(group, team);

      setPlayers([...playersByTeam]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group);

      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("Remover Jogador", "Não foi possível remover o jogador");
    }
  };

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigate.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Remover Grupo", "Não foi possível remover o grupo");
    }
  };

  const handleRemoveGroup = async () => {
    try {
      Alert.alert(
        "Remover Grupo",
        `Deseja realmente remover o grupo ${group}?`,
        [
          {
            text: "Não",
            style: "cancel",
          },
          {
            text: "Sim",
            onPress: async () => {
              groupRemove();
            },
          },
        ]
      );
    } catch (error) {}
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <HighLight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome do Player"
          autoCorrect={false}
          inputRef={newPlayerInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>
      <HeaderList>
        <FlatList
          data={["Time A", "Time B", "Time C", "Time D"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActivity={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberPlayers>{players.length}</NumberPlayers>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ListEmpty message="Não há jogadores cadastrados!" />
          }
        />
      )}
      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      ></Button>
    </Container>
  );
}
