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

  OnFormSubmitted(){
    console.log(this.reactiveForm);
  }

  // SIDE NOTES - FORM VALIDATION IN REACTIVE FORM
  // In version 6 - In this lecture we will learn how to add dynamic controls in a form using a reactive form approach
  // This is one of the advantages we get when using reactive forms, we can add dynamic controls in our form 

  // Originally, we created 4 form controls through the use of FormArray and looped through those form controls using ngFor directive             
  // and dynamically generating them 

  // Now we want to show one input element for the skill and have a button to add and another button to remove 
  // When the add button is clicked it should create this add skill input element dynamically 

  // Step 1 - We add an add button element to the HTMl
  //        - This button is automatically of type submit so we change it to type button

  // Step 2 - We bind a click event and assign a method (addSkills() in our case)
  //        - We also create method back in the class 
  //        - And when this method is called we want to insert a new form control inside this skills array

  // Step 3 - To access the reactiveForm we create an instance of the reactiveForm in the AddSkills method
  //        - We then use the get method to access the skills control
  //        - The get method returns us the FormArray connected to the skills property

  // IMPORTANT - Uisng the get method, it will return us a value of type AbstractControl.
  //           - FormControl, FormGroup, and FormArray are child classes of the AbstractControl
  //           - So get method can return the latter
  //           - We will use the push method to increase the skills.
  //           - NOTE, only FormArray has access to push, FormControl and FormGroup can't use the push method

  // Step 4 - In order to use push method we explicitly give the FormArray type to the instance of reactiveForm
  //        - Ex.       <FormArray>this.reactiveForm.get('skills')
  //        - We then wrap the expression within paranthesis 
  //        - Ex. (<FormArray>this.reactiveForm.get('skills'))
  //        - This expression will return us a FormArray giving us access to the push method

  // Step 5 - We use the push method to pass a FormControl with the value null and have it set as a required field
  //        - Ex.     .push(new FormControl(null, Validators.required))
  //        - Now when we click the Add Skills button it will render a form control dynamically 


  // Now we want to create a way to remove this controls in a reactive way

  // Step 1 - We create a button element right after the input element

  // Step 2 - We wrap both the intput and the new button inside a new Div element 

  // Step 3 - We move the ngFor directive to the div that now wraps both the input and button element 
  //        - This is done because we want both the input and button to be dynamically generated 

  // Step 4 - Now for the Delete button we create a click event and pass in a method (DeleteSkill() in our case)
  //        - We also create that method in the class 

  // Step 5 - We need to pass the index of the element that we want to delete
  //        - In order to get the index we use the loop we created to loop through each element and the index that is stored in variable i 
  //        - So we pass the variable 'i' to the DeleteSkill method as an argument
  //        - Ex.     (click)="DeleteSkill(i)
  //        - Ex.     DeleteSkill(index: number)

  // Step 6 - Using the index we can now delete the skill form the skills form array
  //        - In order to get access to the FormArray we can use the same expression we used before 
  //        - Ex.     (<FormArray>this.reactiveForm.get('skills'))

  // Step 7 - We then store it in a variable and use that variable to remove the element based on the index
  //        - Ex.     controls.removeAt(index)
}
