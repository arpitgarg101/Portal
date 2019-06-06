import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Portal';
  selectedLanguage = environment.defaultLanguage;

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.translate.addLangs(environment.supportedLanaguages);
    this.translate.setDefaultLang(environment.defaultLanguage);
    this.translate.use(environment.defaultLanguage);
    this.setDocumentDirection();
  }

  setDocumentDirection() {
    this.translate.onLangChange.forEach((event: LangChangeEvent) => {
      var doc = document.getElementById('htmlDoc');
      doc.setAttribute('dir', environment.rtlLanguages.find(lang => event.lang.indexOf(lang) !== -1) ? 'rtl' : 'ltr');
    });
  }

  changeLanguage() {
    let supportedLanaguages = environment.supportedLanaguages;
    this.selectedLanguage = this.arrayRemove(supportedLanaguages, this.selectedLanguage)[0];
    this.translate.use(this.selectedLanguage);
    var doc = document.getElementById('htmlDoc');
    doc.setAttribute('dir', environment.rtlLanguages.find(lang => this.selectedLanguage.indexOf(lang) !== -1) ? 'rtl' : 'ltr');
  }

  arrayRemove(arr : string[], value : string) {
    return arr.filter(function(ele){
        return ele != value;
    });
  }
}
