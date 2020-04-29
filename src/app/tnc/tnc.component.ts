import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ncov-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.scss']
})
export class TncComponent implements OnInit {

  public tncArray = [
    {heading : '1. GENRAL INFORMATION',
    // tslint:disable-next-line: max-line-length
    text : [' Non-profit organizations, governmental agencies, private businesses, volunteers or visitors to theSite (collectively referred to as "Authorized Users," and each is individually an "AuthorizedUser"), exclusively under the following terms of service and use (the "Terms"). By using theService, Authorized User states that he or she has read and understands the Terms and agrees tobe bound by them. We reserve the right to terminate an Authorized User\'s account or use of theService at any time, for any reason, including without limitation, if we learn that Authorized Userhas violated these Terms.',
    // tslint:disable-next-line: max-line-length
    'These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Medkonnect.org accessible at https://medkonnect.org/home.',
    // tslint:disable-next-line: max-line-length
    ' These Terms will be applied fully and affect to your use of this Website. By using this Website,you agreed to accept all terms and conditions written in here. You must not use this Website ifyou disagree with any of these Website Standard Terms and Conditions. '
    ]
  },
  {
    heading: '2. USER RESPONSIBILITIES',
    // tslint:disable-next-line: max-line-length
    text: ['Authorized User agrees not to reproduce, sell, resell or exploit for any commercial or non-commercial purposes, any portion of the Service or the Site. Without our written permission,Authorized User may not: (a) allow, enable, or otherwise support the transmission of massunsolicited, commercial advertising or solicitations via e-mail, (b) access the Service using anyhigh volume or automated means, (c) place pop-up windows over its pages, or otherwise affectthe display of its pages or (d) access the Site or the Service in any manner that violates our Privacy Policy. All information that Authorized User provides to us shall be true, accurate and current.',
    // tslint:disable-next-line: max-line-length
    ' Authorized User agrees not to use the Service to: (a) violate any local, state, national orinternational law, (b) impersonate any person or entity, or otherwise misrepresent AuthorizedUser\'s affiliation with a person or entity, (c) stalk, harass or harm another individual, (d) promoteor glorify hatred, violence or racial intolerance, (e) collect or store personal data about otherAuthorized Users or (f) disobey any requirements, procedures, policies or regulations ofnetworks connected to the Site or the Service, or interfere with or disrupt the Service, the Site orservers or networks connected to the Service or the Site.'
  ]
  }, {
    heading: '3. RESTRICTIONS',
    text : ['Authorised users are specifically restricted from all of the following:',
    ' 1. selling, sublicensing and/or otherwise commercializing any Website material;',
    ' 2. using this Website in any way that is or may be damaging to this Website;',
    ' 3. using this Website in any way that impacts user access to this Website;',
    // tslint:disable-next-line: max-line-length
    ' 4. using this Website contrary to applicable laws and regulations, or in any way may causeharm to the Website, or to any person or business entity;',
    // tslint:disable-next-line: max-line-length
    ' 5. engaging in any data mining, data harvesting, data extracting or any other similar activityin relation to this Website; Certain areas of this Website are restricted from being access by you and Medkonnect mayfurther restrict access by you to any areas of this Website, at any time, in absolute discretion.'
  ]
  },
  {
    heading: '4. LIMITATION OF LIABILITY',
    // tslint:disable-next-line: max-line-length
    text: ['Medkonnect shall not be liable for anydamage or injury caused by any failure ofperformance, error, omission, interruption, deletion, defect, delay of operation, quality ofproduct or equipment, communication line failure, theft or destruction or unauthorised accessor use of products and equipment, whether breach of contract, tortious behaviour, negligenceor under any other cause of action. The consumer specifically acknowledges that the serviceshall not be liable for any defamatory offensive or illegal conduct by any other consumer orthird parties and that the risk of injury from the foregoing shall rest and be borne entirely by the consumer.Neither Medkonnect nor any of its agents , affiliates or content provider shall be liable forany direct, indirect, incidental, special or consequential damages arising out of the service orinability to gain access to use of service or any warrantyin pretext of the service given by any other consumer or third parties. The consumer hereby acknowledges that the above-mentioned provisions shall apply to all content on the service.'
    ]
  },
  {
    heading: '5. INTELLECTUAL PROPERTY RIGHTS',
    // tslint:disable-next-line: max-line-length
    text: [' Medkonnect and/or its licensors, under these Terms, own all the intellectual property rights andmaterials contained in this Website.'
    ]
  },
  {
    heading: 'A) COPYRIGHT',
    text: [
      // tslint:disable-next-line: max-line-length
      'All content included in or made available through any Medkonnect service, such as text,graphics, button icons, images, audio clips, digital downloads, data compilations and software isthe property of Medkonnect. all content included in or made available through the website is theexclusive property of Medkonnect and are protected by the copyright laws of India andInternational Organisations.'
    ]
  },
  {
    heading: 'B) TRADEMARK',
    // tslint:disable-next-line: max-line-length
    text: ['“MEDKONNECT” name, logo, colour scheme, script made available through the site aretrademarks of Medkonnect and shall not be used in connection with any product or service that isnot Medkonnect’s, in any manner that is likely to cause confusion amoung the users, or any othermanner that disparages or discredits Medkonnect. The authorised user is granted limited license only for personal and non-commercial purposes ofusing the material on this Website.']
  },
  {
    heading: '6. PRIVACY, DATA SECURITY AND MONITORING',
    // tslint:disable-next-line: max-line-length
    text: ['Medkonnect gives Authorized Users privacy utmost importance. The authorised user will berequested to provide specific personal data to us, which shall be used strictly for informationpurposes only. All uses of Authorized User\'s Personal Data including but not limited to emailaddress and phone number shall be shared on the website to enhance communication. IfAuthorized User objects to having his, her or its information used the sole recourse is todiscontinue using the Site and the Service.'
    ]
  },
  {
    heading: '7. NO WARRANTIES',
    // tslint:disable-next-line: max-line-length
    text: ['This Website is provided "as is," with all faults, and Medkonnect express no representations orwarranties, of any kind related to this Website or the materials contained on this Website. Also,nothing contained on this Website shall be interpreted as advising you']

  },
  {
    heading: '8. INDEMNIFICATION',
    // tslint:disable-next-line: max-line-length
    text: [' The authorised user hereby indemnifies to the fullest extent Medkonnect from and against anyand/or all liabilities, costs, demands, causes of action, damages and expenses arising in any wayrelated to the authorised users breach of any of the provisions of these Terms.']
  },
  {
    heading: '9. VARIATION OF TERMS',
    // tslint:disable-next-line: max-line-length
    text: [' Medkonnect is permitted to revise these Terms at any time as it sees fit, and by using thisWebsite you are expected to review these Terms on a regular basis. If any provision of theseTerms is found to be invalid under any applicable law, such provisions shall be deleted withoutaffecting the remaining provisions herein.']
  },
  {
    heading: '10. ASSIGNMENT',
    // tslint:disable-next-line: max-line-length
    text: ['The Medkonnect is allowed to assign, transfer, and subcontract its rights and/or obligations underthese Terms without any notification. However, the authorised user is not allowed to assign,transfer, or subcontract any of your rights and/or obligations under these Terms.']
  },
  {
    heading: '11. ENTIRE AGREEMENT',
    // tslint:disable-next-line: max-line-length
    text: ['These Terms constitute the entire agreement between Medkonnect and authorised user in relationto the use of this website and supersedes all prior agreements and understandings.']
  },
  {
    heading: '12. GOVERNING LAW & JURISDICTION',
    // tslint:disable-next-line: max-line-length
    text: ['These Terms will be governed by and interpreted in accordance with the laws of India, and you submit to the jurisdiction of the courts located in New Delhi for the resolution of disputes.']
  }

  ];

  constructor() { }

  public ngOnInit() {
  }

}
