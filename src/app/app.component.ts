import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { noSpaceAllowed } from './Validators/noSpaceAllowed.validator'

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
      firstname: new FormControl(null, [Validators.required, noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, noSpaceAllowed]),
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
      ]),
      experience: new FormArray([
   
      ])
    })
  }

  AddSkills(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }

  DeleteSkill(index: number) {
    const controls = (<FormArray>this.reactiveForm.get('skills'));
    controls.removeAt(index)
  }

  AddExerience(){
    const frmgroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null),
    });

    (<FormArray>this.reactiveForm.get('experience')).push(frmgroup);
  }

  DeleteExperience(index: number){
    const frmArray = (<FormArray>this.reactiveForm.get('experience'))
    frmArray.removeAt(index)
  }

  OnFormSubmitted(){
    console.log(this.reactiveForm);
  }

  // SIDE NOTES - FORM VALIDATION IN REACTIVE FORM
  // In version 8 - In this lecture we are going to learn how we can create a custom validator to validate the input data 
  // in a form control 

  // In the last version we worked with built in Validators such as 'required and email' (among others that are provided)
  // NOW we will create a user define validator which we can use on a form control in order to validate the data which the user has inputed in form control


  // In order to create a custom Validator, first we need to understand what is an error code and how it works 

  // To start we'll remove the submit button logic that disables the button if the form is invalid (or not valid with the use of !)

  // Step 1 - We remove the [disabled]="reactiveForm.invalid" from the button (This being what disables based on form invalid valid)

  // UNDERTAND 
  //        - We will work with the firstname form control and we'll try to understand what an error code is
  //        - When we submit the form, if we check the controls/firstname/... We can see that there is an errors property
  //        - This is assigned with an object where the property name is required errors: {required: true}
  //        - The required being an "error code"
  //        - This shows up because we added a Validator.required to the form control and when it fails angular returns this object
  //        - If we add a name to the firstname field, then errors will be null ex. errors: null.. this is becaue we satify the requirement 

  // NEXT 
  //      - We can look into the email field (recall that we used two Validators for this form control)
  //      - One is to make sure the user is imputing things in the field 
  //      - Second is to make sure it is a valid email
  //      - If we satisfy the characters input for Validator.required, BUT not the email for Validator.email we get errors: {email: true}

  // POINT BEING MADE 
  //      - If errors property is null, that means that specific form control has no validation error 
  //      - BUT if errors property is not null that means a validation error has occurred 
  //        - and we can see the error by looking into the validation error code

  // That is an error code in Angular 


  // Now lets see how the errors Validators are defined 
  // We can do this by going to Angular docs section - search for "validators" - click on c Validators. There we can see all the validators
  
  // We can see that each Validator is a static method
  // For example min() is a Validator, but it's also a method
  // We can scroll down to the required() Validator, which is a method
    // The signature of this method being 
    // static required(control: AbstractControl<any, any>): ValidationErrors | null
      // We can see that it's a static method, 
      // and this required method is going to take an AbstractControl
        // AbstractControl is a parent class for form control, form group and form array
        // Meaning we can use it on a form control, form group, or form array
      // And it will return either ValidationErrors code or null (if there is no validation error)


  // With this information we can create a custom Validator
  // WHAT CUSTOM VALIDATOR DO WE WANT TO CREATE 
  // Currently in firstname and lastname we can enter a space, we want the user to enter firstnamd/lastname without a space
  // SO we will create a Validator that check if in first/last name controls, if the user has used a space 

  // Step 1 - Inside app folder we can create a new folder called Validators 

  // Step 2 - Inside folder we create a new file called noSpaceAllowed.validator.ts

  // Step 3 - Inisde this file we can create the validator function
  //        - We create a variable called const noSpaceAllowed
  //        - This will be the validator name

  // Step 4 - We can then assign a function
  //        ex. const noSpaceAllowed = () => {}

  // step 5 - This function will recieve a form control parameter (since we don't plan on using it on form array or form group)
  //          - We also need to import FromControl from angular/forms
  //        ex. const noSpaceAllowed = (control: FormControl) => {} 

  // Step 6 - Inside this function we'll write the logic 
  //          - 1st write an if statement
  //            - Inisde this if statement we check if this controls value property is null or not
  //            ex. if(control.value != null)
  //          - 2nd we check if it contains a space
  //            ex if(... && control.value.indexOf(' '))
  //              - We check the index and pass 'space'
  //          So full logic as of now
  //            if(control.value != null && control.value.indexOf(' '))
  //         - So this method will return the index of the first occurance of this space in a value, 
  //         - BUT if there is no space in that string value, in that case it will return -1
  //          SO it check is not equal to -1, that means that value contains a space

  //        if(control.value != null && control.value.indexOf(' ') != -1) {}

  // Step 7 - If this is the case, we want to return an object
  //        - In this object we want to return a return code
  //        - We can call this {noSpaceAllowed: true}

  //        if(control.value != null && control.value.indexOf(' ') != -1) {
  //          return {noSpaceAllowed: true}
  //        }

  // Step 8 - Otherwise, if the value does not contain a space
  //        - In that case, this index will return a -1, so if statement will fail
  //        - outside the if statement we return null

  // Whatever value we return in the return object or return, it will be assigned to the error property of form control

  // WE CAN NOW TRY TO USE IT BY importing THE FILE

  // Step 9 - In order to import it, we need to also export it from the function so we use the export statement 
  //         ex. export const noSpaceAllowed...

  // Step 10 - We can now added to the Validators as so...
  //          firstname: new FormControl(null, [Validators.required, noSpaceAllowed]),

  // Step 11 - If we place a name inside the input and add a space we get the error message "First Name is a required field"
  //         - If we check the errors property we can see errors: {noSpaceAllowed: true}


  // We have create the validator as a function, but we can create it as a method. 
}
