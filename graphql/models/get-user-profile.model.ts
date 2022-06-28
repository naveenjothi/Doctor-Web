export interface GetUserProfileQuery {
  data: Data;
}
export interface Data {
  findOneUser: FindOneUser;
}
export interface FindOneUser {
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  mobile?: null | string;
  mobileVerified: boolean;
  profileName: string;
}
