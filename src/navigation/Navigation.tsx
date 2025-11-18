import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';

import HomeScreen from '@screens/HomeScreen';
import SearchScreen from '@screens/SearchScreen';
import WatchlistScreen from '@screens/WatchlistScreen';
import MovieDetailsScreen from '@screens/MovieDetailsScreen';
import LoginScreen from '@screens/LoginScreen';
import SettingsScreen from '@screens/SettingsScreen';
import type { RootState } from '@store/store';

export type RootStackParamList = {
  Tabs: undefined;
  Login: undefined;
};

export type TabsParamList = {
  HomeStack: undefined;
  Search: undefined;
  Watchlist: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  MovieDetails: { id: number; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabsParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

function TabsNavigator() {
  const scheme = useColorScheme();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: scheme === 'dark' ? '#020617' : '#ffffff',
      card: scheme === 'dark' ? '#020617' : '#ffffff',
      text: scheme === 'dark' ? '#f9fafb' : '#020617',
      border: '#020617',
      primary: '#83B011',
    },
  };

  return (
    <NavigationContainer theme={theme} >
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: string = 'home';

            if (route.name === 'HomeStack') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'magnify';
            } else if (route.name === 'Watchlist') {
              iconName = 'bookmark-outline';
            } else if (route.name === 'Settings') {
              iconName = 'cog-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen
          name="HomeStack"
          component={HomeStackNavigator}
          options={{ title: 'Home' }}
        />
        <Tabs.Screen name="Search" component={SearchScreen} />
        <Tabs.Screen name="Watchlist" component={WatchlistScreen} />
        <Tabs.Screen name="Settings" component={SettingsScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default function Navigation() {
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);

  return sessionId ? (
    <TabsNavigator />
  ) : (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
