import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, {useEffect} from 'react'
import axios from 'axios'
import Refresh from '../Images/refresh.png'


const Buttons = ({mode, setMode, events, setEvents, baseUrl }) => {

    const update = () => {
        axios.get(`${baseUrl}/items`)
        .then(res => {
            setEvents(res.data)
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setMode('day')}>
                <Text style={mode === 'day' ? styles.selected : styles.button1} >Päivä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setMode('week')} >
                <Text style={mode === 'week' ? styles.selected : styles.button2} >Viikko</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setMode('3days')} >
                <Text style={mode === '3days' ? styles.selected :styles.button3} >3pv</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => update()}>
                <Image style={styles.image} source={Refresh}></Image>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 80,
        flexDirection: 'row',
        width: 300
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        height: 50,
        backgroundColor: '#3788B8',
        borderRadius: 5,
    },
    button1: {
        fontSize: 20,
        color: 'black'
    },
    button2: {
        fontSize: 20,
        color: 'black'
    },
    button3: {
        fontSize: 20,
        color: 'black'
    },
    selected: {
        color: 'white',
        fontSize: 20
    },
    image: {
        width: 25,
        height: 25
    }
})

export default Buttons