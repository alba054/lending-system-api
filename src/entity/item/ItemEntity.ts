export class ItemEntity {
  private _name!: string;
  private _stock?: number | undefined;
  private _id?: string | undefined;
  private _description?: string | undefined;
  private _thumbnail?: string | undefined;
  private _totalItem?: number | undefined;

  constructor(
    name: string,
    args?: {
      stock?: number;
      id?: string;
      description?: string;
      thumbnail?: string;
      totalItem?: number;
    }
  ) {
    this.id = args?.id;
    this.name = name;
    this.stock = args?.stock;
    this.description = args?.description;
    this.thumbnail = args?.thumbnail;
    this.totalItem = args?.totalItem;
  }

  public get totalItem(): number | undefined {
    return this._totalItem;
  }

  public set totalItem(value: number | undefined) {
    this._totalItem = value;
  }

  public get thumbnail(): string | undefined {
    return this._thumbnail;
  }

  public set thumbnail(value: string | undefined) {
    this._thumbnail = value;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public set description(value: string | undefined) {
    this._description = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get stock(): number | undefined {
    return this._stock;
  }

  public set stock(value: number | undefined) {
    this._stock = value;
  }

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string | undefined) {
    this._id = value;
  }
}
