
export interface PlayerData {
  id: string;
  name: string;
  scores: number[];
}

export type MemberMap = Record<string, PlayerData>;

export interface AreaData {
  id: string,
  title: string,
  memberIdList: string[]
}

export type AreaMap = Record<string, AreaData>; 
