import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Keyboard } from "react-native";
import { Container, Content } from "native-base";
import SearchHeader from "../SearchHeader";
import axios from "axios";
import Searchbody from "../Searchbody";
import { data } from "../../data/data";


class SearchTab extends Component {
  state = {
    searchBeer: "",
    beerData: {},
    beerFound: false,
    apiCallMade:false
  };
  beerSearch = async () => {
    Keyboard.dismiss();
    const beerName = this.state.searchBeer.toLowerCase();
    const filterItem = await data.filter((beer) =>
      beer.name.toLowerCase().match(beerName)
    );
    if (filterItem && filterItem.length > 0) {
      this.setState({
        beerData: filterItem[0],
        beerFound: true,
        apiCallMade: true,
      });
    } else {
      this.setState({
        beerFound: false,
        apiCallMade: true,
      });
    }
  };
  renderContent = () => {
    if (this.state.beerFound) {
      return <Searchbody beerData={this.state.beerData} />;
    } else {
       return (
           <View style={{ flex: 1,flexDirection:'column', justifyContent:'center', alignItems:'center',marginVertical:'50%'}}>
               <Text style={{fontSize:16, fontWeight:'bold'}}>
                   No Beer Found
               </Text>
           </View>
       )
    }
  };
  render() {
    return (
      <Container>
        <SearchHeader
          value={this.state.searchBeer}
          onChangeText={(searchBeer) =>
            this.setState({ ...this.state, searchBeer: searchBeer })
          }
          beerSearch={this.beerSearch}
        />
        <Content>{this.state.apiCallMade && this.renderContent()}</Content>
      </Container>
    );
  }
}

export default SearchTab;
