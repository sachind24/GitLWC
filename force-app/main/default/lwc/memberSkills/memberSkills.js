import { LightningElement, wire,track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getTeamName from '@salesforce/apex/teamController.getTeamName';
import saveTeamMember from '@salesforce/apex/teamMemberController.saveTeamMember';
import NAME_FIELD from '@salesforce/schema/TeamMember__c.Name';
import TEAM_FIELD from '@salesforce/schema/TeamMember__c.Team__c';
import SKILL_FIELD from '@salesforce/schema/TeamMember__c.Skills__c';


let i=0;
export default class MemberSkills extends LightningElement {
    @track items = []; //this will hold key, value pair
    @track value = ''; //initialize combo box value
    @track choosenTeam = '';

    @track newTeamMember={
        Name : NAME_FIELD,
        Team__c :TEAM_FIELD,
        Skills__c: SKILL_FIELD
    }

    onNameChange(event){
        this.newTeamMember.Name=event.detail.value;
        console.log('Name is'+this.newTeamMember.Name);
    }

    onSkillChange(event){
        this.newTeamMember.Skills__c=event.detail.value;
        console.log('Name is'+this.newTeamMember.Skills__c);
    }

    @wire(getTeamName)
    wiredTeamName({ error, data }) {
        if (data) {
            //create array with elements which has been retrieved controller
            //here value will be Id and label of combobox will be Name
            for(i=0; i<data.length; i++)  {
                this.items = [...this.items ,{value: data[i].Id , label: data[i].Name} ];                                   
            }
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data= undefined;
        }
    }

    //gettter to return items which is mapped with options attribute
    get teamOption() {
        return this.items;
    }

    handleChange(event) {
        // Get the string of the "value" attribute on the selected option
        this.value = event.detail.value;
        //LOGIC 1
        // const selectedOption = event.detail.value;
        // var currentLabel =  this.teamOption.filter(function(option) {
        //                        return option.value == selectedOption;
        //                     })
        //   this.choosenTeam=currentLabel[0].label;
        // OR
        //LOGIC 2
        this.choosenTeam = event.target.options.find(opt => opt.value === event.detail.value).label;
        this.newTeamMember.Team__c=event.detail.value;
    }

    handleSave(){
            saveTeamMember({teamMem:this.newTeamMember})
            .then(
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Member added successfully',
                    variant: 'success'
                })),
                eval("$A.get('e.force:refreshView').fire();")
                )
        
    }
    
}