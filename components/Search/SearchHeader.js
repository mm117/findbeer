import React, { Component } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Header,Item,Icon, Input} from 'native-base';

class SearchHeader extends Component {
    render() {
        return (
            <Header searchBar rounded  style={{height:80,backgroundColor:'#1979a9' }}>
                <Item>
                    <Icon name="ios-search"/>
                    <Input placeholder="Enter beer name" onChangeText={this.props.onChangeText}
                      returnKeyType="search"
                      onSubmitEditing={this.props.beerSearch}/>
                </Item>
            </Header>
        )
    }
}

export default SearchHeader;
