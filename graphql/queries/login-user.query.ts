export const login_user_query = `
query LoginUserQuery($payload:LoginUserInput!){
  loginUser(payload:$payload){
    accessToken
    email
    firstName
    lastName
    emailVerified
    expireIn
    mobile
    profileName
  }
}`;
