public with sharing class teamController {
    @AuraEnabled(cacheable=true)
    public static List<Team__c> getTeamName(){
        try {
            return[SELECT NAME
            FROM Team__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}