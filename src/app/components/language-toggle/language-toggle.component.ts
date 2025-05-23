import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { LanguageService } from '../../services/language.service';
import { addIcons } from 'ionicons';
import { languageOutline, languageSharp, language } from 'ionicons/icons';

@Component({
  selector: 'app-language-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon, IonText]
})
export class LanguageToggleComponent implements OnInit {
  currentLang$ = this.languageService.currentLang$;
  
  constructor(private languageService: LanguageService) {
    addIcons({
      'language-outline': languageOutline,
      'language': language,
      'language-sharp': languageSharp
    });
  }

  ngOnInit() {}

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }
}
