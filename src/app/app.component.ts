import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
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
      firstname: new FormControl(null),
      lastname: new FormControl(null),
      email: new FormControl(null),
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

  // SIDE NOTES - INTRODUCTION TO REACTIVE FORMS
  // In version 1 - In this version I will go through a quick introduction of how to make a reactive form using FormGroup and instances of 
  // FormControl
  // IN a reactive form we define the form and the form controls by writing some code
  
  
  // *************************************************************************************************************************************
  //                                         Why not use normal HTML Form
  // 
  // When a Normal HTML form is submitted, it reloads the page by making an HTTP request to the server. 
  // Since we create a single page application using Angular, we can say that it will restart the complete Angular application/components

  // To avoid this, we need Angular's help to stop this default behavior. This can be achieved using template driven or reactive form
  // Using any one of these two approaches make working with forms easier.

  // *************************************************************************************************************************************

  // Using a reactive form apporach we define the structure of the form in the component class
  // That means we create the form model with form groups, forom controls, and form arrays in the component class 
  // We also define the validation rules in the component class itself by writing some code 
  // Then we need to bind the form group and form control which we have created in our component class to the HTML form in the view template

  // The advantage of using a reactive form is that since we are going to define the form and form controls by writing some code as a 
    // developer we will have more control over how the form and the form control should be displayed
    // And using this approach creating dynamic controls also becomes easier 
    // And unit testing is also easier 
  // The disadvantage of using reactive forms is that since we are going to do most of the things by writing code it is not 
    // beginner friendly

  // *************************************************************************************************************************************
  //                                                        Required Module
  // 
  // To work with forms in Angular, we must import ReactiveFormsModule from @angular/forms in the App Module file

  // *************************************************************************************************************************************

  // We need to keep in mind that we still need to define the form by using the form element of HTML (this can be seen in the template)
  
  // The first thing we need to do is to import ReactiveFormsModule in the app.module.ts file

  // Second we can define the form structure in the component class
  // In the component class we can create the form (we can name it whatever we want in this case we name it reactiveForm)
  // We give it the type of FormGroup (which also needs to be imported from @angular/forms in the App Module file)
  // Initially we might have an error, 
  // if this is the case then we can assign a new instance of FormGroup which needs to contain an object like so
  // reactiveForm: FormGroup = new FormGroup({});
  // But instaed of doing it there we can do that assigment inside the ngOnInit life cycle hook when all the properties are initalized
  // Inside the object we will specify what are the controls we want inside this FormGroup
  // We will specify using key-value-pair like so 
  // firstname: new FormControl() [FormControl must be imported]
  // Inside the paranthesis we can pass the default value which we want to set for that form control
    // it can be either null or empty string

  // NOTE, When we import a form from angular/forms then whenever it finds a form in the angular application it will 
  // automatically make it as template driven form, therefore remove the need from explicitly using NgForm on that form
  // ngForm is considered a type of FormGroup

  // Now we need to connect the reactive form to our form in the template
  // To do this, in the template form we use the directive formGroup and do property binding on the directive to our form in the class 
    // <form class="form" [formGroup]="reactiveForm">

  // We then also need to connect the input elements to their respected controls
  // On each of the form controls we need to use another directive called formControlName which we assign the to control names back 
    // in the ts file like so
      // <input type="text" placeholder="First Name" formControlName="firstname"/>
  // NOTE we are not doing any property binding so this value would be considered as string value, but if we do property binding in that 
    // case angular will think that the first name is some TS expression. To fix this we add signle quotes like so
      // // <input type="text" placeholder="First Name" [formControlName]="'firstname'"/>
  // NOTE we stop needing the name attribute at this current time when using formControlName
  // Once we connect all the elements to the controls it cann be considered a reactive form

  // If we want to set a default value for some of the fields of this form, for example gender and country 
  // we first provide value attributes to the radio buttons
    // <input type="radio" value="male" id="check-male"  formControlName="gender"/>
  // Based on that value we can set a default value by passing it to the gender control in the ts file
    // gender: new FormControl('female'),
    // country: new FormControl('United States'),

  

  // When the form is submitted angular raises an event called ngSubmit
  // And we can listen to that event and whenever that form will be submitted we can do something 
  // So when the button is submit and the button is clicked it is going to submit the form 
    // and when that form is submitted ngSubmit event will happen
      // <input type="submit" value="Submit" class="submit-btn"> 
    // We then bind the submit type of the button to the form like so 
      // <form class="form" [formGroup]="reactiveForm" (ngSubmit)="OnFormSubmitted()">
    // and inside the OnFormSubmitted() method I can log out the reactiveForm property
  // From here we can click on the submit button and see all the controls that were defined inside the FormGroup
  // We can checkout the value property and see the values that are default and the values placed by the user
  // We also have the valid and invalid property, dirty property, untouched property and touched property
  // The structure is very similiar to the template driven approach 
  // In the controls property, we can see the properties created of type FormControl
  // firstname property (also in other properties) contain pristine property, touched property, dirty, value property 
}
