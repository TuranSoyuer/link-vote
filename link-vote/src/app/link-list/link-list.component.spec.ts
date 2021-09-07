import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkListComponent} from './link-list.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LinkService, SortOption} from "../services/link.service";

describe('LinkListComponent', () => {
  let component: LinkListComponent;
  let fixture: ComponentFixture<LinkListComponent>;
  let linkService: LinkService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkListComponent],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatPaginatorModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [LinkService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    linkService = TestBed.inject(LinkService);
    linkService.links = [
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    expect(component.links.length).toBe(2);
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should up vote', () => {
    component.upVote(component.links[0]);
    expect(component.links[0].point).toBe(6);
  });

  it('should down vote', () => {
    component.downVote(component.links[0]);
    expect(component.links[0].point).toBe(4);
  });

  it('should change order by option', () => {
    const option: SortOption = {
      sortBy: 'vote',
      desc: true
    };
    component.orderByChange(option);
    expect(linkService.sortOption.sortBy).toBe('vote');
    expect(linkService.sortOption.desc).toBe(true);
  });

  // it('should open delete confirm dialog', () => {
  //   component.openDeleteConfirmDialog("Hacker News");
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('#mat-dialog-title-0').textContent).toBe('Remove Link');
  // });
});
