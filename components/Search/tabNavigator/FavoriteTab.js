import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  FlatList,
  SafeAreaView,
} from "react-native";
import * as firebase from "firebase";
import { Content, Container, ListItem } from "native-base";
let data = [];
let currentUser;
class FavoriteTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData: data,
    };
  }
  getFavourites = async () => {
    currentUser = await firebase.auth().currentUser;
    const newData = [];
    firebase
      .database()
      .ref(currentUser.uid)
      .child("favourites")
      .on("child_added", (data) => {
        let newData = [...this.state.listViewData];
        newData.push(data.val());
        this.setState({ listViewData: newData });
      });
  };
  componentDidMount() {
    this.getFavourites();
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.listViewData}
          renderItem={({ item }) => (
            <ListItem>
              <Text>{item.name}</Text>
            </ListItem>
          )}
          keyExtractor={(item, index) => index}
        ></FlatList>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default FavoriteTab;
