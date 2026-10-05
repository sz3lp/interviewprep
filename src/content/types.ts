export type DepartmentId = 'efr' | 'bfd'
export type StageId =
  | 'screening'
  | 'speed'
  | 'oral'
  | 'leadership'
  | 'chiefs'

export type Competency =
  | 'motivation'
  | 'selfKnowledge'
  | 'teamwork'
  | 'integrity'
  | 'conflict'
  | 'stress'
  | 'customerService'
  | 'diversity'
  | 'leadership'
  | 'failure'
  | 'deptKnowledge'
  | 'scenario'
  | 'fit'

export interface ProcessStage {
  id: StageId
  label: string
  windowLabel: string
  startDate: string
  endDate: string
  durationMinutes: number
  questionCount?: number
  notes: string
  format: string
}

export interface FactCard {
  id: string
  prompt: string
  answer: string
  tags: string[]
}

export interface Department {
  id: DepartmentId
  shortName: string
  fullName: string
  mission: string
  vision: string
  values: { name: string; detail: string }[]
  lookFors: string[]
  coverage: string
  orgModel: string
  stations: string[]
  specialties: string[]
  talkingPoints: string[]
  whyAngle: string
  whyDraft: string
  process: ProcessStage[]
  facts: FactCard[]
  sources: { label: string; url: string }[]
  logistics: string[]
}

export interface Question {
  id: string
  text: string
  departments: Array<DepartmentId | 'shared'>
  stages: StageId[]
  competencies: Competency[]
  tip: string
  sampleOutline?: string
}

export interface StarStory {
  id: string
  title: string
  competencies: Competency[]
  efrValues: string[]
  bfdLookFors: string[]
  situation: string
  task: string
  action: string
  result: string
  lesson: string
  spokenVersion: string
  placeholder: boolean
}

export interface RubricDimension {
  id: string
  label: string
  description: string
}

export interface BattlePlanDay {
  date: string
  focus: string
  tasks: string[]
}
