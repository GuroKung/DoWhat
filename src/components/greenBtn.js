import React, { Component } from 'react';
import { View, Button } from 'react-native';
import styles from '../styles';

const GreenButton = (props) => (
    <View style={styles.btn}>
        <Button
        onPress={props.press}
        title={props.title}
        color="#FFFFFF"
        />
    </View>
);

export default GreenButton;