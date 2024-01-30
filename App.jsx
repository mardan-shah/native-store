import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Home from './screen/Home';
import Profile from './screen/Profile';
import Cart from './screen/Cart';
import Liked from './screen/Liked'; 
import Notification from './screen/Notification';
import Menu from './screen/modal/Menu';
import Search from './screen/components/Search';
import SignIn from './screen/SignIn';
import SignUp from './screen/SignUp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={Profile} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const openSearch = () => {
    setSearchVisible(true);
  };

  const closeSearch = () => {
    setSearchVisible(false);
  };

  const openMenuModal = () => {
    setMenuModalVisible(true);
  };

  const closeMenuModal = () => {
    setMenuModalVisible(false);
  };

  const HeaderButtons = () => {
    const navigation = useNavigation();
    const route = useRoute();
    return (
      <View className=" w-full flex-row justify-between items-center m-3">
      {searchVisible ? (
          <Search onClose={closeSearch} />
        ) : (
        <>
        <TouchableOpacity onPress={openMenuModal}>
          <Feather name="menu" size={24} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>
      
            <Text className="text-center font-bold ml-5 text-2xl">{route.name}</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={openSearch}>
                <Feather name="search" size={24} color="black" style={{ marginRight: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Feather name="shopping-bag" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </>
        )}
    </View>
    
    );
  }

  return (
    <NavigationContainer>      
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: true, // Set to true to show the custom header
            headerTitle: '', // Hide default header title
            "tabBarActiveTintColor": 'black',
            "tabBarInactiveTintColor": 'gray',
            "tabBarStyle":[{
              display: 'flex',
              height:70,
              paddingBottom:15,
              paddingTop:10,
            }],
            headerRight: () => <HeaderButtons />,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Cart') {
                iconName = 'shopping-bag';
              } else if (route.name === 'Liked') {
                iconName = 'heart';
              } else if (route.name === 'Notification') {
                iconName = 'bell';
              } else if (route.name === 'Profile') {
                iconName = 'user';
              }

              return (
                <View className="items-center justify-center">
                  <Feather name={iconName} size={size} color={color} />
                  {focused && <View className="absolute -bottom-7 h-[63px] w-[63px] rounded-full bg-[#00B2FF] opacity-[0.4]"/>}
                </View>
              );
            },
          })}
          
        >
          <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Liked" component={Liked} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Profile" component={AuthStack} />
      </Tab.Navigator>

      {/* Search Modal */}
      
      
      <Menu closeModal={closeMenuModal} menuModalVisible={menuModalVisible}/>
    </NavigationContainer>
  );
};

export default App;
