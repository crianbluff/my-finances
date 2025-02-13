export class User {
  public uid:string;
  public email:string;
  public name:string;

  constructor( obj:DataObjUser ) {
    this.uid = obj && obj.uid || null;
    this.email = obj && obj.email || null;
    this.name = obj && obj.name || null;
  }
};

interface DataObjUser {
  uid: string;
  email: string;
  name: string;
}