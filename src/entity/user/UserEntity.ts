export class UserEntity {
  private _name!: string;
  private _password?: string | undefined;
  private _id?: string | undefined;

  constructor(name: string, args?: { password?: string; id?: string }) {
    this.id = args?.id;
    this.name = name;
    this.password = args?.password;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get password(): string | undefined {
    return this._password;
  }

  public set password(value: string | undefined) {
    this._password = value;
  }

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string | undefined) {
    this._id = value;
  }
}
