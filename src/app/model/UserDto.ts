export class UserRequestDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  roleIds: number[];


  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    roleIds: number[]
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.roleIds = roleIds;
  }
}
