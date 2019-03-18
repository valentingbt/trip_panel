import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const map = L.map('map').setView([47.45733, -2.081144], 6);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'MAP'
    }).addTo(map);
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

}
