import { Component, inject } from '@angular/core';

// =
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-change-theme',
  standalone: true,
  imports: [],
  templateUrl: './change-theme.component.html',
  styleUrl: './change-theme.component.scss',
})
export class ChangeThemeComponent {
  protected readonly themeService = inject(ThemeService);
}
