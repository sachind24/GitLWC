import { LightningElement,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getTeamName from '@salesforce/apex/teamController.getTeamName';
import getTeamMember from '@salesforce/apex/teamMemberController.getTeamMember';

let i=0;
export default class TeamList extends LightningElement {
    @track items = []; //this will hold key, value pair
    @track value = ''; //initialize combo box value
    //@track choosenTeam = '';
    @track teamMemberData;
    @track errorInTeamMemberData;

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
        this.value = event.detail.value;// received the Team ID
        getTeamMember({idTeam:this.value})
        .then(
            result => {
                this.teamMemberData=result;
            }
        )
        .catch(
            error=>{
                this.errorInTeamMemberData=error;
            }
        );
    }
}