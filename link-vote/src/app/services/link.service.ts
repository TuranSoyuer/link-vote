import {Injectable} from '@angular/core';

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

  constructor() {
    // todo delete
    // localStorage.clear();

    let linksStored = localStorage.getItem("links");
    if (linksStored === null) {
      localStorage.setItem("links", JSON.stringify(this.links));
    } else {
      this.links = JSON.parse(linksStored);
    }
  }

  getLinks(): Link[] {
    return this.links;
  }

  addLink(name: string, url: string, point: number): void {
    let link: Link = {
      name: name,
      url: url,
      point: point
    }
    this.links.push(link);
    localStorage.setItem("links", JSON.stringify(this.links));
  }

  deleteLink(name: string): void {
    this.links = this.links.filter(link => link.name !== name);
    localStorage.setItem("links", JSON.stringify(this.links));
  }
}

export interface Link {
  name: string,
  url: string,
  point: number,
  createTs?: Date
}
