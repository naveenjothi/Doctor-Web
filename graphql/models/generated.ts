export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

/** User */
export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  provider?: InputMaybe<Scalars['String']>;
  providerId: Scalars['String'];
};

export type LoginUserDto = {
  __typename?: 'LoginUserDto';
  accessToken: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedBy?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  expireIn: Scalars['DateTime'];
  firstName: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  isDeleted: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  mobileVerified: Scalars['Boolean'];
  profileName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
};

/** User */
export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Scalars['String'];
};


export type MutationCreateUserArgs = {
  payload: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  findAllUser: Array<UserDto>;
  findOneUser: UserDto;
  findOneUserByEmail: UserDto;
  loginUser: LoginUserDto;
  loginUserWithGoogle: UserDto;
};


export type QueryLoginUserArgs = {
  payload: LoginUserInput;
};

export type UserDto = {
  __typename?: 'UserDto';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  deletedBy?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  isDeleted: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  mobileVerified: Scalars['Boolean'];
  profileName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  updatedBy?: Maybe<Scalars['String']>;
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', findOneUser: { __typename?: 'UserDto', firstName: string, lastName?: string | null, email: string, emailVerified: boolean, mobile?: string | null, mobileVerified: boolean, profileName?: string | null } };

export type LoginUserWithGoogleQueryVariables = Exact<{ [key: string]: never; }>;


export type LoginUserWithGoogleQuery = { __typename?: 'Query', loginUserWithGoogle: { __typename?: 'UserDto', email: string } };

export type LoginUserQueryVariables = Exact<{
  payload: LoginUserInput;
}>;


export type LoginUserQuery = { __typename?: 'Query', loginUser: { __typename?: 'LoginUserDto', accessToken: string, email: string, firstName: string, lastName?: string | null, emailVerified: boolean, expireIn: any, mobile?: string | null, profileName?: string | null } };
