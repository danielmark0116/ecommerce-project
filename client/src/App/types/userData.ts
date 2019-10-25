export interface userData {
  userName: string;
  userEmail: string;
  userPic: string;
  userOrders: string[];
  userAddresses: any[];
  isAdmin: Boolean;
  isLoggedIn: Boolean;
}

export interface providerUserData {
  providerId: string;
  email: string;
  name: string;
  userPic: string;
  providerToken: string;
}
