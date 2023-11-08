export enum FIELD_TYPE {
  RADIO_BOX = 'RADIO_BOX',
  TEXTBOX = 'TEXTBOX',
}

export enum USER_INFO_KEYS {
  USER_NAME = 'p_user_name',
  PHONE_NO = 'p_user_mobile',
  COUNTRY = 'country_city',
  CITY= 'p_user_city',
  ADDRESS = 'p_user_address',
  LEGAL_ENTITY = 'legalEntity',
  CIF_WHICH = 'cif_which',
  NR_REG_COM = 'p_user_nr_reg_com',
  HEADQUARTER_ADDRESS = 'p_user_headquarters_address',
  BANK = 'p_user_bank',
  IBAN_CODE = 'p_user_iban_code',
  PREFERENCES = 'preferences',
}

export enum ACTION_NAME {
  UPDATE_USER_NAME  = 'UPDATE_USER_NAME',
  UPDATE_CONTACT_NUMBER = 'UPDATE_CONTACT_NUMBER',
  UPDATE_COUNTRY  = 'UPDATE_COUNTRY',
  UPDATE_CITY  = 'UPDATE_CITY',
  UPDATE_ADDRESS  = 'UPDATE_ADDRESS',
  UPDATE_LEGAL_ENTITY  = 'UPDATE_LEGAL_ENTITY',
  UPDATE_CIF_WHICH  = 'UPDATE_CIF_WHICH',
  UPDATE_NR_REG  = 'UPDATE_NR_REG',
  UPDATE_HEADQUARTER_ADDRESS  = 'UPDATE_HEADQUARTER_ADDRESS',
  UPDATE_BANK  = 'UPDATE_BANK',
  UPDATE_IBAN_CODE = 'UPDATE_IBAN_CODE',
  UPDATE_PREFERENCES  = 'UPDATE_PREFERENCES',
  UPDATE_LIST = 'UPDATE_LIST',
}

export const USER_PREFERENCE_LIST = [
  {
    key: 'seller',
    value: 'Seller'
  }, {
    key: 'buyer',
    value: 'buyer'
  }
]

export const INITIAL_DATA_STATE: IStateElement[] = [
  {
    key: USER_INFO_KEYS.USER_NAME,
    value: '',
    fieldType: FIELD_TYPE.TEXTBOX,
    defaultValue: '',
    label: 'Name',
    actionName: ACTION_NAME.UPDATE_USER_NAME,
    valueType: 'string',
    isRequired: true,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.PHONE_NO,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'Phone No.',
    actionName: ACTION_NAME.UPDATE_CONTACT_NUMBER,
    valueType: 'string',
    isRequired: true,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.COUNTRY,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'Country',
    actionName: ACTION_NAME.UPDATE_COUNTRY,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.CITY,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'City',
    actionName: ACTION_NAME.UPDATE_CITY,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.ADDRESS,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'Address',
    actionName: ACTION_NAME.UPDATE_ADDRESS,
    multiline: true,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.LEGAL_ENTITY,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'Legal Entity',
    actionName: ACTION_NAME.UPDATE_LEGAL_ENTITY,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.CIF_WHICH,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'CIF/ WHICH',
    actionName: ACTION_NAME.UPDATE_CIF_WHICH,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.NR_REG_COM,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'Nr. Reg. Com',
    actionName: ACTION_NAME.UPDATE_NR_REG,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.HEADQUARTER_ADDRESS,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'Headquarter Address',
    multiline: true,
    actionName: ACTION_NAME.UPDATE_HEADQUARTER_ADDRESS,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.BANK,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'Bank',
    actionName: ACTION_NAME.UPDATE_BANK,
    valueType: 'number',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.IBAN_CODE,
    fieldType: FIELD_TYPE.TEXTBOX,
    value: '',
    defaultValue: '',
    label: 'IBAN Code',
    actionName: ACTION_NAME.UPDATE_IBAN_CODE,
    valueType: 'number',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.PREFERENCES,
    fieldType: FIELD_TYPE.RADIO_BOX,
    value: USER_PREFERENCE_LIST[0].key,
    defaultValue: '',
    label: 'Preferences',
    actionName: ACTION_NAME.UPDATE_PREFERENCES,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: '',
    optionList: USER_PREFERENCE_LIST
  }
]