import { LentItemEntity } from "../lentItem/LentItemEntity";

export class StudentEntity {
  private _id?: string | undefined;
  private _name!: string;
  private _studentId!: string;
  private _lentItem!: LentItemEntity[];

  constructor(
    name: string,
    studentId: string,
    args?: { id?: string | undefined }
  ) {
    this.name = name;
    this.studentId = studentId;
    this.id = args?.id;
  }

  public get lentItem(): LentItemEntity[] {
    return this._lentItem;
  }

  public set lentItem(value: LentItemEntity[]) {
    this._lentItem = value;
  }

  public get studentId(): string {
    return this._studentId;
  }

  public set studentId(value: string) {
    this._studentId = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string | undefined) {
    this._id = value;
  }
}
