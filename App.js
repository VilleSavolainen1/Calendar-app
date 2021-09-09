import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios'
import CalendarView from './components/Calendar'
import Buttons from './components/Buttons'
import EventForm from './components/EventForm';

export default function App() {
  const [eventStart, setEventStart] = useState('')
  const [start, setStart] = useState('')
  const [mode, setMode] = useState('week')
  const [addingEvent, setAddingEvent] = useState(false)
  const [eventAdded, setEventAdded] = useState(false)
  const [getItems, setGetItems] = useState(false)
  const [eventDeleted, setEventDeleted] = useState(false)
  const baseUrl = 'http://ec2-13-51-252-148.eu-north-1.compute.amazonaws.com:5000'

  const currentDate = new Date()
  const pastDay = new Date(currentDate.setDate(currentDate.getDate() - 1))


  const [events, setEvents] = useState([])


  useEffect(() => {
    setEventAdded(false)

    const getData = async () => {
      const res = await axios.get(`${baseUrl}/items`)
      setEvents(res.data)
      const item = res.data.map(item => item)
      item.forEach(async (key, index) => {
        const id = key.id
        if (new Date(key.start) < pastDay) {
          await axios.delete(`${baseUrl}/items/${id}`)
        }
      })
    }
    getData()
  }, [eventAdded, getItems, eventDeleted])

  const addingEventTime = (event) => {
    setAddingEvent(true)
    setStart(event)
  }

  return (
    <View>
      <View style={{ flex: 1, alignItems: 'center' }} >
        <Buttons mode={mode} setMode={setMode} getItems={getItems} setGetItems={setGetItems} events={events} setEvents={setEvents} baseUrl={baseUrl} />
      </View>

      {!addingEvent ?
        <View style={styles.container}>
          <CalendarView 
          events={events}
           mode={mode} 
           addingEventTime={addingEventTime} 
           setEventStart={setEventStart}
           eventDeleted={eventDeleted}
           setEventDeleted={setEventDeleted}
           baseUrl={baseUrl}
            />
        </View> : null}

      {addingEvent ?
        <View style={styles.event}>
          <EventForm baseUrl={baseUrl}
            setAddingEvent={setAddingEvent}
            start={start}
            eventStart={eventStart}
            events={events}
            setEvents={setEvents}
            setEventAdded={setEventAdded} />
        </View>
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 120
  },
  event: {
    top: 250,
  },
});
