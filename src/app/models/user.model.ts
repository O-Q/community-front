enum Role {
  SUPERUSER = 'superuser',
  USER = 'user'
}

export class User {
  username: string;
  role: Role;
}
