import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators,AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!:FormGroup
  selectedFile: File | null = null;

  constructor(private _Auth:AuthService,private _Router:Router,private toastr:ToastrService) {
  }
  ngOnInit(): void {
    this.createForm();
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createForm():void{
    this.registerForm =new FormGroup({
      fName:new FormControl('',[Validators.required]),
      lName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      address:new FormControl('',[Validators.required]),
      phoneNumber:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
      dob:new FormControl('',[Validators.required]),
      drivingLic:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/)]),
      confirmPassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/)]),
    },{ validators:this.PasswordMatched})

  }
  PasswordMatched(registerForm:any){
    let pass=registerForm.get('password')
    let rePass=registerForm.get('confirmPassword')
    if(pass?.value==rePass?.value){
      return null
    }else{
      rePass?.setErrors({PasswordMatched: 'Repassword does not match password'})
      return {PasswordMatched: 'Repassword does not match password'}

    }
  }

  alreadyReg(){
    this._Router.navigate(['/login'])
  }

  register() {
    if (!this.selectedFile || !this.registerForm.valid) return;

    const formData = new FormData();
    formData.append('drivingLic', this.selectedFile);
    formData.append('email', this.registerForm.value.email);
    formData.append('address', this.registerForm.value.address);
    formData.append('phoneNumber', this.registerForm.value.phoneNumber);
    formData.append('dob', this.registerForm.value.dob);
    formData.append('confirmPassword', this.registerForm.value.confirmPassword);
    formData.append('fName', this.registerForm.value.fName);
    formData.append('lName', this.registerForm.value.lName);
    formData.append('password', this.registerForm.value.password);

    this._Auth.register(formData).subscribe({
      next:res =>{
        console.log(res)
        console.log(formData);
        if(res.message=='success'){
          this.toastr.success('You are registerd successfully', 'Success',{
            timeOut: 1500,
          });
          this._Router.navigate(['/login'])
        }
        },
        error:err=>{
          console.log(err);
          console.log(formData);
          this.toastr.warning(err.error.message, 'Ooops',{
            timeOut: 1500,
          });
        }
    }
    );
  }
  // register(formData:FormGroup){
  //   if(formData.valid){
  //     this._Auth.register(formData.value).subscribe({
  //       next:res =>{
  //         console.log(res)
  //         console.log(formData.value);

  //         if(res.message=='success'){
  //           this.toastr.success('You are registerd successfully', 'Success',{
  //             timeOut: 1500,
  //           });
  //           this._Router.navigate(['/login'])
  //         }
  //         },
  //         error:err=>{
  //           console.log(err);
  //           console.log(formData.value);
  //           this.toastr.warning(err.error.message, 'Ooops',{
  //             timeOut: 1500,
  //           });

  //         }
  //       }
  //     )
  //   }
  // }
  }




