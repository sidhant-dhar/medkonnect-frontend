// export class ContactRequest {
//    public personalData: PersonalData;
//     public requestType: any;
//     public text: string;
//   }

  export class PersonalData {
    public name = '';
    public email = '';
    public mobile = '';
    public state = '';
    public hospitalAddress = '';
    public pincode = 0;
    // public homeMade = false;
  }
export class ContactRequest {
    public personalData: PersonalData;
    public materialsRequired: any;
    public homeMade = false;
  }

//   export class PersonalData {
//     public email: string = '';
//     public mobile: string = '';
//     public country: string = '';
//   }
