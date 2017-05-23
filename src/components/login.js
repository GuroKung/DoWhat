import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';
import styles from '../styles';
import firebase from '../firebaseService';

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
            console.log('Call Signup', this.state);
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password);

            console.log("Account created");

            // Navigate to the Home page, the user is auto logged in
            navigate('MainPage');

        } catch (error) {
            console.log(error.toString())
        }

    }
    async login(navigate){
        try {
            // await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
            await firebase.auth().signInWithEmailAndPassword('g@g.com', '12341234');
            console.log("Login Success");
            navigate('MainPage');
        } catch(error) {
             console.log(error.toString());
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 , justifyContent: "center", padding: 50, alignItems: 'stretch'}}>
                <Text style={{ marginBottom: 15,  fontSize: 50, alignItems: 'center' }}> Do What </Text>
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
            </View>
        );
    }
}


export default Login;