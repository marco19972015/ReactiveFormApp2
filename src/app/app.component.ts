import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { CustomValidators } from './Validators/noSpaceAllowed.validator'

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
      firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required, CustomValidators.checkUsername),
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
  // In version 9 - In this lecture we'll be learning what is an ASYNC VALIDATOR and how to create and use it. 

  // SIDE QUEST OPTIONAL CHANINIG OPERATOR (?.)
  // The optinal chaining (?.) operator accesses an object's property or calls a function. If the object 
  // accessed or function called using this operator is (undefined) or (null), the expression short circuits 
  // and evaluates to (undefined) instead of throwing an error

  // WHAT IS AN ASYNC VALIDATOR
  // We use async valditor when we need to send an HTTP request to the server to check if the data entered in a form element is valid or not

  // The idea is that when we send an HTTP request to the server, the server might take some time in sending over the response.
  // And once we have the response, we can then validate whether the data enetered in a form control is valid or not.
  // This is the purpose of using an async validator

  // Creating an async validator is very similar to creating a sync validator (Differences below)
  // The async validator must return either a PROMISE or an OBSERVABLE
  // Angular does not provide any built-in async validator
    // In Angular, all the built-in validators are sync validators 
    // Ex. Validator.required(), Validator.email(), Validator.min(), Validator.max()


  // IMPLEMENTATION
  // In the form we have an input where we are able to create a username. 
  // Using this input we can simulate checking to see if the username is already taken 
  // If this is the case, then our application should not be able to use said username and instead show an error message
  // Otherwise if the username DOES NOT exist, then we allow the user to enter the username

  // First (SIMULATING OUR DATABASE)
  // 1. We will need to create a function in our noSpaceAllowed.validator.ts class 
    // We'll assume this function is an API to which we are making a call from our Angular application
  
  // 2. We create the function and name it 
    //        function userNameAllowed(){}

  // 3. This function will recieve a username and it will be of type string
    //        function userNameAllowed(username: string){}
  
  // 4. Inside this function we create a variable and we assign an array with names taken
    //        const takenUserNames = ['marcotorres', 'webdev', 'procademy']
  // The idea is that this variable will be reading from the database, but instead we use the array to mimick a DB 

  // 5. Now we return a Promise, to do this we use a promise contructor
  //          return new Promise()

  // 6. To this constructor we need to pass a callback function
  //          return new Promise(() => {})

  // 7. And this call back function is going to recieve two arguments 
  //          return new Promise((resolve, reject) => {}) 
  // REMEMBER THAT A PROMISE ALWAYS NEEDS TO BE RESOLVED (so we need to return a promise)

  // 8. Inside this function, we will use setTimeout
  //          return new Promise((resolve, reject) => {setTimeout })
  // This is done to simulate the passage of time

  // 9. The setTimeout function also takes a callback function
  //          setTimeout(() => {})

  // 10. The setTimeout function also needs a time interval
  //          setTimeout(() => {}, 5000)

  // Currently from our client we are making a request to this API userNameAllowed
  // And this API will return us a response after 5 seconds, so after 5 seconds the callback funtion will be executed
  // from within this call back function we will return some data. 

  //          function userNameAllowed(username: string){
  //            const takenUserNames = ['marcotorres', 'webdev', 'procademy']

  //            return new Promise((resolve, reject) => {
  //              setTimeout(() => {
            
  //              }, 5000)
  //            });
  //          }


  // 1. Inside this callback function we place an if statement stating 
  //  if the username being used in the method, if it already exists inside the takenUserName array
  //           if(takenUserNames.includes(username))
  //  if the username exists inside the takenUserNames array, the includes() method will return true, otherwise it will return false

  // 2. So if username does exist, we resolve the promise
  //           resolve({})

  // 3. In the object within the resolve we will specify an error code
  //            resolve({checkUsername: true})

  // 4. ELSE, if the username does not exist in the array 
  //            resolve(null)
  // We want to return a promise so we use resolve, this means there is no user within takeUserNames

  // The full Promise looks like so...
//              return new Promise((resolve, reject) => {
//                setTimeout(() => {
//                  if(takenUserNames.includes(username)){
//                      resolve({checkUsername: true})
//                  } else {
//                      resolve(null)
//                  }
//                }, 5000)
//              });


// Now we can move on to creating our custom validator within our CustomValidators class
// Remember that a Validator is just a method 

// 1. We create the method name
//            static checkUsername(){}

// 2. We specify a parameter for this method 
//            static checkUsername(control: AbstractControl){}
// Since we are retrieving for formgroup/formarry/formcontrol it needs to be of type AbstractControl
// This reason we can use it for all three is because all three are childs of AbstractControl

// 3. Within the method, we'll call it userNameAllowed function and pass in the value property of the formControl control property
// This property contains the value property which stores primitive datatypes 
//            userNameAllowed(control.value)
// The idea being that when we use checkUsername in a form, said form will contain a value within that formControl
// That value will then be assigned to the userNameAllowed parameter

// 4. The userNameAllowed function will return us a Promise, so the async validator should also return a promise or an observable
//  Since it's a Promise/Observabe, we expect a return. So....
//            static checkUsername(control: AbstractControl): Promise<any>{
//                return userNameAllowed(control.value)
//            }

// With this we have created an async validator, this validator must return a promise or an observable
// So when we use checkUsername Validator, it will check call the userNameAllowed function
// That function will return a Promise 
// if the name exists, the promise will return as checkUsername: true
// else if the name does not exist, it will return a promise with the value null


// Now we can use it in our FormGroup username FormControl
// 1. Currently we have it as null since we don't want any set value 
//            username: new FormControl(null),

// 2. Now the second argument should be a list of sync validators that we want to use on the formControl
//            username: new FormControl(null, Validators.required),
// In this case we add the Validators.required.
// If we are using multiple sync validators we wrap it in an array, in this case we aren't

// 3. We then add the third argument, the async validators
//            username: new FormControl(null, Validators.required, CustomValidators.checkUsername),
// Keep in mind the third argument should always be the async validators

// If we check the template we can see that the input element will have have the usual  css classes ie. ng-pristine...
// If we place a value inside this input we will see ng-pending
// This will start our async validation (5 sec), depending on the outcome we will revieve either ng-valid or ng-invalid

// If we want, we can use the ng-pending class to show a border while the data is being varified
//            input.ng-pending{
//              border: yellow 2px solid;
//            }

// ALWAYS REMEMBER THAT AN ASYNC VALIDATOR MUST RETURN A PROMISE OR OBSERVABLE
// AND REST OF IMPLEMENTATION IS THE SAME AS A SYNC VALIDATOR
}
