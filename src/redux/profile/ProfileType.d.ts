interface IUserDetails {
    p_user_id?: string
    p_user_name?: string
    p_user_mobile_country?: string
    p_user_mobile?: string
    p_user_email?: string
    p_user_address?: string
    p_user_company_name?: string
    p_user_tax_registration_code?: string
    p_user_bank?: string
    p_user_headquarters_address?: string
    p_user_iban_code?: string
    p_user_lastlogin?: string
}

interface IUserProfileDetail {
    isFetchingData: boolean
    hasApiError: boolean
    userDetails: IUserDetails
}