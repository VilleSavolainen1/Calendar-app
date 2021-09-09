import { Calendar } from 'react-native-big-calendar'
import React from 'react'
import { StyleSheet, View, Dimensions, Alert } from 'react-native'
import 'dayjs/locale/fi'
import axios from 'axios'


const height = Dimensions.get('window').height - 50

const CalendarView = ({events, mode, addingEventTime, eventDeleted, setEventDeleted, baseUrl}) => {


const deleteItem = async(event) => {
    Alert.alert(`Poistetaan merkintä ${event.title}`)
    await axios.delete(`${baseUrl}/items/${event.id}`)
    eventDeleted ? setEventDeleted(false) : setEventDeleted(true)
}

    return (
        <View>
            <Calendar
                mode={mode}
                height={height}
                events={events}
                locale="fi"
                weekStartsOn={1}
                onPressCell={(event) => addingEventTime(event)}
                eventCellStyle={styles.events}
                onPressEvent={(event) => deleteItem(event)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    events: {
        padding: 5
    },
})

export default CalendarView