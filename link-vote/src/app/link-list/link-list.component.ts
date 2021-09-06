import { Component, OnInit } from '@angular/core';
import { Link, links } from './links';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  links: Link[] = links;

  constructor() { }

  ngOnInit(): void {
  }

}


