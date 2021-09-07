import {Component, OnInit} from '@angular/core';
import {Link, LinkService} from '../services/link.service';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {

  links: Link[] = [];

  constructor(private linkService: LinkService) {
  }

  ngOnInit(): void {
    this.links = this.linkService.getLinks();

  }

  deleteLink(name: string): void {
    this.linkService.deleteLink(name);
    this.links = this.linkService.getLinks();
  }
}


