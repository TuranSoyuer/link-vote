import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppConstants} from "../common/constants/app.constants";

@Injectable({
  providedIn: 'root',
})
export class LinkService {

  sortOption: SortOption = {
    sortBy: "create",
    desc: true
  }

  links: Link[] = [
    {
      name: 'Hacker News',
      url: 'https://news.ycombinator.com/',
      point: 5,
      createTs: new Date().getTime(),
      voteTs: new Date().getTime()
    },
    {
      name: 'Product Hunt',
      url: 'https://producthunt.com/',
      point: 10,
      createTs: new Date().getTime(),
      voteTs: new Date().getTime()
    },
  ]

  constructor(private snackBar: MatSnackBar) {
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
    this.sortLinks();
    return this.links;
  }

  addLink(name: string, url: string, point: number): void {
    let link: Link = {
      name: name,
      url: url,
      point: point,
      createTs: new Date().getTime(),
      voteTs: new Date().getTime()
    }
    this.links.push(link);
    localStorage.setItem("links", JSON.stringify(this.links));
    this.openSnackBar(link.name + " added.");
  }

  deleteLink(name: string): void {
    this.links = this.links.filter(link => link.name !== name);
    localStorage.setItem("links", JSON.stringify(this.links));
    this.openSnackBar(name + " removed.");
  }

  changeVote(name: string, delta: number): void {
    let link = this.links.find(link => link.name === name);
    if (link) {
      link.point += delta;
      link.voteTs = new Date().getTime();
    }
    localStorage.setItem("links", JSON.stringify(this.links));
  }

  changeSortOption(value: SortOption) {
    this.sortOption.sortBy = value.sortBy;
    this.sortOption.desc = value.desc;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 3000
    });
  }

  sortLinks(): void {
    if (this.sortOption.sortBy == AppConstants.SORT_BY_CREATE) {
      this.links.sort((a, b) => {
        return this.sortOption.desc ? b.createTs - a.createTs : a.createTs - b.createTs;
      });
    } else if (this.sortOption.sortBy == AppConstants.SORT_BY_VOTE) {
      this.links.sort((a, b) => {
        let result = this.sortOption.desc ? b.point - a.point : a.point - b.point;
        if (result == 0) {
          return b.voteTs - a.voteTs;
        }
        return result;
      });
    }
    this.links = this.links.slice(0);
  }
}

export interface Link {
  name: string,
  url: string,
  point: number,
  createTs: number,
  voteTs: number
}

export interface SortOptionWrapper {
  value: SortOption,
  viewValue?: string
}

export interface SortOption {
  sortBy: 'create' | 'vote',
  desc: boolean
}
