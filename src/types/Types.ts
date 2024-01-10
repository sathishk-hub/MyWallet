import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type User = {
  email: string;
  password: string;
};
export type customEnter = {
  service?: string;
  amount?: number;
};

export type wallet = {
  position?: number;
  createdAt?: string;
  service?: string;
  amount?: number;
  type?: string;
  userId?: string;
  docId?: string;
  createdMonth?: string;
};


export type chartData = {
 spentData:wallet[];
 earnData:wallet[]
};