export interface User {
  id: number;
  name: string;
  roomNumber: string;
  email: string;

  parcels: Parcel[]

}
export interface Parcel {
  id: number;
  trackingNumber: string;
  user?: User;
  userId?: number;
  
  createdAt: Date;
  updatedAt: Date;
}


