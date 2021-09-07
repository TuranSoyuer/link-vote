import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Link, LinkService, SortOption, SortOptionWrapper} from '../services/link.service';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../common/confirm-dialog/confirm-dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit, OnDestroy {

  links: Link[] = [];

  orderByOptions: SortOptionWrapper[] = [
    {value: {sortBy: "vote", desc: true}, viewValue: 'Most Voted'},
    {value: {sortBy: "vote", desc: false}, viewValue: 'Less Voted'}
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Link> = new MatTableDataSource<Link>(this.links);

  constructor(private linkService: LinkService,
              public dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  ngOnInit(): void {
    this.getLinks();
  }

  getLinks() {
    this.links = this.linkService.getLinks();
    this.dataSource = new MatTableDataSource<Link>(this.links);
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.obs = this.dataSource.connect();

  }

  openDeleteConfirmDialog(name: string): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {header: "Remove Link", message: "Do you want to remove:", name: name}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.linkService.deleteLink(result);
      this.getLinks();
    });
  }

  upVote(link: Link): void {
    this.linkService.changeVote(link.name, 1);
    this.getLinks();
  }

  downVote(link: Link): void {
    this.linkService.changeVote(link.name, -1);
    this.getLinks();
  }

  orderByChange(value: SortOption) {
    this.linkService.changeSortOption(value);
    this.getLinks();
  }
}




