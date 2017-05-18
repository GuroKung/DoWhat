import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import moment from 'moment';
import firebase from '../firebaseService';
import TaskLists from './taskLists';

class Project extends Component {
    constructor(props){
        super(props);

        let curentUser = firebase.auth().currentUser;   
        let taskUrl = 'users/' + curentUser.uid + '/project/' + props.projectId;
        this.state = { taskUrl };
    }
    render() {
        return (
            <View>
                <Text>Project</Text>
                <TaskLists taskUrl={this.state.taskUrl}/>
            </View>
        );
    }
}

export default Project;