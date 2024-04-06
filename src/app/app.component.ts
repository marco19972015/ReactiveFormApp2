import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
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
      skills: new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required),
      ])
    })
  }

  OnFormSubmitted(){
    console.log(this.reactiveForm);
  }

  // SIDE NOTES - FORM VALIDATION IN REACTIVE FORM
  // In version 5 - In this lecture we will learn what is a Form Array and how to create and use a form array in a reactive form 

  // WHAT IS A FormArray?
  // A FormArray is a way to manage a collection of form controls in Angular. The form control can be a FormGroup, FormControl or another FormArray

  // In Angular, we can group form controls in two ways.
    // - Using FromGroup
    // - Using FormArray
  
  // The difference between FormGroup and FormArray is in the way they create the collection.
    // - FormGroup stores the form controls in the form of key value pair in an object
    // - FormArray stores the form control as an element of an array

  
  // To start using a FormArray we place it inside out reativeForm FormGroup object 
  // Step 1 - We create a property (skills) and assign an instance of FormArray
  //        - When creaing a FormArray we pass an array instead of an object

  // Step 2 - We define the form controls inside the array (we can add as many as we want)
  //        - Ex.       skills: new FormArray([new FormControl(null)])

  // Step 3 - Now we want to bind the new FormControl to our HTML
  //        - In out HTML we create an div, inside we create an input element of type text
  //        - Our new div is acting as a container for the input element 
  //        - This is where we want to display all our form controls of the FormArray

  // Step 4 - On the div container we use a directive called formArrayName 
  //        - To this directive we need to assign the name of the FormArray
  //        - Ex.       formArrayName="skills"

  // Step 5 (One way) -  We need to create the same amount of formControls inside of the div container we created as in the FormArray
  // Step 5A - We can also optionally loop over the FormArray instead of hard coding the equal amount of FormControls 
  //         - To do this we use te ngFor directive on the first form control
  //         - to access the array itself we use get method on the reactiveForm and access the skills/controls array
  //         - Ex.      *ngFor="let control of reactiveForm.get('skills')['controls']
  //         - With this we can now add more controls in the class and it will update in our template

  // PROBLEM
  // - None of the input elements we created through the FormArray have a state 
  //   Meaning none have a css class associated with the input ie. ng-dirty etc
  //   This is because currently the form controls being generated are not connected to the form controls in our class 

  // SOLUTION
  // - In order to connect them we need to use the formControlName directive 
  // - They also need to be assigned a name, however since they are being generated dynamically we 
  //   specify the index of that element in the form array as the name right after the creation of the elements in the ngFor Directive
  // - Ex.    ; let i = index

  // Step 6 - We create a formControlName diretive on the first input element
  //        - Ex.        formControlName="i">
  //        - Initially as it is, 'i' will be treated as a string value
  //        - Instead of specifying the form control as 'i' we want to assign the form control name with the value stored in the i variable
  //        - So we do property binding on the formControlName 
  //        - Ex.        [formControlName]="i">
  //        - With this, we now have css classes added to dynamic inputs
  //        - We also added ng-reflect-name for each input going from 0 to however many were created

  // ADDING VALIDATION ON THESE FORM CONTROLS 
  // we just add Validators.required to the form controls 

  // In conclusion, a form array is a collection of form control/ form group/ or another form array 
  // To create a form array we first define it inside the code/class 
  // Then we create a container inside the HTML
  // Inside the container we create the form elements 
  // We bind those form elements to a formControl in the form array using formControlName
  // We bind the container element to the formArray by using the formArrayName directive
}
