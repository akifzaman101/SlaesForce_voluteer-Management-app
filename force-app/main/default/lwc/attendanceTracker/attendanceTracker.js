import { LightningElement, track } from 'lwc';
import registerVolunteer from '@salesforce/apex/EventService.registerVolunteer';
import getVolunteers from '@salesforce/apex/VolunteerService.getVolunteers';
import getEvents from '@salesforce/apex/EventService.getEvents';

export default class AttendanceTracker extends LightningElement {
    @track volunteerOptions = [];
    @track eventOptions = [];
    @track selectedVolunteer;
    @track selectedEvent;

    connectedCallback() {
        this.loadVolunteers();
        this.loadEvents();
    }

    loadVolunteers() {
        getVolunteers()
            .then(data => {
                this.volunteerOptions = data.map(volunteer => ({
                    label: volunteer.Name,
                    value: volunteer.Id
                }));
            });
    }

    loadEvents() {
        getEvents()
            .then(data => {
                this.eventOptions = data.map(event => ({
                    label: event.Name,
                    value: event.Id
                }));
            });
    }

    handleVolunteerChange(event) {
        this.selectedVolunteer = event.target.value;
    }

    handleEventChange(event) {
        this.selectedEvent = event.target.value;
    }

    handleRegister() {
        registerVolunteer({ volunteerId: this.selectedVolunteer, eventId: this.selectedEvent })
            .then(() => {
                // Show success message
            })
            .catch(error => {
                // Show error message
            });
    }
}
