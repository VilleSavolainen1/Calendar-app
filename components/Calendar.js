import { Calendar } from 'react-native-big-calendar'
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import 'dayjs/locale/fi'

const height = Dimensions.get('window').height

const CalendarView = ({events, mode, addingEventTime}) => {

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