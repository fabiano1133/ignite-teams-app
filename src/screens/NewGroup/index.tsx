import { Alert } from "react-native";
import { useState } from "react";
import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { HighLight } from "@components/HighLight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

export function NewGroup() {
  const navigation = useNavigation();

  const [group, setGroup] = useState("");

  const handleNew = async () => {
    try {
      if (group.trim().length === 0)
        return Alert.alert("Ops...!", "Informe um nome para a turma");

      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Ops...!", error.message);
      }
      Alert.alert("Ops...!", "Não foi possível criar uma nova turma");
      console.log(error);
    }
  };

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <HighLight
          title="Nova Turma"
          subtitle="Crie uma turma para adicionar novas pessoas"
        />
        <Input
          placeholder="Qual o nome da sua turma?"
          onChangeText={setGroup}
        />

        <Button
          title="Criar Turma"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}
