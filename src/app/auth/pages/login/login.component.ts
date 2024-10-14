import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/protected/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

loginForm: FormGroup = this.fb.group({
    usuario: [
        '',
        [
            Validators.required,
            //Validators.minLength(3) /* , Validators.maxLength(10) */,
        ],
    ],
    contrasena: [
        '',
        [
            Validators.required,
            //Validators.minLength(3) /* , Validators.maxLength(10) */,
        ],
    ],
  });

  error: boolean = false;
  msgError: string = '';

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  campoEsValido(campo: string) {
    return (
      this.loginForm.controls[campo].errors &&
      this.loginForm.controls[campo].touched
    );
  }

campoErrorMsg(campo: string) {
    console.log('ERRORS', this.loginForm.controls[campo]?.errors);
    if (this.loginForm.controls[campo]?.errors?.['required']) {
        return `Este campo es requerido.`;
    }
    /*if (this.loginForm.controls[campo]?.errors?.['minlength']) {
        const value =
            this.loginForm.controls[campo]?.errors?.['minlength']
                .requiredLength;
        return `Este campo debe tener mínimo ${value} caracteres.`;
    }
    if (this.loginForm.controls[campo]?.errors?.['maxlength']) {
        const value =
            this.loginForm.controls[campo]?.errors?.['maxlength']
                .requiredLength;
        return `Este campo debe tener máximo ${value} caracteres.`;
    }*/
    return;
}

  login() {
    console.log('this.loginForm.value', this.loginForm.value);
    console.log('this.loginForm.invalid', this.loginForm.invalid);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.usuariosService
      .login(this.loginForm.value)
      .subscribe((resp) => {
          console.log('logi respuesa', resp);
          
          if(resp.ok === true) {
            localStorage.setItem('token', resp.token);
            this.router.navigateByUrl('/index');
          } else {
            this.error = true;
            this.msgError = resp;
          }
        
        }
      );

  }

}
