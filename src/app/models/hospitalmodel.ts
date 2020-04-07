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
    public pincode: Number = 0;
    public homeMade = false;
  }
export class ContactRequest {
    public personalData: PersonalData;
    public requestType: any = '';
    public text = '';
  }

//   export class PersonalData {
//     public email: string = '';
//     public mobile: string = '';
//     public country: string = '';
//   }
