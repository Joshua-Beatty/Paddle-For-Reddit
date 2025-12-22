import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';

import { useLoggedIn } from '@/utils/hooks/useLoggedIn';
import { useTheme } from '@/utils/hooks/useTheme';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const theme = useTheme()
  const loggedIn = useLoggedIn()

  useEffect(()=>{
    if(!loggedIn){
      router.replace('/sign-in');
    }
  }, [loggedIn])

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tabIconSelected,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Posts',
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="magnifying-glass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
