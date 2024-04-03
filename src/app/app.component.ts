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
  // In version 3, we will focus on how to show a validation error message to the user, if the user has not entered a valid value in a 
  // form control

  // First we want to add some small text that will appear in the template
    // Ex. <small>*First Name is a required field.</small>
    // This already contains some css, which makes the color red and font bold
  

  // PROBLEM - Currently this text is static, meaning that even if we enter a valid value the text will still be there
  // SOLUTION - We access the firstname control from the contols property. firstname control will contain its own valid/invalid property
  
  // To acomplish this we use get method that goes with FormGroup.
  // This method allows us to access a form control from a FormGroup
  
  // First - We create an ngIf directive that will show or not show the text depending on a boolean value
  // Second - We use reactiveForm in the directive since that is where our FormGroup lives
  // Third - We call the get method and pass a string value (being the name of the form control) in this case firstname
          // This will return us the first name form control from this reactive form group
  // Forth - we use the invalid property (If the invalid prop is true - then small element is rendered)
  
    // Ex. <small *ngIf="reactiveForm.get('firstname')?.invalid"> text <small> 
  // Now when we enter a valid value we see the red test removed 


  // PROBLEM - When the page loads the red text will still be there
  // SOLUTION - We can use touched property of form control 

  // First - We add an && operator to our directive 
  // Second -  We again use get method and access the touched property of firstname

    // Ex. reactiveForm.get('firstname')?.touched


  // We can now repeat these steps wherever we want this validation to show up, we just need to replace the property we want to retrieve 


  // NOW, we want to disable the submit button if any of the form controls are invalid, else we can submit
  // We use the form level valid and invalid property to control this

  // To achieve this we use the disabled attribute and use property binding
  // We again use the reactiveForm since that's where our FormGroup lives
    // Ex -  <input type="submit" value="Submit" class="submit-btn" [disabled]="reactiveForm.invalid"> 
  
}
