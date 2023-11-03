interface IBidRequestStore {
    [id: string] : {
        isFetchingData: boolean
        hasApiError: boolean
        list: IBidItem[]
    }
}