export interface AdministratorAccount {
  _id: string;
  profiles: string[];
}

export interface HasAdministrators {
  accounts?: AdministratorAccount[];
}
