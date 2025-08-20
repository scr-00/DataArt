export interface EventData {
  year: string;
  title: string;
  description: string;
  imageURL: string;
  category: string;
}

export interface ModalState {
  isOpen: boolean;
  event: EventData | null;
}
