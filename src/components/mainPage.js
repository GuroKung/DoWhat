import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import moment from 'moment';
import firebase from '../firebaseService';
import MainLists from './mainLists';

class MainPage extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return {
            title: 'Do What',
            headerBackTitle: 'Task Lists',
            headerLeft: (
                <Button
                    title="Menu"
                    onPress={() => navigate('Menu') }
                />
            )
        };
    };

    constructor(props){
        super(props);
        let currentDate = moment().format("LLL");
        let curentUser = firebase.auth().currentUser;   

        this.state = { currentDate, curentUser };
        setInterval(() => {
            this.setState({ currentDate: moment().format("LLL") });
        }, 1000);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <Text style={{ fontSize: 22 }}>Today Task List{"\n"}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -15 }}>
                    <Text>{this.state.currentDate.toString()}</Text>
                </View>
                <MainLists navigation={this.props.navigation}/>
            </View>
        );
    }
}

export default MainPage;