export interface DealNote {
  user?: string;
  note?: string;
  timestamp?: string;
}

export interface Deal {
  id?: string;
  _id?: string;

  clientName: string;
  dealType: string;
  sector: string;
  currentStage: string;
  summary?: string;

  dealValue?: number;

  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;

  notes?: DealNote[];
}


