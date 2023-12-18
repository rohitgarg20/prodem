
export enum FIELD_TYPE {
  RADIO_BOX = 'RADIO_BOX',
  TEXTBOX = 'TEXTBOX',
  DROP_DOWN = 'DROP_DOWN'
}

export enum USER_INFO_KEYS {
  USER_NAME = 'p_user_name',
  PHONE_NO = 'p_user_mobile',
  COUNTRY = 'p_user_country',
  CITY= 'p_user_city',
  ADDRESS = 'p_user_address',
  LEGAL_ENTITY = 'p_user_company_name',
  CIF_WHICH = 'p_user_tax_registration_code',
  NR_REG_COM = 'p_user_nr_reg_com',
  HEADQUARTER_ADDRESS = 'p_user_headquarters_address',
  BANK = 'p_user_bank',
  IBAN_CODE = 'p_user_iban_code',
  PREFERENCES = 'p_user_optimized_type',
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
    key: '1',
    value: 'MultiLanguageString.BUYER'
  },
  {
    key: '2',
    value: 'MultiLanguageString.SELLER'
  },
]

export const INITIAL_DATA_STATE: IStateElement[] = [
  {
    key: USER_INFO_KEYS.USER_NAME,
    value: '',
    fieldType: FIELD_TYPE.TEXTBOX,
    defaultValue: '',
    label: 'MultiLanguageString.NAME',
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
    label: 'MultiLanguageString.PHONE_NO',
    actionName: ACTION_NAME.UPDATE_CONTACT_NUMBER,
    valueType: 'string',
    isRequired: true,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.COUNTRY,
    fieldType: FIELD_TYPE.DROP_DOWN,
    value: '',
    defaultValue: '',
    label: 'MultiLanguageString.COUNTRY',
    actionName: ACTION_NAME.UPDATE_COUNTRY,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: ''
  },
  {
    key: USER_INFO_KEYS.CITY,
    fieldType: FIELD_TYPE.DROP_DOWN,
    value: '',
    defaultValue: '',
    label: 'MultiLanguageString.CITY',
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
    label: 'MultiLanguageString.ADDRESS',
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
    label: 'MultiLanguageString.LEGAL_ENTITY',
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
    label: 'MultiLanguageString.CIF_WHICH',
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
    label: 'MultiLanguageString.NR_REG',
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
    label: 'MultiLanguageString.Headquarter_Address',
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
    label: 'MultiLanguageString.BANK',
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
    label: 'MultiLanguageString.IBAN_CODE',
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
    label: 'MultiLanguageString.PREFERENCES',
    actionName: ACTION_NAME.UPDATE_PREFERENCES,
    valueType: 'string',
    isRequired: false,
    regex: '',
    error: '',
    optionList: USER_PREFERENCE_LIST
  }
]