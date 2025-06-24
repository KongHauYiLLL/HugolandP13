export interface GameState {
  coins: number;
  gems: number;
  zone: number;
  playerStats: PlayerStats;
  inventory: Inventory;
  currentEnemy: Enemy | null;
  inCombat: boolean;
  combatLog: string[];
  research: Research;
  isPremium: boolean;
  achievements: Achievement[];
  collectionBook: CollectionBook;
  knowledgeStreak: KnowledgeStreak;
  gameMode: GameMode;
  statistics: Statistics;
  powerSkills: PowerSkills;
  cheats: CheatSettings;
}

export interface PlayerStats {
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  baseAtk: number;
  baseDef: number;
  baseHp: number;
}

export interface Research {
  level: number;
  tier: number; // Every 10 levels = new tier
  totalSpent: number;
}

export interface Inventory {
  weapons: Weapon[];
  armor: Armor[];
  currentWeapon: Weapon | null;
  currentArmor: Armor | null;
}

export interface Weapon {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';
  baseAtk: number;
  level: number;
  upgradeCost: number;
  sellPrice: number;
  isChroma?: boolean;
}

export interface Armor {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';
  baseDef: number;
  level: number;
  upgradeCost: number;
  sellPrice: number;
  isChroma?: boolean;
}

export interface Enemy {
  name: string;
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  zone: number;
  isPoisoned?: boolean;
  poisonTurns?: number;
}

export interface ChestReward {
  type: 'weapon' | 'armor' | 'gems';
  items?: (Weapon | Armor)[];
  gems?: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  reward?: {
    coins?: number;
    gems?: number;
    special?: string;
  };
}

export interface CollectionBook {
  weapons: { [key: string]: boolean };
  armor: { [key: string]: boolean };
  totalWeaponsFound: number;
  totalArmorFound: number;
  rarityStats: {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
    mythical: number;
  };
}

export interface KnowledgeStreak {
  current: number;
  best: number;
  multiplier: number;
  lastCorrectTime?: Date;
}

export interface GameMode {
  current: 'normal' | 'blitz' | 'bloodlust' | 'crazy';
  speedModeActive: boolean;
  survivalLives: number;
  maxSurvivalLives: number;
}

export interface Statistics {
  totalQuestionsAnswered: number;
  correctAnswers: number;
  totalPlayTime: number; // in seconds
  zonesReached: number;
  itemsCollected: number;
  coinsEarned: number;
  gemsEarned: number;
  chestsOpened: number;
  accuracyByCategory: {
    [category: string]: {
      correct: number;
      total: number;
    };
  };
  sessionStartTime: Date;
}

export interface PowerSkills {
  rage: {
    attackCount: number;
    isActive: boolean;
    damageBonus: number;
  };
  poison: {
    attackCount: number;
    isActive: boolean;
  };
  health: {
    isTriggered: boolean;
    isActive: boolean;
    attacksRemaining: number;
  };
}

export interface CheatSettings {
  infiniteCoins: boolean;
  infiniteGems: boolean;
  obtainAnyItem: boolean;
}