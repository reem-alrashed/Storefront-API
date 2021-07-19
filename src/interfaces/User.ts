export interface UserType {
    firstName: string;
    lastName: string;
    password: string;
  }
  export interface UserReturnType {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
  }
  export interface UserCreatedReturnType {
    auth: boolean;
    token: string;
  }

  