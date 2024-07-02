
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public proyecto: any = {anio: '2024', nombreProyecto: 'D - UNA'};
  public tecnologia: any = {leyenda: 'Development ', tec1: 'Angular ', tec2: 'D - UNA'};
  public autor: string = '';
}
