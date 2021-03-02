/*
Export the following API Util functions with the specified parameters:

1. `fetchEvents`
2. `fetchEvent(eventId)`
3. `createEvent(event)`
4. `updateEvent(event)`
5. `deleteEvent(eventId)`
*/

export const fetchEvents = () => {
    return $.ajax({
        url: 'api/events/'
    })
}
export const fetchEvent = eventId => {
    return $.ajax({     
        url: `api/events/${eventId}`
    })
}
export const createEvent = event => {
    return $.ajax({
        url: 'api/events',
        method: 'POST',
        data: {event}
    })
}
export const updateEvent= event => {
    return $.ajax({
        url: `api/events/${event.id}`,
        method: 'PATCH',
        data: {event}
    })
}
export const deleteEvent= eventId => {
    return $.ajax({
        url: `api/events/${eventId}`,
        method: 'DELETE'  
    })
}