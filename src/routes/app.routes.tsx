import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GroupsScreen } from "@screens/Groups";
import { NewGroup } from "@screens/NewGroup";
import { PlayersScreen } from "@screens/Players";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="goups" screenOptions={{ headerShown: false }}>
      <Screen name="groups" component={GroupsScreen}></Screen>
      <Screen name="new" component={NewGroup}></Screen>
      <Screen name="players" component={PlayersScreen}></Screen>
    </Navigator>
  );
}
