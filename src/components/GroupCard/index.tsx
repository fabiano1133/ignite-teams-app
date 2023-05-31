import { TouchableOpacityProps } from "react-native";
import { Container, Title, UsersIcons } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <UsersIcons />
      <Title>{title}</Title>
    </Container>
  );
}
