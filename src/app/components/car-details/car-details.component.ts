import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/core/services/car.service';
import { RentalService } from 'src/app/core/services/rental.service';
import { ReviewService } from 'src/app/core/services/review.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  constructor(private _CarService:CarService,private _ActivatedRoute:ActivatedRoute,private _ReviewService:ReviewService,private _FormBuilder:FormBuilder,private _RentalService:RentalService){}
  carId:any=0;
  carDetails:any={};
  rentalForm!:FormGroup
  reviewArr:any=[]
  ngOnInit(): void {
    this.carId =Number( this._ActivatedRoute.snapshot.paramMap.get('id'));
      this._CarService.getSpecificCar(this.carId).subscribe({
        next:(res)=> {

          console.log(res);
          this.carDetails = res
        }
      })
      ////////////
      this._ReviewService.getAllReview(this.carId).subscribe({
        next:res=>{
          console.log(res);
          this.reviewArr=res
        }
      })
    }
    createForm():void{
      let dateNow=new Date().toISOString().slice(0, 19).replace('T', ' ');
      this.rentalForm =this._FormBuilder.group({
        start_Date:['',[Validators.required]],
        end_Date:['',[Validators.required]],
        pick_Location:['',[Validators.required]],
        total_Cost:['',[Validators.required]],
        ret_Location:['',[Validators.required]],
        pay_Date:[dateNow,[Validators.required]],
        trans_Id:['',[Validators.required]],
        clientId:[localStorage.getItem("UserId"),[Validators.required]],
        carId:[this.carId,[Validators.required]],
      })
    }
    rent(rentalForm:FormGroup){
      if(rentalForm.invalid){
        this._RentalService.addrental(rentalForm.value).subscribe({
          next:res=>{
           console.log( rentalForm.value);

            console.log(res);
          },
          error:err=>{
            console.log(rentalForm.value);
            console.log(err);


          }
        })
      }
    }
    calculateCost(st_date:any,end_date:any,cost:any):number{
  return ((end_date-st_date)+1)*cost;
    }


  }


