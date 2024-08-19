import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequestDto } from 'src/app/model/UserDto';
import { UserService } from 'src/app/service/user/user.service';
import { RoleService } from 'src/app/service/role/role.service'; // Importar RoleService
import Swal from 'sweetalert2';
import { passwordValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  errores!: string[];
  roles: any[] = [];
  userModel: UserRequestDto = new UserRequestDto(0, '', '', '', '', '', []);

  constructor(
    private userService: UserService,
    private roleService: RoleService, 
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.createFormUser();
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  createFormUser() {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), passwordValidator()]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      roleIds: new FormControl([], [Validators.required])
    });
  }

  loadRoles() {
    this.roleService.findAll().subscribe(
      roles => {
        this.roles = roles;
      },
      err => {
        console.error('Error al cargar los roles', err);
        Swal.fire('Error', 'No se pudieron cargar los roles', 'error');
      }
    );
  }

  saveUser() {
    Object.assign(this.userModel, this.userForm.value);
    console.log(this.userForm.value);
    this.userService.saveUser(this.userModel).subscribe(
      response => {
        Swal.fire('Usuario registrado!', `Usuario ${response.firstName} ${response.lastName} ha sido creado!`, 'success');
        this.router.navigate(['/users/list']);
      },
      err => {
        this.errores = err.error as string[];
        console.error('Código del error desde el backend: ' + err.status);
        Swal.fire('Usuario NO registrado!', err.error.message, 'error');
      }
    );
  }

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get address() { return this.userForm.get('address'); }
  get roleIds() { return this.userForm.get('roleIds'); }
}
