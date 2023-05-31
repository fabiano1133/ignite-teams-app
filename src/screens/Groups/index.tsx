import { useState } from "react";
import { Header } from "@components/Header";
import { Container } from "./styles";
import { HighLight } from "@components/HighLight";
import { GroupCard } from "@components/GroupCard";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

interface Group {
  id: string;
  name: string;
}

export function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([]);

  const addGroup = (id: string, name: string) => {
    const newGroup = {
      id,
      name,
    };
    groups.push(newGroup);
    setGroups([...groups]);
  };

  return (
    <Container>
      <Header />
      <HighLight title="Turmas" subtitle="Jogue com a sua Turma!"></HighLight>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GroupCard title={item.name} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Não existe nenhum grupo criado" />
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button
        type={groups.length === 0 ? "PRIMARY" : "SECONDARY"}
        title={groups.length === 0 ? "Adicionar Turma" : "Remover Turma"}
        onPress={() => addGroup("1", "Turma 1")}
      ></Button>
    </Container>
  );
}
