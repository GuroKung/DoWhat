import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

import styles from '../styles';
import firebase from '../firebaseService';
import GreenButton from './greenBtn';

class Menu extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return {
            title: 'Do What',
            headerLeft: null
        };
    };

    constructor(props) {
        super(props);

        let projects = [];
        let curentUser = firebase.auth().currentUser; 
        this.projectsUrl = 'users/' + curentUser.uid + '/projects';

        firebase.database().ref(this.projectsUrl).once('value')
            .then((snapshot) => {
                if (!snapshot) this.setState({ projects: [] });
                else this.setState({ projects: snapshot.val() });
            })
            .catch((error) => {
                console.log('ERROR: ' + error.message);
                this.setState({ projects: [] });
                // throw error;
            });

        this.state = { projects, isPressedCreateProject: false };
    }

    async createNewProject() {
        if (this.state.newProject) {
            try {
                let projects = this.state.projects;
                let key = firebase.database().ref().child('projects').push().key;
                console.log('Projects', projects);

                if (!projects) projects = [];

                projects.push({
                    id: key,
                    name: this.state.newProject,
                    tasks: null
                });

                await firebase.database().ref(this.projectsUrl).set(projects);
                this.setState({ projects, isPressedCreateProject: false });
            } catch (error) {
                console.log(error.toString());
            }
        }
    }

    onPressedCreateProject(){
        if(this.state.isPressedCreateProject){
            return (<View style={styles.taskContainer}>
                    <TextInput
                        style={{ padding: 10, height: 80, backgroundColor: '#F6F6F6' }}
                        ref={component => this._textInput = component}
                        placeholder="Create New Project"
                        onChangeText={(newProject) => this.setState({ newProject })}
                    />
                    <View style={styles.textInputContainer}>
                        <GreenButton title="Add Project" press={() => this.createNewProject()} />
                        <Button
                            title="Cancel"
                            color="#000000"
                            accessibilityLabel="Clear"
                            onPress={() => this.setState({ isPressedCreateProject: false })} />
                    </View>
                </View>);
        }
    }

    render() {
        let projects = [];
        const { navigate } = this.props.navigation;
        let createNewProjectInput = this.onPressedCreateProject();
        if (this.state.projects) {
            projects = this.state.projects.map((project, index) => {
                return (
                    <View key={index} style={{ borderStyle: 'solid'}}>
                        <Button 
                            title={project.name}
                            onPress={() => navigate('Project', { projectId: index, project })}/>
                    </View>
                )
            });
        }
        
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <Text style={{ fontSize: 22 }}>Projects</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                        title="Task Lists"
                        onPress={() => this.props.navigation.navigate('MainPage')}
                    />
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between'}}>
                    {projects}
                </View>
                <Button title="+ New Project" onPress={() => this.setState({ isPressedCreateProject: true })}/>
                {createNewProjectInput}
            </View>
        );
    }
}

export default Menu;