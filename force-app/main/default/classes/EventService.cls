public with sharing class EventService {
    @AuraEnabled
    public static List<Event__c> getEvents() {
        return [SELECT Id, Name, Date__c, Location__c, Max_Attendees__c FROM Event__c WHERE Date__c >= :System.today()];
    }

    @AuraEnabled
    public static void createEvent(String name, DateTime date, String location, Integer maxAttendees) {
        Event__c newEvent = new Event__c(Name=name, Date__c=date, Location__c=location, Max_Attendees__c=maxAttendees);
        insert newEvent;
    }

    // Method to register a volunteer for an event
    @AuraEnabled
    public static void registerVolunteer(Id volunteerId, Id eventId) {
        // Check if the volunteer is already registered for the event
        List<Attendance__c> existingRecords = [SELECT Id FROM Attendance__c WHERE Volunteer__c = :volunteerId AND Event__c = :eventId];
        if (!existingRecords.isEmpty()) {
            throw new CustomException('Volunteer already registered for this event.');
        }
        Attendance__c attendance = new Attendance__c(Volunteer__c = volunteerId, Event__c = eventId, Status__c = 'Registered');
        insert attendance;
    }
}
