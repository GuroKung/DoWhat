import React, { Component } from 'react';
import { View, Text } from 'react-native';

import moment from 'moment';
import firebase from '../firebaseService';
import TaskLists from './taskLists';

class MainPage extends Component {
    static navigationOptions = {
        title: 'Do What'
    };

    constructor(props){
        super(props);
        let currentDate = moment().format("MMM Do YY");
        let curentUser = firebase.auth().currentUser;   

        this.state = { currentDate, curentUser, taskUrl: 'users/' + curentUser.uid + '/tasks' };
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
                <TaskLists taskUrl={this.state.taskUrl}/>
            </View>
        );
    }
}

export default MainPage;