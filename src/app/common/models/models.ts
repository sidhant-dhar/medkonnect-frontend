
export interface PPEItem {
  ppe: string;
  required: string;
  otherPpe?: string;
}

export interface PPEItemResponse {
  list: PPEItem[];
}

export interface DialogActionOptions {
  primary: boolean;
  text: string;
}

export interface DialogOptions {
  title?: string;
  content?: string;
  width?: number;
  top?: number;
  routePath?: string;
  actions?: DialogActionOptions[];
}
