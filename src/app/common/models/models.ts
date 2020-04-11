
export interface PPEItem {
  ppe: string;
  required: string;
  otherPpe?: string;
}

export interface PPEItemResponse {
  list: PPEItem[];
}
