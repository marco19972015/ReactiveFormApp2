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
  // In version 7 - In this lecture we'll learn how to add and remove a form group dynamically from a reactive form 

  // We know that a form group is a collection of form controls

  // What we want to add is the ability to let the user add experience from his previous jobs

  // Step 1 - We create a new FormArray called 'expereince' of type FormArray
  //        - When we create a FormArray in the HTML we should have a container which we can bind to the FormArray

  // Step 2 - We use formArrayName directive to bind the container to the FormArray
  //        - Ex.    formArrayName="experience"

  // Step 3 - Inside the FormArray we create an instance of FormGroup
  //        - Inside the FormGroup we pass an object

  // Step 4 - Now inside the contianer div we need to create another container div 
  //        - This is the container div that will be binded to the new FormGroup that we created inside FormArray
  //        - Inside this div we are going to need to bind this div to SOMETHING using formGroupName
  //        - Ex.     <div formGroupName="">  

  // Step 5 - The something will be the index of FormGroup inside the experience FormArray
  //        - So for each instance of FormArray, we want to generate the div with the formGroupName dynamically and its content
  //        - To start we use the ngFor directive and access the experience from our FormArray
  //        - Ex.   *ngFor="let exp of reactiveForm.get('experience')['controls']"

  // Step 6 - Now we use the semi colon so we can get the index of each element that is being created 
  //        - ; let i = index"

  // Step 7 - Then we can bind that 'i' variable to the formGroupName. Since it's a variable we use property binding on formGroupName directive
  //        - [formGroupName]="i"

  // Step 8 - Now inside the class we need to create some FormControls for the elements we want to bind ei. company name, position, start date...

  // Step 9 - In our template we now need to bind the input elements to the properties in our class 
  //        - for that we need to use formControlName directive and their designated properties
  //        - Ex.     formControlName="company"

  // Step 10 - We then create a button element and set its type to button
  //         - We want to use this button to render the experience div 
  //         - So we bind a click event and assign it a method (AddExperience() in our case)
  //         - We also create the method in our class

  // Step 11 - We create a variable called frmgroup 
  //         - We cut the FormControls from our FormArray and assign it to the frmgroup variable

  // Step 12 - Now we will push the FormGroup inside the experience FormArray
  //         - We use the same method of getting the experience array as the skills array
  //         - Ex.    (<FormArray>this.reactiveForm.get('exerience'))
  //         - We then use the push method and pass in the frmgroup variable 
  //         - Ex.    (<FormArray>this.reactiveForm.get('exerience')).push(frmgroup)
  //         - With this the form groups are now added dynamically 

  // All of these new divs include their own classes ie. ng-dirty 



  // Now We want to let the user delete an experience div

  // Step 1 - add a click event to the Delete Experience button
  //        - And add the method to the class as well

  // Step 2 - We will want to delte based on an index
  //        - For this we'll use the i variable since it already holds the index

  // Step 3 - We pass 'i' as an argument in the template
  //        - In the class we create index of type number as a parameter 

  // Step 4 - We create access to get experience from the FormArray
  //        - Ex.     (<FormArray>this.reactiveForm.get('experience'))

  // Step 5 - We store the FormArray in a variable 
  //        - Ex.     const frmArray = (<FormArray>this.reactiveForm.get('experience'))

  // Step 6 - Now we can use removeAt method 
  //        - We pass the index into this method

  // With that we can now add and remove indexes

}
