// types.ts
export interface RootState {
     dashboard: DashboardState; // Assuming you have a DashboardState type
     login: LoginState;
   }
   
   export interface DashboardState {
     // Define your dashboard state properties here
   }
   
   export interface LoginState {
     userData: UserData | null;
   }
   
   export interface UserData {
     // Define the properties of your user data here
   }
   