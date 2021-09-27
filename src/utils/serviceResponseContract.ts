export interface errorContract {
  status: number
  message: string
  validationErrors?: Array<string>
}

export interface successContract {
  status: number
  data: any
}

export const isSuccessContract = (object) => {
  return 'data' in object
}

export const isErrorContractContract = (object) => {
  return 'message' in object
}
