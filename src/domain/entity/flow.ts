export type Flow = {
    flowType?: number
    flowParameterName?: string
    paymentTypeName?: string
    paymentTypeId: string
    flowParameterId: string
    postingDate: string
    expirationDate: string
    description: string
    value: number
    status: Status
    id: string
}

export enum Status{
    Open = 0,
    Closed = 1 
}

