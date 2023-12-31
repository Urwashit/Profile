export interface User {
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNo: number;
}
export interface UserDb extends User {
  _id: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserDb;
}
