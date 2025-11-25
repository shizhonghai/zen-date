
export enum Gender {
  MALE = '男',
  FEMALE = '女',
}

export enum CalendarType {
  SOLAR = '公历',
  LUNAR = '农历',
}

export interface PersonProfile {
  name: string;
  gender: Gender;
  birthDate: string; // ISO string YYYY-MM-DD
  birthTime: string; // HH:mm
}

export interface UserInput {
  purpose: string; // e.g., 'wedding', 'opening'
  purposeLabel: string;
  targetMonth: string; // YYYY-MM
  people: PersonProfile[]; // Array of people involved (1 or 2)
  roles: string[]; // Role names corresponding to people
}

export interface BaZiChart {
  name: string;
  role?: string; // e.g. Groom
  yearPillar: string;
  monthPillar: string;
  dayPillar: string;
  hourPillar: string;
  element: string; // Main element (Day Master)
  strength: string; // Weak/Strong
}

export interface AuspiciousDay {
  date: string; // YYYY-MM-DD
  score: number; // 0-100
  auspiciousLevels: string; // e.g. "Upper Auspicious"
  reason: string;
  conflicts: string; // Zodiac conflicts
  activities: string[]; // Good for
}

export interface PredictionResult {
  bazis: BaZiChart[];
  generalAdvice: string;
  days: AuspiciousDay[];
}

export interface PurposeDefinition {
  id: string;
  label: string;
  icon: string;
  requiresTwo: boolean;
  description: string;
  roles: {
    a: string; // Label for Person A
    b?: string; // Label for Person B (if requiresTwo)
  }
}

export const PURPOSES: PurposeDefinition[] = [
  { 
    id: 'wedding', 
    label: '嫁娶 (结婚)', 
    icon: '🎎', 
    requiresTwo: true, 
    description: '需输入双方八字，测算琴瑟和鸣之吉日',
    roles: { a: '新郎 (乾造)', b: '新娘 (坤造)' }
  },
  { 
    id: 'moving', 
    label: '入宅 (搬家)', 
    icon: '🏠', 
    requiresTwo: false, 
    description: '需输入户主八字，测算安居乐业之良辰',
    roles: { a: '户主' }
  },
  { 
    id: 'opening', 
    label: '开市 (开业)', 
    icon: '🧧', 
    requiresTwo: false, 
    description: '需输入店主/法人八字，测算开张大吉之时',
    roles: { a: '店主/法人' }
  },
  { 
    id: 'travel', 
    label: '出行 (旅游)', 
    icon: '🏔️', 
    requiresTwo: false, 
    description: '需输入出行人八字，测算平安顺遂之日',
    roles: { a: '出行人' }
  },
  { 
    id: 'signing', 
    label: '订盟 (签约)', 
    icon: '✍️', 
    requiresTwo: false, 
    description: '需输入主事者八字，测算合作共赢之机',
    roles: { a: '主事者' }
  },
  { 
    id: 'groundbreaking', 
    label: '动土 (装修)', 
    icon: '🔨', 
    requiresTwo: false, 
    description: '需输入户主八字，测算兴工动土之吉',
    roles: { a: '户主' }
  },
  { 
    id: 'prayer', 
    label: '祈福 (许愿)', 
    icon: '🏮', 
    requiresTwo: false, 
    description: '需输入祈福人八字，测算心诚则灵之日',
    roles: { a: '祈福人' }
  },
  { 
    id: 'trading', 
    label: '交易 (投资)', 
    icon: '💰', 
    requiresTwo: false, 
    description: '需输入决策者八字，测算财运亨通之时',
    roles: { a: '决策者' }
  },
];
