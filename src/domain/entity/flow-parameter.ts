export type FlowParameter = {
  id?: string;
  name: string;
  description: string;
  flowTypeNumber: number;
  flowType?: FlowType
};

export enum EFlowType {
  None = 0,
  Debit = 1,
  Credit = 2,
}

export class FlowType {
  name: string;
  description: string;
  id: EFlowType;

  constructor(id: EFlowType) {
    if (id == EFlowType.Debit) this.debit();
    else this.credit();
  }

  private debit() {
    this.id = EFlowType.Debit;
    this.name = "Debit";
    this.description = "Paid or payable bills";
  }

  private credit() {
    this.id = EFlowType.Credit;
    this.name = "Credit";
    this.description = "Down payment or you will still receive the money";
  }
}
