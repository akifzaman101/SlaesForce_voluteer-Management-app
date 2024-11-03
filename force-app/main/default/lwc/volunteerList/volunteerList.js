import { LightningElement, wire, track } from 'lwc';
import getVolunteers from '@salesforce/apex/VolunteerService.getVolunteers';

export default class VolunteerList extends LightningElement {
    @track volunteers;
    @track error;

    @wire(getVolunteers)
    wiredVolunteers({ error, data }) {
        if (data) {
            this.volunteers = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.volunteers = undefined;
        }
    }

    get columns() {
        return [
            { label: 'Name', fieldName: 'Name' },
            { label: 'Email', fieldName: 'Email' },
            { label: 'Phone', fieldName: 'Phone' },
            { label: 'Skills', fieldName: 'Skills__c' },
        ];
    }
}
