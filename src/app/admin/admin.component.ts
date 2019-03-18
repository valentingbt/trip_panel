import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';

import { EventService } from './event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private eventService: EventService, private router: Router) { }

  public ngOnInit() {
  }

  eventForm = new FormGroup({
    date: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    isDone: new FormControl('', [Validators.required]),
    longitude: new FormControl(''),
    latitude: new FormControl('')
  })

  get date(): any { return this.eventForm.get('date'); }
  get name(): any { return this.eventForm.get('name'); }
  get description(): any { return this.eventForm.get('description'); }
  get isDone(): any { return this.eventForm.get('isDone'); }
  get longitude(): any { return this.eventForm.get('long'); }
  get latitude(): any { return this.eventForm.get('lat'); }


  addEvent() {
    if (!this.eventForm.valid) {
      alert("Tous les champs obligatoires ne sont pas remplis");
      return
    }

    let {
      date,
      name,
      description,
      isDone,
      longitude,
      latitude
    } = this.eventForm.getRawValue();

    this.eventService.addEvent(date, name, description, isDone, longitude, latitude)
      .subscribe(data => {
        alert("L'évenement à bien été ajouté !");
      })




  }



}