export interface Authentication {
  data: Data;
}

export interface Data {
  authenticate: Authenticate;
}

export interface Authenticate {
  accessToken: string;
  refreshToken: string;
}
