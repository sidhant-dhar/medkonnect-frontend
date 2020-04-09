export class PersonalData {
    public name = '';
    public email = '';
    public mobile = '';
    public state = '';
    public hospitalAddress = '';
    public pincode = '';
    public MCInumber = '';
    // public homeMade = false;
  }
export class ContactRequest {
    public personalData: PersonalData;
    public materialsRequired: any;
    public homeMade = false;
  }
