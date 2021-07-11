import { Component, OnInit, ErrorHandler, HostListener } from '@angular/core';
import { Section } from '../../models/section.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sections: Section[] = []

  inputId: string

  types: string[] = ['image/png', 'image/jpeg', 'image/jpg']

  lastIndex: number

  static instancesCount = 0;

  constructor(
    private errorHandler: ErrorHandler,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.makeEmptySection()
  }

  makeEmptySection() {
    for (let i = 0; i <= 5; i++) {
      this.sections.push(new Section({ id: i, img: '', inputId: `file-uploader-input-${DashboardComponent.instancesCount++}` }))
      this.lastIndex = i
    }
  }

  onFileSelected($event, selectedSection: Section) {
    let files = $event.target.files
    if ((files.length === 1)) {
      for (const file of files) { this.uploadFile(file, selectedSection) }
    } else {
      return this.errorHandler.handleError(`Only single file format supported`);
    }
  }

  uploadFile(file: File, selectedSection: Section) {
    if (this.types && this.types.length) {
      let match = false;
      if (this.types.find((i) => i === file.type)) {
        match = true;
      }
      if (!match) {
        return this.errorHandler.handleError(`Only png, jpeg, jpg file format supported`);
      }
    }
    let imgUrl = URL.createObjectURL(file)
    let img = this.sanitizer.bypassSecurityTrustUrl(imgUrl)
    if (selectedSection.img) { selectedSection.img = img } else {
      for (let section of this.sections) {
        if (!section.img) { return section.img = img }
      }
    }
  }

  remove(index) {
    this.sections.splice(index, 1);
    this.lastIndex = this.lastIndex + 1
    this.sections.push(new Section({ id: this.lastIndex, img: '', inputId: `file-uploader-input-${DashboardComponent.instancesCount++}` }))
  }
}
