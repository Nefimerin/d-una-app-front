export class UserResponseDto {
    id: number;
    firstName: string;
    lastName: string;
    roles: RoleDto[];
    email: string;
  
    constructor(id: number, firstName: string, lastName: string, roles: RoleDto[], email: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.roles = roles;
      this.email = email;
    }
  }
  
  export class RoleDto {
    id: number;
    name: string;
  
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }
  }
  