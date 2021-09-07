import {Component, OnInit} from '@angular/core';
import {LinkService} from "../services/link.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-link-add',
  templateUrl: './link-add.component.html',
  styleUrls: ['./link-add.component.css']
})
export class LinkAddComponent implements OnInit {
  linkForm = this.formBuilder.group({
    name: ['', Validators.required],
    url: ['', Validators.required]
  });

  constructor(private linkService: LinkService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // console.log('form data is ', this.linkForm.value);
    this.linkService.addLink(this.linkForm.value.name, this.linkForm.value.url, 0);
  }

}


