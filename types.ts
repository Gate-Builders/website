
export interface Group {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  logoUrl: string;
  websiteUrl: string;
  tags: string[];
  category: 'Gate Network' | 'Creators' | 'Experiences';
}

export interface ModalProps {
  group: Group | null;
  onClose: () => void;
}
