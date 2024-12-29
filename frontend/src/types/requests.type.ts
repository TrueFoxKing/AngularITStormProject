export type RequestsType = {
  name: string,
  phone: string,
  service?: string,
  type: RequestsTypeEnum.consultation  | RequestsTypeEnum.order
}

export enum RequestsTypeEnum {
  consultation = 'consultation',
  order = 'order'
}
