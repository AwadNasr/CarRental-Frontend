import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  constructor(private _FormBuilder:FormBuilder,private _Auth:AuthService,private _Router:Router,private toastr: ToastrService) {
  }
  createForm():void{
    this.loginForm =this._FormBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/)]],
    })
  }
  ngOnInit(): void {
    this.createForm();
  }
  id:any
  login(formData:FormGroup){
    if(formData.valid){
      this._Auth.login(formData.value).subscribe({
        next:res =>{
          if(res.message=='success')
            {
            localStorage.setItem("CurrentToken",res.token)
            localStorage.setItem("UserName",res.userName)
            localStorage.setItem("UserId",res.id)
            console.log(res);
            this._Auth.decode();
            this.toastr.success('You are logged in successfully', 'Hi '+ res.userName,{
              timeOut: 1500,
            });
            this._Router.navigate(['/home'])
          }
          },
          error:(err) =>{
            this.toastr.warning(err.error.message, 'Ooops',{
              timeOut: 1500,
            });
          }
        }
      )
    }
  }
}
