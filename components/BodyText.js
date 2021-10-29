import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = props => <Text {...props} style={{...styles.body, ...props.style}}>{props.children}</Text> ;

const styles = StyleSheet.create({
    body: {
        fontFamily: 'sevilladecor',
        fontSize: 32
    }
});

export default BodyText;