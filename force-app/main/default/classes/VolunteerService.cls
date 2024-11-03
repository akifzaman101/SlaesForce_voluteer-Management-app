public with sharing class VolunteerService {
    @AuraEnabled
    public static List<Volunteer__c> getVolunteers() {
        return [SELECT Id, Name, Email, Phone, Skills__c FROM Volunteer__c WHERE Status__c = 'Active'];
    }

    @AuraEnabled
    public static void createVolunteer(String name, String email, String phone, String skills) {
        Volunteer__c newVolunteer = new Volunteer__c(Name=name, Email=email, Phone=phone, Skills__c=skills);
        insert newVolunteer;
    }

    // Add more methods for updating and deleting volunteers...
}
