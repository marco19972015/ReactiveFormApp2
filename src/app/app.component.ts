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
      street: new FormControl(null),
      country: new FormControl('United States'),
      city: new FormControl(null),
      region: new FormControl(null),
      postal: new FormControl(null),
    })
  }

  OnFormSubmitted(){
    console.log(this.reactiveForm);
    
  }

  // SIDE NOTES - FORM VALIDATION IN REACTIVE FORM
  // In version 2 - This version will focus on how we can perform validation on the form controls of a reactive form

  // Originally to add validation in the HTML we would use attributes such as required to make a field require user input 
  // and email in order to have the user 

  // In the case of a Reactive Form, we don't add these HTML attribute validators on the form elements/HTML, we add it on the 
  // form controls which are defined inside the FormGroup above. 
  // We use Validators (this is provided by angular forms) which gives us a variety of different methods to implement different validations
    // Ex. firstname: new FormControl(null, Validators.required),
    // Where Validators.required makes the form control a required field

  // Currently we do this for firstname, lastname, and email 
  // In doing so if we submit the form without providing the required fields the form will be invalid (ie valid:false, invalid: true)


  // HOWEVER, there is an issue with this even when providing input. Email will take any user input and mark it as valid 
  // To fix this we need to add another validation to our email form control.
  // When using multiple validators on a form control we need to use an array and inside we specify the validators we want to use 
    // Ex. email: new FormControl(null, [Validators.required, Validators.email]),
  
  // Now when submitting an invalid email address, the entire form will be marked as invalid 
  // We also now have access to see what validation error has occurred on this form control
  // There is an errors property
    // Ex. errors: {email: true}
    // meaning that we do have an error code coming from the email

  // If we enter a valid email address on the control level we see 
    // Ex. errors: null

  
  // Moving on to the state of the form and using classes to get said state
  // Just like before. Angular adds classes on the form depending on whether the user has interacted or if the form is valid 
  // If we touch an input the class ng-untouched will be removed amd ng-touched will be added
  // If we provide a valid value... the ng-invalid class will be removed and ng-valid will be added 
  // Same concept with ng-prestine and ng-dirty once the inputs have been touched 

  // Keep in mind that if any control in the form is touched, that means the complete form is touched
  // If any for control is dirty, that means the complete form is dirty
  // And if any form control has an invalid value, that means the complete form is invalid 

  // So we can manipulate our form based on this reaction


  // SHOWING A RED BORDER AROUND THE FORM
  // In the css we add .ng-invalid {border: red 2px solid;}
    // Meaning if ng-invalid appears in the class then set the border to red 
    // If it does not appear that means that the border is being overwritten by another class 

  // PROBLEM This will however make the entire form border red on top of the inputs 
  // SOLUTION - We specify that we want the border to appear on inputs 
    // Ex. input.ng-invalid {border: red 2px solid;}

  // PROBLEM 2 - We only want the red border to show when the user has touched the input (currently it's aways on)
  // SOLUTION - We use ng-touched to dictate when the user has interacted with the form
    // Ex. input.ng-invalid.ng-touched {border: red 2px solid;}
    // Now the border will only appear when we click inside and click outside without adding a valid input
  
  // Remember there are more Validators available, ie min, max...
  
  
  



}
