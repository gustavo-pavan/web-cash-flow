import { PaymentType } from "@/domain/entity/payment-type";

export interface IGetPaymentType {
  request(): Promise<Array<PaymentType>>;
}
