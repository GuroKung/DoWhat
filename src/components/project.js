import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

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
        if (this.state.currentProject.tasks) {
            var remainingTasks = `${this.state.currentProject.tasks.length} remains`;
        }

        return (
            <View style={styles.container}>
                <View style={styles.projectHeader}>
                    <Text style={styles.textSize}>{this.state.currentProject.name}</Text>
                </View>
                <View style={styles.projectSub}>
                    <Text>{remainingTasks}</Text>
                </View>
                <TaskLists taskUrl={this.state.taskUrl} navigation={this.props.navigation}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: { flex: 1 },
    textSize: { fontSize: 22 },
    projectHeader: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
    projectSub: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 }
});

export default Project;