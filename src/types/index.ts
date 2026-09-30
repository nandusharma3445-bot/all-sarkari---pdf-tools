export type ToolCategory = 'photo' | 'pdf' | 'sarkari';

export interface ToolItem {
  id: string;
  slug: string;
  title: string;
  titleHindi: string;
  category: ToolCategory;
  badge?: string;
  iconName: string;
  description: string;
  shortDesc: string;
  features: string[];
}

export interface SarkariFormItem {
  id: string;
  formName: string;
  organization: string;
  category: 'sarkari' | 'ignou' | 'nios' | 'ews';
  startingDate: string;
  lastDate: string;
  examDate: string;
  status: 'Active' | 'Upcoming' | 'Ending Soon' | 'Closed';
  totalPosts: string;
  qualification: string;
  ageLimit: string;
  fee: string;
  applyLink: string;
  officialNotification?: string;
  description: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  savedTools: string[];
  recentFilesCount: number;
}
