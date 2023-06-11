import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { GroupsScreen } from "@screens/Groups";
import { NewGroup } from "@screens/NewGroup";
import { PlayersScreen } from "@screens/Players";
import { Loading } from "@components/Loading";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import theme from "./src/theme";
import { Routes } from "./src/routes";

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
      {fontLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
