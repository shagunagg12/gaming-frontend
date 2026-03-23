// Interface for a Tournament within a class
interface Tournament {
    id: number;
    name: string;
    importance: number;
  }
  
  // Interface for a Class with its tournaments
  interface ClassData {
    class_id: number;
    class_name: string;
    class_hash_image: string;
    tournaments: Tournament[];
  }
  
  // Interface for the response containing class data
  interface ClassResponse {
    data: ClassData[];
    message: string;
  }
  interface Country {
    id: number;
    name: string;
    flag: string;
    alpha: string;
    importance: number;
    hash_image: string;
  }
  interface GeneralSettings {
    phone: string;  
    countryCode: string;
    email: string;
  }
  

  export default ClassResponse
  export type {Tournament,Country, GeneralSettings}