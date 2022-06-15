export const get_user_profile_query = `query GetUserQuery{
  findOneUser{
    firstName
    lastName
    email
    emailVerified
    mobile
    mobileVerified
    profileName
  }
}`;
