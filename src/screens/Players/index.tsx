import { Header } from "@components/Header";
import { Container, Form } from "./styles";
import { HighLight } from "@components/HighLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";

export function PlayersScreen() {
  return (
    <Container>
      <Header showBackButton />

      <HighLight
        title="Nome da Turma"
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome do Player" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </Form>

      <Filter title="Time A"></Filter>
    </Container>
  );
}
