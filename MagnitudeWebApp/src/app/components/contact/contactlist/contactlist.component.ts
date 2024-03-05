import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  contactList: any[] = [];

  constructor(private Contact: AuthService, private router: Router) {}

  ngOnInit() {
    // Fetch the list of contacts when the component initializes
    this.fetchContactList();
  }

  fetchContactList() {
    this.Contact.getContact().subscribe(
      (contacts) => {
        this.contactList = contacts;
      },
      (error) => {
        console.error('Error fetching contact list:', error);
      }
    );
  }
  navigateToAddContact(){
    this.router.navigate(['']);
  }
  editContact(contactId: number) {
    this.router.navigate(['/contactedit', contactId]);
  }
  DeleteContact(contactId: number) {
    this.Contact.deleteContact(contactId).subscribe(
      () => {
        console.log('Contact deleted successfully.');
        alert('Contact deleted successfully.');
        location.reload();
      },
      (error) => {
        console.error('Error deleting contact:', error);
      }
    );
  }
  Capture(contactId: number){
    this.router.navigate(['/captureform', contactId]);
  }
 
}


