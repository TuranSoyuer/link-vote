import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LinkService {

  links: Link[] = [
    {
        name: 'Hacker News',
        url: 'https://news.ycombinator.com/',
        point: 5
    },
    {
        name: 'Product Hunt',
        url: 'https://producthunt.com/',
        point: 10
    },
]

  constructor() { }

  getLinks(): Link[] {
    return this.links;
  }

  addLink(): void {

  }

  deleteLink(): void {

  }

}

export interface Link {
  name: string,
  url: string,
  point: number
}
