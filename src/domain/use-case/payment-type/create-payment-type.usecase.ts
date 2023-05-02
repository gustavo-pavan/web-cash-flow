import { PaymentType } from "@/domain/entity/payment-type";

export interface ICreatePaymentType {
  request(data: PaymentType): Promise<PaymentType>;
}
