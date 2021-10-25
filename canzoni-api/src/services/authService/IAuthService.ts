export interface IUserShorData {
  name: string;
  rooms?: string[];
  token: string;
  exp: number;
}

export interface IAuthService {
  getJwtToken(email: string, password: string): Promise<IUserShorData>;

  updateToken(userId: string, room: string): Promise<{ token: string, exp: number, room: string }>;
}
