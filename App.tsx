import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
// import { GroupsScreen } from "@screens/Groups";
// import { NewGroup } from "@screens/NewGroup";
import { PlayersScreen } from "@screens/Players";
import { Loading } from "@components/Loading";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import theme from "./src/theme";

export default function App() {
  const [fontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontLoaded ? <PlayersScreen /> : <Loading />}
    </ThemeProvider>
  );
}
