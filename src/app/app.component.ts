import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'template-driven-form';

  // Using bang to inform angular that we know it will be initalized later on
  reactiveForm!: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null),
      dob: new FormControl(null),
      gender: new FormControl('female'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        city: new FormControl(null),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required),
      }),
    })
  }

  OnFormSubmitted(){
    console.log(this.reactiveForm);
  }

  // SIDE NOTES - FORM VALIDATION IN REACTIVE FORM
  // In version 4 - The focus of this leacture will be on how to group some of the form controls together in a reactive form

  // We will use the example of createing a FormGroup from the address fields
  // We can do this using three simple steps 

  // Step 1 - in our class file we look at the FormGroup that is connected to our reactive form. 
  //          We are looking at the street, country, city, region, and postal form controls
  //        - After the gender property we create a new property called 'address' and it will be of type FormGroup.
  //          To the constructor we pass an object and this is where we create the other form controls 
  //        - We cut the form controls we want and paste inside the new FormGroup

  // Step 2 - In the second step, the form controls which we define in the HTML in regards to the address related FormGroup/controls
  //        - We wrap this form controls inside a container div
  //        - The idea being that we want encapsulate what we want to group inside a single container

  // Step 3 - On the container div, we need to use a directive called formGroupName
  //        - To this formGroupName we assign the name we created for our new FormGroup (address)
  //          - Ex. formGroupName="address"

  // When we log out the form, we can usee inside controls property we have a new property called address of type FormGroup


  // Now we want to make street, country, and postal a required field
  // To do this we add Validators.required
  // On the HTML side we use our ngIf directive and place our small text wherever we want to use it for validation
  // In order to access the form control within the new FormGroup we need to do the following 

  // Ex. <small *ngIf="reactiveForm.get('address.street')?.invalid && reactiveForm.get('address.street')?.touched">
    // Doing this will allow us to access the FormGroup - FormGroup - Form Control
}
