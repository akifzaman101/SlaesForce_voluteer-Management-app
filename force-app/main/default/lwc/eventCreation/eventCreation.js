import { LightningElement, track } from 'lwc';
import createEvent from '@salesforce/apex/EventService.createEvent';

export default class EventCreation extends LightningElement {
    @track eventName;
    @track eventDate;
    @track eventLocation;
    @track maxAttendees;

    handleNameChange(event) {
        this.eventName = event.target.value;
    }

    handleDateChange(event) {
        this.eventDate = event.target.value;
    }

    handleLocationChange(event) {
        this.eventLocation = event.target.value;
    }

    handleMaxAttendeesChange(event) {
        this.maxAttendees = event.target.value;
    }

    handleCreateEvent() {
        createEvent({ name: this.eventName, date: this.eventDate, location: this.eventLocation, maxAttendees: this.maxAttendees })
            .then(() => {
                // Handle success, e.g., show a toast message
            })
            .catch(error => {
                // Handle error
            });
    }
}
