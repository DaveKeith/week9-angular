import { Response } from '@angular/http';
import { PersonService } from '../services/person.services';
import Person from '../models/person.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent implements OnInit {

constructor(
  // Private todoservice will be injected into the component by Angular Dependency Injector
  private personService: PersonService
) { }

// Declaring the new person Object and initilizing it
public newPerson: Person = new Person();

// An Empty list for the visible person list
personsList: Person[];


ngOnInit(): void {
  // At component initialization the
  this.personService.getPersons()
  .subscribe(todos => {
    // assign the todolist property to the proper http response
    this.personsList = todos;
    console.log(todos);
  });
}

// This method will get called on Create button event
create() {
  this.personService.createPerson(this.newPerson)
    .subscribe((res) => {
      this.personsList.push(res.data);
      this.newPerson = new Person();
    });
    window.location.href = '/';
}

  deletePerson(person: Person) {
    this.personService.deletePerson(person._id).subscribe(res => {
      this.personsList.splice(this.personsList.indexOf(person), 1);
    });
  }

}
