import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity
  
} from "react-native";
import { Content, ListItem, List } from "native-base";
import { Rating, AirbnbRating } from "react-native-ratings";
import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';
let currentUser;
class Searchbody extends Component {
    addToFavourite = async() => {
        let existingData = [];
        const beerData = this.props.beerData;
        currentUser = await firebase.auth().currentUser;
        await firebase
        .database()
        .ref(currentUser.uid)
        .child("favourites")
        .on("child_added",  (data) => {
             existingData.push(data.val());
         })
         const filterData = existingData.filter(data => {
           return data.id === beerData.id});
         if(filterData && filterData.length > 0) {
            alert("Already added to favourites");
            return;
        }else{
            const dataBaseRef = await firebase.database().ref(currentUser.uid).child('favourites').push();
            dataBaseRef.set(beerData);
            let expoToken;
            await firebase.database().ref('expo-token').on('value', (snapshot)=>{
                expoToken = snapshot.val().token;
            })
            fetch('https://exp.host/--/api/v2/push/send', {
              method: 'POST',
              headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
              },
              body: JSON.stringify(
                {
                  "to": expoToken,
                  "sound": "default",
                  "body": "Please checkout the new beer added to Favourites!!!"
                })
            }).then( () => {
              console.log("notification sent");
            })
        }
       
    }
 render() {
    const beerData = this.props.beerData;
    return (
      <Content>
        <ListItem
          itemDivider
          style={{ flexDirection: "row", justifyContent: "center" }}
        >
          <Image
            source={{ uri: beerData.image_url }}
            style={{ height: 200, width: 200 }}
          />
        </ListItem>
        <List style={{ backgroundColor: "white" }}>
          <ListItem itemDivider>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Name</Text>
          </ListItem>
          <ListItem
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text>{beerData.name}</Text>
            </View>
            <View>
              {/* <Button style={{backgroundColor:'#ff8000'}}
                onPress={() => this.addFavourites(beerData.name)}
                title="+Favourites"
              ></Button> */}
              <TouchableOpacity onPress={() => this.addToFavourite(beerData.name)}>
                <View style={{ ...styles.button }}>
                  <Text style={{ ...styles.buttonText }}>+ Favourites</Text>
                </View>
              </TouchableOpacity>
               {/* <TouchableOpacity onPress={() => this.addToFavourite()}>
                <View style={{ ...styles.button }}>
                  <Text style={{ ...styles.buttonText }}>+ Favourites</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.getFavourite()}>
                <View style={{ ...styles.button }}>
                  <Text style={{ ...styles.buttonText }}>+ Favourites</Text>
                </View>
              </TouchableOpacity> */}
            </View>
          </ListItem>
          <ListItem itemDivider>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Tag Line</Text>
          </ListItem>
          <ListItem>
            <Text>{beerData.tagline ? beerData.tagline : ""}</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Rating</Text>
          </ListItem>
          <ListItem>
            <Rating
              type="custom"
              ratingCount={5}
              startingValue={beerData.abv}
              imageSize={20}
              readonly={true}
            />
          </ListItem>
          <ListItem itemDivider>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Description</Text>
          </ListItem>
          <ListItem>
            <Text>{beerData.description ? beerData.description : ""}</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Brewer Tips</Text>
          </ListItem>
          <ListItem>
            <Text>{beerData.brewers_tips ? beerData.brewers_tips : ""}</Text>
          </ListItem>
          <ListItem itemDivider>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              Food Pairing
            </Text>
          </ListItem>
          <ListItem
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            {beerData.food_pairing.map((pair, index) => (
              <Text key={index}>{pair}</Text>
            ))}
          </ListItem>
        </List>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1979a9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Searchbody;
