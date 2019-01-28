import { Response } from '@angular/http';
import { PersonService } from '../services/person.services';
import Person from '../models/person.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    // Private todoservice will be injected into the component by Angular Dependency Injector
    private personService: PersonService
  ) { }

  personsList: Person[];  


  ngOnInit(): void {

    // At component initialization the
    this.personService.getPersons()
      .subscribe(persons => {
        // assign the todolist property to the proper http response
        this.personsList = persons;
      });
  }

    deletePerson(person: Person) {
      this.personService.deletePerson(person._id).subscribe(res => {
        this.personsList.splice(this.personsList.indexOf(person), 1);
      });
    }
}

