import React, { Component } from 'react';
import { Text,View, Button } from 'react-native';

import firebase from '../firebaseService';

import GreenButton from './greenBtn';

class Task extends Component {
    constructor(props){
        super(props);
        const { params } =  props.navigation.state;
        let currentTask = params;
        let taskId = params.rowID;

        this.state = { currentTask };
        this.doneTask = this.doneTask.bind(this);
    }
    async doneTask(){
        try {

            let curentUser = firebase.auth().currentUser;
            let projects = await firebase.database().ref('users/' + curentUser.uid + '/projects/').once('value');

            projects.val().forEach((project, projectIndex) => {
                if (project.tasks) {
                    project.tasks.forEach(async (task, taskIndex) => {
                        if (task.id == this.state.currentTask.id) {
                            await firebase.database().ref(`users/${curentUser.uid}/projects/${projectIndex}/tasks/${taskIndex}`).remove();
                            this.props.navigation.navigate('MainPage');
                        }
                    });
                }
            });
        

        } catch (error) {
            console.error(error);
        }
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <Text style={{ fontSize: 22 }}>{this.state.currentTask.label}</Text>
                </View>
                <View >
                    <GreenButton title="Done" press={this.doneTask}/>
                </View>
            </View>
        );
    }
}

export default Task;