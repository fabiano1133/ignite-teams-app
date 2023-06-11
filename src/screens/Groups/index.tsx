import { useState, useCallback } from "react";
import { Header } from "@components/Header";
import { Container } from "./styles";
import { HighLight } from "@components/HighLight";
import { GroupCard } from "@components/GroupCard";
import { Alert, FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupGetAll } from "@storage/group/groupGetAll";
import { Loading } from "@components/Loading";

interface Group {
  id: string;
  name: string;
}

export function GroupsScreen() {
  const [isLoading, setIsLoading] = useState(true);

  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  const fethGroups = async () => {
    try {
      setIsLoading(true);

      const groups = await groupGetAll();

      setGroups(groups);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops...!", "Não foi possível carrega as turmas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenGroup = (groupName: string) => {
    navigation.navigate("players", { group: groupName });
  };

  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  useFocusEffect(
    useCallback(() => {
      fethGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <HighLight title="Turmas" subtitle="Jogue com a sua Turma!"></HighLight>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Não existe nenhum grupo criado" />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <Button
        type={"PRIMARY"}
        title={"Criar nova turma"}
        onPress={handleNewGroup}
      ></Button>
    </Container>
  );
}
