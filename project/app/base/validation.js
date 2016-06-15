
import DatePicker from 'react-datepicker'
import moment from 'moment'
import * as inputHelper from 'react-validated-input'
import validator from 'validate.js'

const creditCardRules = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/, //All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13.
  master: /^5[1-5][0-9]{14}$/, //All MasterCard numbers start with the numbers 51 through 55. All have 16 digits.
  AmericanExpress: /^3[47][0-9]{13}$/, //American Express card numbers start with 34 or 37 and have 15 digits.
  DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/, //Diners Club card numbers begin with 300 through 305, 36 or 38. All have 14 digits. There are Diners Club cards that begin with 5 and have 16 digits. These are a joint venture between Diners Club and MasterCard, and should be processed like a MasterCard.
  Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/, //Discover card numbers begin with 6011 or 65. All have 16 digits.
  JCB: /^(?:2131|1800|35\d{3})\d{11}$/ //JCB cards beginning with 2131 or 1800 have 15 digits. JCB cards beginning with 35 have 16 digits.
}

export function initValidationSettings(){

  validator.extend(validator.validators.datetime, {
    parse: function(value, options) {
      return +moment.utc(value);
    },
    format: function(value, options) {
      var format = options.dateOnly ? "MM/DD/YYYY" : "MM/DD/YYYY hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });

  inputHelper.config({
    validationStateProperty: 'validate',
    useWraper: true
  })

  inputHelper.registerClasses({
    payMethod: {
      cardNumber: function(value, attributes, attributeName, options, constraints) {
        let regex = creditCardRules[attributes.type]
        return  {
          presence: true,
          format: {
            pattern: regex,
            message: function(value, attribute, validatorOptions, attributes, globalOptions) {
              return `"${value} is not a valid ${attributes.type} card number"`;
            }
          }
        }
      },
      name: {presence: true},
      expiration: {
        presence: true,
        format  : {
          pattern: /^\d{4}$/,
          message: 'should be in 4 digits'
        }
      }
    },
    media: {
      name: {presence: true},
      description: {presence: true},
      inventories: {presence: true},
      beginDate: {datetime: true, presence: true},
      endDate: {datetime: true, presence: true}
    },
    inventory: {
      name: {presence: true},
      alt: {presence: true},
      destination: {presence: true, url: true},
      unitPrice: {presence: true, numericality: true},
      width: {presence: true, numericality: true},
      height: {presence: true, numericality: true},
      positionX: {presence: true, numericality: true},
      positionY: {presence: true, numericality: true},
      count: {presence: true, numericality: true},
      availableCount: {presence: true, numericality: true}
    }
  })

  inputHelper.extend('datepicker', {
      wrapper: 'div',
      wrapperClass: 'form-group',
      className: 'form-control',
      component: DatePicker,
      valueProp: 'selected', // null
      defaultProps: { dateFormat: 'MM/DD/YYYY' },
      getValueOnChange: (e) => e.toString(),
      includedLabel : false,
      setValue: (value) => isNaN(Date.parse(value))? null:moment(value),
      propsMap: [{from: 'placeholder', to: 'placeholderText'}]
  })
}
