import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Card = props => {
    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },

});

export default Card;