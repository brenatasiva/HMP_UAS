export class CollectionModel {
  public idcollection: number;
  public namaCollection: string;
  public username: string;

  constructor(idcollection: number, namaCollection: string, username: string) {
    this.idcollection = idcollection;
    this.namaCollection = namaCollection;
    this.username = username;
  }
}
