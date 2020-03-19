enum Role {
  SUPERUSER = 'superuser',
  USER = 'user'
}

export class User {
  constructor(
    public id?: string,
    public username?: string,
    public roles?: Role[]
  ) { }
}
