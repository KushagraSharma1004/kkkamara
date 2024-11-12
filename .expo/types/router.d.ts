/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/BottomNavBar` | `/BuyAndSell` | `/Club` | `/CreateNewPassword` | `/Education` | `/Entertainment` | `/ForgotPassword` | `/Games` | `/Health` | `/Home` | `/LocalVendors` | `/Menu` | `/MyBeat2ScoreHistory` | `/MyBeatScoreHistory` | `/OTPConfirmation` | `/Profile` | `/RechargeOptions` | `/RechargePayment` | `/Referral` | `/Shopping` | `/SignUp` | `/Travelling` | `/VenderRegistration` | `/Wallet` | `/_sitemap` | `/firebaseConfig`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
