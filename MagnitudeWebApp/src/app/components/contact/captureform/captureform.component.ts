
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
  // newCapture: {  questionID: string, fieldID: string, response: any  }[] = [];
  newCapture: any = {  };
  contactList: any[] = [];
  InputTypes: any[] =[];
  dynamicInputs: any[] = [];
  matchingField : any;
  Dropdown: string | undefined;
  inputValue: string = '';
  contactId: any;
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
          this.contactId = contactId; 
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

  addCapture() {
    console.log('Form data:', this.newCapture); 
    console.log('checkbox', this.selectedCheckboxes);
    const formResponses = Object.keys(this.newCapture).map(key => ({
      QuestionID: parseInt(key),
      response_value: this.newCapture[key],
      contact_id: this.contactId 
    }));
    this.Contact.addCaptureform(formResponses).subscribe(
      response => {
        alert("Data added")
        console.log('Response from API:', response); 
        this.newCapture = {};
      },
      error => {
        console.error('Error calling API:', error); 
      }
    );
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
