//Form Input State
export interface FormInput {
  skills: string;
  style: string;
  wordcount: number | null | string;
}

//Modal State
export interface ModalState {
  state: boolean;
  message: string;
}
