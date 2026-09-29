export interface Account {
  _id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  image_id: string | null;
  name?: string;
}

export interface AuthSession extends Account {
  token: string;
}
