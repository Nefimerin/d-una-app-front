
export class RoleDto{
    roleId: number;
    name:string;
    description:string;
  
  
    constructor(
      name: string,
      description: string,
      roleId: number
  
  ) {
      this.name = name;
      this.description = description;
      this.roleId = roleId;
  }
  }