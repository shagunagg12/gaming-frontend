export interface UserSettingsTypes {
    api: {
      apiKey: string;
      usageLimit: number;
      _id: string;
    };
    community: {
      excludeFromRain: boolean;
      _id: string;
    };
    countryCode: string;
    createdAt: string;
    email: string;
    emailVerified: boolean;
    ignoredUsers: any[]; 
    offers: {
      newsletterSubscribed: boolean;
      promotionalEmails: boolean;
      receiveEmailOffers: boolean;
      receiveSMSOffers: boolean;
      _id: string;
    };
    phoneVerified: boolean;
    preferences: {
      theme: string;
      language: string;
      fiatNumberFormat: string;
      _id: string;
    };
    privacy: {
      ghostMode: boolean;
      hideStats: boolean;
      hideRaceStats: boolean;
      _id: string;
    };
    security: {
      twoFactorAuthEnabled: boolean;
      loginAlerts: boolean;
      _id: string;
    };
    sessions: {
      activeSessions: any[];
      _id: string;
    };
    updatedAt: string;
    phoneNumber: string;
    user: {
      _id:string;
      email: string;
      countryCode: string;
      phoneNumber: string;
      username: string;
    };
    verification: {
      level1: object; 
      level2: object; 
      level3: object; 
      level4: object; 
      _id: string;
    };
    __v: number;
    _id: string;
  }


  export interface LevelOne {
  firstname: string;
  lastname: string;
  country: string;
  placeOfBirth: string;
  dateOfBirth: string;
  address: string;
  city: string;
  postalCode: string;
  occupationIndustry: string;
  occupation: string;
  experience: string;
}
