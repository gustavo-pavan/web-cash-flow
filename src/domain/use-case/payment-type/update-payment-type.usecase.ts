import { PaymentType } from "@/domain/entity/payment-type";

export interface IUpdatePaymentType {
  request(data: PaymentType): Promise<PaymentType>;
}
