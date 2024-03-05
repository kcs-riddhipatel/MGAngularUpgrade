import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contactedit',
  templateUrl: './contactedit.component.html',
  styleUrls: ['../contacts/contacts.component.css']
})
export class ContacteditComponent {
  // newContact: any = {};
  editedContact: any = {};
  constructor( private Contact: AuthService,
    private router: Router,private route: ActivatedRoute){

  }
  ngOnInit(): void {
    const contactId = this.route.snapshot.params['contactId'];
      this.Contact.getContactId(contactId).subscribe(
        (Contact) => {
          console.log('category Data:', Contact);
         
          this.editedContact = { ...Contact };
          console.log('editedContact Data:', this.editedContact);
        },
        (error) => {
          console.error('Error fetching category data:', error);
        },
      );
    
  }
  editCategory() {
  
      this.Contact.updateContact(this.editedContact.id, this.editedContact).subscribe(
        () => {
          this.router.navigate(['/contactlist']);
        },
        (error) => {
          console.error('Error editing category:', error);
        }
      );
    }
    goBack(){
      this.router.navigate(['/contactlist']); 
    }
  
}

