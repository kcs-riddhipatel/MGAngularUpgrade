
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-captureform',
  templateUrl: './captureform.component.html',
  styleUrls: ['./captureform.component.css']
})
export class CaptureformComponent {
  newContact: any = {};
  contactList: any[] = [];
  InputTypes: any[] =[];
  matchingField : any;
  
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
        console.log("aa : ", this.InputTypes)
      });
      this.Contact.GetQuestion().subscribe(
        (contacts) => {
          this.contactList = contacts;
          console.log(this.contactList)
        },
        (error) => {
          console.error('Error fetching category data:', error);
        },
      );
  }
  addCapture(){
   
  }
  
  getInputType(inputTypeID: number): string {
    console.log(this.InputTypes)
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
