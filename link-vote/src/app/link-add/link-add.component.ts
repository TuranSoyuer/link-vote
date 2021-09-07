import {Component, OnInit} from '@angular/core';
import {LinkService} from "../services/link.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-link-add',
  templateUrl: './link-add.component.html',
  styleUrls: ['./link-add.component.css']
})
export class LinkAddComponent implements OnInit {
  linkForm = this.formBuilder.group({
    name: [''],
    url: ['']
  });

  constructor(private linkService: LinkService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  isSubmitDisabled(): boolean {
    if (this.linkForm.value.name.trim() === "" || this.linkForm.value.url.trim() === "") {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.linkForm.value.name.trim() !== "" && this.linkForm.value.url.trim() !== "") {
      this.linkService.addLink(this.linkForm.value.name, this.linkForm.value.url, 0);
    }
  }
}


