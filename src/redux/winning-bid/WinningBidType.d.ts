interface IBidItem {
    bidId?: string
    parentBidId?: string
    userId?: string
    title?: string
    price?: string
    privateRemark?: string
    createdAt?: string
    updatedAt?: string
    requestTitle?: string
    requestVehicle?: string
    requestYear?: string
    requestVarient?: string
    requestEngine?: string
    requestDeliveryLocation?: string
    requestCreatedAt?: string
    companyName?: string
    companyTrade?: string
}

interface IWinningBidStore {
    [id: string] : {
        isFetchingData: boolean
        hasApiError: boolean
        list: IBidItem[]
    }
}