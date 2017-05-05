import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from '../styles';

class GreenButton extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.btn}>
                <Button
                onPress={this.props.press}
                title={this.props.title}
                color="#FFFFFF"
                />
            </View>
        );
    }
}

export default GreenButton;