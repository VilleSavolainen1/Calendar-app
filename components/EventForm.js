import axios from 'axios'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity, Text, View, Dimensions, StyleSheet, Alert } from 'react-native'

const EventForm = ({ start, setAddingEvent, baseUrl, setEventAdded }) => {

    const [end, setEnd] = useState('')
    const [event, setEvent] = useState('')

    let startHour = start.getHours()
    let startMinute = parseInt(JSON.stringify(start).slice(15, 17))

    const onSubmit = async () => {
        if (event === '') return Alert.alert('Anna tapahtuman nimi')
        if (end === '') return Alert.alert('Anna kellonaika')
        if (!end.includes('.')) {
            setEnd('')
            return Alert.alert('Anna kellonaika HH.MM')
        }
        let eventYear = Number(JSON.stringify(start).slice(1, 5))
        let eventMonth = parseInt(JSON.stringify(start).slice(6, 8)) - 1
        let eventDay = parseInt(JSON.stringify(start).slice(9, 11))
        let endHour = Number(end.split(".")[0])
        let endMinute = Number(end.split(".")[1])
        if (endMinute > 59) return Alert.alert("Virheellinen kellonaika")
        const newItem = {
            title: event,
            start: new Date(eventYear, eventMonth, eventDay, startHour, startMinute),
            end: new Date(eventYear, eventMonth, eventDay, endHour, endMinute)
        }
        setAddingEvent(false)
        try {
            axios.post(`${baseUrl}/items`, newItem)
        } catch (err) {
            Alert.alert(err)
        }
        setTimeout(() => {
            setEventAdded(true)
        }, 1000)
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tapahtuman nimi"
                onChangeText={text => setEvent(text)}
            />
            <Text style={styles.header} >Alkaa: {startHour}:{startMinute}0</Text>
            <TextInput
                style={styles.input}
                placeholder="Loppuu HH.MM"
                keyboardType="numeric"
                value={end}
                onChangeText={text => setEnd(text)} />
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
                    <Text style={styles.buttonText}>Tallenna</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exitButton} onPress={() => setAddingEvent(false)} >
                    <Text style={styles.buttonText}>Peruuta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center'
    },
    header: {
        fontSize: 20,
        margin: 10
    },
    input: {
        height: 30,
        fontSize: 20,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15
    },
    button: {
        justifyContent: 'center',
        height: 40,
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#3788B8',
        borderRadius: 5
    },
    exitButton: {
        justifyContent: 'center',
        height: 40,
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#DB3E34',
        borderRadius: 5
    },
    buttonText: {
        padding: 8,
        color: '#fff',
        fontSize: 15
    }
})

export default EventForm