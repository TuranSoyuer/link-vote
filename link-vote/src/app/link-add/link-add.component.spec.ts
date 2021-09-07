import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinkAddComponent} from './link-add.component';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LinkService} from "../services/link.service";

describe('LinkAddComponent', () => {
  let component: LinkAddComponent;
  let fixture: ComponentFixture<LinkAddComponent>;
  let linkService: LinkService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkAddComponent],
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        LinkService,
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkAddComponent);
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
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form', () => {
    expect(linkService.links.length).toBe(2);
    component.linkForm = formBuilder.group({
      name: ['Link Name'],
      url: ['Link Url']
    });
    component.onSubmit();
    expect(linkService.links.length).toBe(3);
  });

  it('should disable form', () => {
    component.linkForm = formBuilder.group({
      name: [''],
      url: ['']
    });
    expect(component.isSubmitDisabled()).toBe(true);
  });
});
