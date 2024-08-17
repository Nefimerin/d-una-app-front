import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRequestDto } from 'src/app/model/UserDto';
import { RoleService } from 'src/app/service/role/role.service';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  userForm !: FormGroup;
  errores !: string [];
  roles: any[] = []; // Variable para almacenar los roles
  userModel: UserRequestDto = new UserRequestDto(0, '', '', '', '', '', []);



  constructor(private userService: UserService, private frombuilder: FormBuilder, private router: Router, private roleService: RoleService) {
    this.userForm = this.createFormUser();
    
  }

  ngOnInit(): void {
    this.loadRoles(); // Cargar los roles al iniciar el componente
  
    const userId = +localStorage.getItem('userId')!;
    this.userService.findUserById(userId).subscribe(
      response => {
        const responseData = response;
        console.log(responseData)
        if (responseData) {
          this.userForm.patchValue({
            id: responseData.id,
            firstName: responseData.firstName,
            lastName: responseData.lastName,
            roles: responseData.roles,
            email: responseData.email,
            address: responseData.address,
          });
        }
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }


  createFormUser() {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
  get address() { return this.userForm.get('address'); }
  get roleIds() { return this.userForm.get('roleIds'); }

}
