export class EntryEgress {
  description: string;
  amount: number;
  type: string; 
  uid?: string;

  constructor( obj:DataObjEntryEgress ) {
    this.description = obj && obj.description || null;
    this.amount = obj && obj.amount || null;
    this.type = obj && obj.type || null;
    // this.uid = obj && obj.uid || null;
  }
};

interface DataObjEntryEgress {
  description: string;
  amount: number;
  type: string; 
  uid?: string;
};