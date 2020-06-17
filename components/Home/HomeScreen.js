import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "native-base";
import * as firebase from "firebase";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
const backgroundImage = require("../../assets/HomeScreen/home_screen_bg_image_2.jpg");

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  componentDidMount() {
    var that = this;
    firebase
      .auth()
      .signInWithEmailAndPassword(
        "mukeshmishra117@gmail.com",
        "Mukeshmishra@123"
      )
      .then((user) => {
        that.registerForPushNotificationAsync(user);
      });
      Notifications.addListener(that.listener)
  }

  listener = () => {
    this.props.navigation.navigate("SearchTabNavigator", {initialRouteName: 'Favourites'});
  }

  registerForPushNotificationAsync = async (user) => {
    let token = await Notifications.getExpoPushTokenAsync();
    let createdOn = new Date();
    firebase.database().ref(user.uid).child("expo-token").set({
      token: token,
      createdOn: createdOn,
    });
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  };
  render() {
    return (
      <View style={styles.homeScreenView}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
        >
          <Image
            source={backgroundImage}
            style={{ flex: 1, height: null, width: null }}
          />
        </View>
        <Button
          style={{ backgroundColor: "#1979a9" }}
          block={true}
          onPress={() => this.props.navigation.navigate("SearchTabNavigator")}
        >
          <Text style={{ color: "white" }}> Search Beers</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeScreenView: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default HomeScreen;
