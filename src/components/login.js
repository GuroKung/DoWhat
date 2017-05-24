import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from '../styles';
import firebase from '../firebaseService';
import { MessageBar as MessageBarAlert , MessageBarManager } from 'react-native-message-bar';

import GreenButton from './greenBtn';
import MainPage from './mainPage';

class Login extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = { 
            email:'', 
            password: ''
         };
         this.signup = this.signup.bind(this);
    }
    async signup(navigate) {
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password);

            console.log("Account created");
            MessageBarManager.showAlert({
                title: 'Success',
                message: 'Account created',
                alertType: 'success',
                stylesheetSuccess: {
                    backgroundColor: '#6fcf97',
                    strokeColor: '#6fcf97'
                }
            });
            // Navigate to the Home page, the user is auto logged in
            navigate('MainPage');

        } catch (error) {
            console.log(error.toString())
            MessageBarManager.showAlert({
                title: 'Error',
                message: error.toString(),
                alertType: 'error'
            });
        }

    }
    async login(navigate){
        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            // await firebase.auth().signInWithEmailAndPassword('g@g.com', '12341234');
            console.log("Login Success");
            navigate('MainPage');
        } catch(error) {
             console.log(error.toString());
             MessageBarManager.showAlert({
                 title: 'Error',
                 message: error.toString(),
                 alertType: 'error'
             });
        }
    }

    componentDidMount() {
        MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 , justifyContent: "space-between", padding: 50, marginTop: 50 ,marginBottom: 50 ,  alignItems: 'stretch'}}>
                <Text style={{ marginBottom: 35,  fontSize: 50, alignItems: 'center' }}> Do What </Text>
                <Text>Email:</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Input email"
                    onChangeText={(email) => {
                        this.setState({email})
                    }}
                    autoCapitalize="none"
                />
                <Text>Password:</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Input password"
                    password={true}
                    onChangeText={(password) => this.setState({password})}
                    autoCapitalize="none"
                />
                <GreenButton title="LOGIN" press={() => this.login(navigate)} />
                <Button 
                title="Sign Up"
                color="#841584"
                accessibilityLabel="Ok, Great!"
                onPress={() => this.signup(navigate)}/>

                <MessageBarAlert ref="alert" />
            </View>
        );
    }
}


export default Login;