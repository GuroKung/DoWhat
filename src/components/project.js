import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import moment from 'moment';
import firebase from '../firebaseService';
import TaskLists from './taskLists';

class Project extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return {
            title: 'Do What',
            headerBackTitle: navigation.state.params.project.name,
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

        const { params } =  props.navigation.state;
        let currentProject = params.project;
        let curentUser = firebase.auth().currentUser;   
        let projectId = params.projectId;
        let taskUrl = 'users/' + curentUser.uid + '/projects/' + projectId + '/tasks';
        this.state = { taskUrl, currentProject };
    }
    render() {
        return (
            <View style={{ flex: 1}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <Text style={{ fontSize: 22 }}>{this.state.currentProject.name}</Text>
                </View>
                <TaskLists taskUrl={this.state.taskUrl} navigation={this.props.navigation}/>
            </View>
        );
    }
}

export default Project;