public with sharing class teamMemberController {
    @AuraEnabled
    public static void saveTeamMember(TeamMember__c teamMem){
        try {
            if(teamMem!=NULL){
                insert teamMem;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<TeamMember__c> getTeamMember(Id idTeam){
        try {
            return[ SELECT Id,NAME,Team__r.Name, Skills__c
                    FROM TeamMember__c
                    WHERE Team__c=:idTeam
                ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}