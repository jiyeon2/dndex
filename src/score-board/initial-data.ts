import { AreaMap, MemberMap } from "./types";

const initialScores = new Array(5).fill(0);

export const initialMembers: MemberMap = {
  'dan' : {id: 'dan', name: '댄', scores: initialScores},
  'dori' : {id: 'dori', name: '도리', scores: initialScores},
  'jiny' : {id: 'jiny', name: '지니', scores: initialScores},
  'joni' : {id: 'joni', name: '조니', scores: initialScores},
  'luke' : {id: 'luke', name: '루크', scores: initialScores},
  'mbaku' : {id: 'mbaku', name: '음바쿠', scores: initialScores},
  'robert' : {id: 'robert', name: '로버트', scores: initialScores},
  'scott' : {id: 'scott', name: '스캇', scores: initialScores},
  'walker' : {id: 'walker', name: '워커', scores: initialScores},
}

export const initialAreas: AreaMap = {
  'inGame': {
    id: 'inGame',
    title: '참여자',
    memberIdList: ['dan','dori','joni','luke','mbaku','robert','scott']
  },
  'absent': {
    id: 'absent',
    title: '미참여',
    memberIdList: ['jiny','walker'],
  }
}

export const areaOrder = ['inGame','absent'];
