# MedKonnect

We built this platform - (Medkonnect) to help connect buyers and suppliers of PPE equipment in India. We are open sourcing the front end of the application, so that if anyone wishes to build a similar platform, duplication of efforts does not occur. May God give us strength in these troubled times!   

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Bootstrap SCSS
##### Breakpoints to be used in the project

*Media of at least the minimum breakpoint width. No query for the smallest breakpoint.*
```
@include media-breakpoint-up($min) {
  // css code
}
```

*Media of at least the maximum breakpoint width. No query for the largest breakpoint.*
```
@include media-breakpoint-down($max) {
  // css code
}
```

*Media that spans multiple breakpoint widths.*
```
@include media-breakpoint-between($min, $max) {
  // css code
}
```

*Media between the breakpoint's minimum and maximum widths.
No minimum for the smallest breakpoint, and no maximum for the largest one.*
```
@include media-breakpoint-only($breakpoint) {
  // css code
}
```

_*Available breakpoints are (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px)_

**To get more help on bootstrap responsive breakpoints go checkout [Responsive breakpoints](https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints)*

##### Spacing in Bootstrap (used for margin and padding)
* Bootstrap provides wide range of shorthand classess for margin/padding
* To get more help on spacing utilities go checkout [Bootstrap Spacing Utilities](https://getbootstrap.com/docs/4.0/utilities/spacing)
* One can also apply margin/padding in the multiples of `$spacer`, default value of `$spacer` is `1rem`

##### Font Utilities in Bootstrap
* Font size to be used in the multiples of `$font-size-base`, default value of `$font-size-base` is `1rem`
```
$font-size-base:              1rem !default;
$font-size-lg:                $font-size-base * 1.25 !default;
$font-size-sm:                $font-size-base * .875 !default;

$font-weight-base:            $font-weight-normal !default;
$font-weight-lighter:         lighter !default;
$font-weight-light:           300 !default;
$font-weight-normal:          400 !default;
$font-weight-bold:            700 !default;
$font-weight-bolder:          bolder !default;
```

## LICENSE

Copyright 2020

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

Software built with love by the Medkonnect team:

 UX - M. Shiva Kumar
 
 Product design - Pooja Shetty 
                  Sidhant Dhar

Front End - Sidhant Dhar
          - Dayanand Panchal

Backend - Gnanasekhar Mani
        - Aditya
        - Sreevishnu
        
Legal   - Ashmita Banerjee

Business Development - Ankur Sengar
                     - Ashmita Banerjee
                     - Sidhant Dhar
                     - Pooja Shetty

Mask Design - Anvesh Gangadharan
            - Valindo Godinho

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
