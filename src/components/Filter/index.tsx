import { Container, Title, FilterStyleProps } from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps &
  FilterStyleProps & {
    title: string;
  };

export function Filter({ isActivity = false, title, ...rest }: Props) {
  return (
    <Container {...rest} isActivity={isActivity}>
      <Title>{title}</Title>
    </Container>
  );
}
