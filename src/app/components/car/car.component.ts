import { Component } from '@angular/core';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  cars!:any[]
  constructor(private _CarService:CarService){
  }
  ngOnInit(): void {
    this._CarService.getAllCars().subscribe({
      next:res=>{
        console.log(res);
        this.cars=res
      },
      error:err=>{
        console.log(err);

      }
    })

  }

}
