import { Text } from '@/components/library';
import { useThemeName } from '@/utils/hooks/useTheme';
import { storage } from '@/utils/storage';
import { Button, View } from 'react-native';

export default function TabTwoScreen() {
  const themeName = useThemeName()

  function changeTheme (){
    const isDark = themeName == "dark"
    storage.set("theme", isDark ? "light" : "dark")
  }

  return (
    <View >
      <Text>Tab Two: {themeName}</Text>
      <Button title = "hello" onPress={changeTheme}></Button>
      <Text>Hello!</Text>
    </View>
  );
}