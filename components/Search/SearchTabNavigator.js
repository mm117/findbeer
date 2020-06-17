import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchTab from "./tabNavigator/SearchTab";
import FavoriteTab from "./tabNavigator/FavoriteTab";
import { Footer, FooterTab, Button, Icon } from "native-base";

const Tab = createBottomTabNavigator();
const SearchTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search" 
      tabBarOptions={{
        activeTintColor: '#1979a9',
      }}>
      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Icon name="beer" style={{color:color}} size={size}  />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavoriteTab}
        options={{
          tabBarLabel: "Favourites",
          tabBarIcon: ({ color, size }) => (
            <Icon name="star" style={{color:color}} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const SearchTabNavigator = createBottomTabNavigator({
//     SearchTab: {screen:SearchTab},
//     FavoriteTab:{screen:FavoriteTab}
// },{
//     tabBarPosition: 'bottom',
//     tabBarComponent: props =>{
//         return (
//             <Footer>
//             <FooterTab>
//             <Button vertical
//             active={props.navigationState.index === 0}
//             onPress= {()=>props.navigation.navigate('SearchTab')}
//             >
//             <Icon name="beer" />
//              <Text>Search</Text>
//             </Button>
//             <Button vertical
//               active={props.navigationState.index === 1}
//               onPress= {()=>props.navigation.navigate('FavoriteTab')}>
//             <Icon name="start" />
//              <Text>Favourites</Text>
//             </Button>
//             </FooterTab>
//             </Footer>
//         )
//     }
// }
// )

export default SearchTabNavigator;
