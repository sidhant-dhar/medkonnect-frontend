export class PersonalData {
    public email = '';
    public password: '';
    public name = '';
    public state = '';
    public city = '';
    public address = '';
    public phoneNo = '';
    public pinCode = '';
    public companyRegnNo = '';
    public token?: '';
  }
export class ContactRequest {
    public personalData: PersonalData;
    public materialsRequired: any;
    public homeMade = false;
  }
