
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-captureform',
  templateUrl: './captureform.component.html',
  styleUrls: ['./captureform.component.css']
})
export class CaptureformComponent {
  newContact: any = {  };
  newCapture: {  questionID: string, fieldID: string, response: any  }[] = [];
  contactList: any[] = [];
  InputTypes: any[] =[];
  dynamicInputs: any[] = [];
  matchingField : any;
  Dropdown: string | undefined;
  inputValue: string = '';
  radioOptions = [
    'Option 1',
    'Option 2',
    'Option 3'
  ];
  checkboxOptions = [
    'I agree',
    'Not like this',
    'Other'
  ];
  selectedradioOption: string | undefined;
  selectedCheckboxes: { [key: string]: boolean } = {};
  DropDownOptions = ['Volvo', 'Saab', 'Mercedes', 'Audi'];
  

  constructor( private Contact: AuthService,
    private router: Router,private route: ActivatedRoute){

  }
  ngOnInit(): void {
    const contactId = this.route.snapshot.params['contactId'];
      this.Contact.getContactId(contactId).subscribe(
        (Contact) => {
          this.newContact = { ...Contact };
        },
        (error) => {
          console.error('Error fetching category data:', error);
        },
      );
      this.Contact.GetDynamicFields().subscribe((fields: any[]) => {
        this.InputTypes = fields;
      });
      this.Contact.GetQuestion().subscribe(
        (contacts) => {
          this.contactList = contacts;
        },
        (error) => {
          console.error('Error fetching category data:', error);
        },
      );
  }
  addCapture(){
    debugger
    console.log("Selected radio option: ", this.selectedradioOption);
    console.log("Selected checkboxes: ", this.selectedCheckboxes);
    console.log("Selected dropdown option: ", this.Dropdown);
    console.log("Selected dropdown option: ", this.newCapture);
  }
  
  getInputType(inputTypeID: number): string {
    this.matchingField = this.InputTypes.find(field => field.id === inputTypeID);
    if (this.matchingField) {
      if (this.matchingField.field_type === 'radio') {
        return 'radio';
      } else if (this.matchingField.field_type === 'checkbox') {
        return 'checkbox';
      } else {
        return this.matchingField.field_type; 
      }
    } else {
      return 'text';
    }
  }
  
}
