import {
  getCurrentTaskOptions,
  getQTypeOptions,
  getWorkFlowOptions,
} from "./currentTaskData";
export interface Column {
  id?: string;
  type?: QuestionType;
  label?: string;
  value?: string;
  placeHolder?: string;
  columnNum: string;
  disabled?: boolean;
  hide?: boolean;
  options?: Option[];
  badge?: Badge;
  validation?: Validation;
}

export interface Validation {
  type: string;
  regex: string;
}

export interface Option {
  value: string;
  label: string;
}
export interface Project {
  name: string;
  project: string;
}

export enum QuestionType {
  SELECTOR,
  TEXTAREA,
  INPUT,
  DATEPICKER,
  MULTISELECT,
}

export enum Badge {
  NEW_ROLE,
  NEWBIE,
  UNDEFINED,
}

export interface BarChartData {
  baseProject: string;
  budgetedHC: number;
  actualHC: number;
}

const ONBOARDING_STATUS: Option[] = [
  { value: "Production Ready", label: "Production Ready" },
  { value: "Pre-Initial Training", label: "Pre-Initial Training" },
  { value: "Initial Training", label: "Initial Training" },
  { value: "Onboarding", label: "Onboarding" },
  { value: "Blocked", label: "Blocked" },
];

const EDUCATION: Option[] = [
  { value: "Doctorate", label: "Doctorate" },
  { value: "Masters", label: "Masters" },
  { value: "Bachelors", label: "Bachelors" },
  { value: "Other", label: "Other" },
];

const WORKSTATUS: Option[] = [
  { value: "Completed", label: "Completed" },
  { value: "Active", label: "Active" },
  { value: "Yet to Start", label: "Yet to Start" },
  { value: "Completed - Need Metrics", label: "Completed - Need Metrics" },
  { value: "On Hold", label: "On Hold" },
  { value: "Double Check Empty", label: "Double Check Empty" },
  { value: "Debugging", label: "Debugging" },
  { value: "Canceled", label: "Canceled" },
];

const ROLES: Option[] = [
  { value: "SR", label: "SR" },
  { value: "Reviewer", label: "Reviewer" },
  { value: "Sr. Reviewer", label: "Sr. Reviewer" },
  { value: "Lead", label: "Lead" },
  { value: "PO", label: "PO" },
  { value: "PAO", label: "PAO" },
  { value: "Sr. PAO", label: "Sr. PAO" },
  { value: "Program Lead", label: "Program Lead" },
  { value: "Pod Lead", label: "Pod Lead" },
  { value: "Sr. Pod Lead", label: "Sr. Pod Lead" },
  { value: "Pod Manager", label: "Pod Manager" },
  { value: "Onboarding Lead", label: "Onboarding Lead" },
  { value: "Sr. Onboarding Lead", label: "Sr. Onboarding Lead" },
  { value: "Interviewer", label: "Interviewer" },
  { value: "Interview Lead", label: "Interview Lead" },
  { value: "Interview Manager", label: "Interview Manager" },
  { value: "Culture & Inclusion", label: "Culture & Inclusion" },
  { value: "Data Manager", label: "Data Manager" },
  { value: "Business Analyst", label: "Business Analyst" },
  { value: "Data Analyst", label: "Data Analyst" },
  { value: "Evaluator", label: "Evaluator" },
  { value: "Golden Evaluator", label: "Golden Evaluator" },
];

const PRODUCTIONROLE: Option[] = [
  { value: "SR", label: "SR" },
  { value: "Reviewer", label: "Reviewer" },
  { value: "Sr. Reviewer", label: "Sr. Reviewer" },
  { value: "Lead", label: "Lead" },
  { value: "PO", label: "PO" },
  { value: "PAO", label: "PAO" },
  { value: "Sr. PAO", label: "Sr. PAO" },
  { value: "Program Lead", label: "Program Lead" },
  { value: "Pod Lead", label: "Pod Lead" },
  { value: "Sr. Pod Lead", label: "Sr. Pod Lead" },
  { value: "Pod Manager", label: "Pod Manager" },
  { value: "Onboarding Lead", label: "Onboarding Lead" },
  { value: "Sr. Onboarding Lead", label: "Sr. Onboarding Lead" },
  { value: "Interviewer", label: "Interviewer" },
  { value: "Interview Lead", label: "Interview Lead" },
  { value: "Interview Manager", label: "Interview Manager" },
  { value: "Culture & Inclusion", label: "Culture & Inclusion" },
  { value: "Data Manager", label: "Data Manager" },
  { value: "Business Analyst", label: "Business Analyst" },
  { value: "Data Analyst", label: "Data Analyst" },
  { value: "Evaluator", label: "Evaluator" },
  { value: "Golden Evaluator", label: "Golden Evaluator" },
];

export const PROJECTWORKTYPE: Option[] = [
  { value: "Magi - Eval 1", label: "Magi - Eval 1" },
  { value: "Magi - Writing 1", label: "Magi - Writing 1" },
  { value: "Gemit - Admin", label: "Gemit - Admin" },
  { value: "Cloud - Solutions", label: "Cloud - Solutions" },
  { value: "Workspace", label: "Workspace" },
  { value: "Ambient - Writing", label: "Ambient - Writing" },
  { value: "Ambient - Evals", label: "Ambient - Evals" },
  { value: "Magi - Writing 2", label: "Magi - Writing 2" },
  { value: "Magi - Eval 2", label: "Magi - Eval 2" },
  { value: "Magi - Eval 3", label: "Magi - Eval 3" },
  { value: "Magi - Eval 4", label: "Magi - Eval 4" },
  { value: "Gemit - Factuality1", label: "Gemit - Factuality1" },
  { value: "Gemit - Factuality2", label: "Gemit - Factuality2" },
  { value: "Gemit - Factuality3", label: "Gemit - Factuality3" },
  { value: "Gemit - Creative1", label: "Gemit - Creative1" },
  { value: "Gemit - Creative2", label: "Gemit - Creative2" },
  { value: "Gemit - Creative3", label: "Gemit - Creative3" },
  { value: "Gemit - Creative4", label: "Gemit - Creative4" },
  { value: "Python 1", label: "Python 1" },
  { value: "Python 2", label: "Python 2" },
  { value: "Magi - Writing 3", label: "Magi - Writing 3" },
  { value: "Gemit - Orientation", label: "Gemit - Orientation" },
  { value: "Gemini - 1", label: "Gemini - 1" },
  { value: "Gemini - 2", label: "Gemini - 2" },
  { value: "Gemini - 3", label: "Gemini - 3" },
  { value: "Cloud - CP1", label: "Cloud - CP1" },
  { value: "Cloud - CP2", label: "Cloud - CP2" },
  { value: "Cloud - CP3", label: "Cloud - CP3" },
  { value: "Cloud - CP4", label: "Cloud - CP4" },
  { value: "QC", label: "QC" },
  { value: "BrowseCUJ", label: "BrowseCUJ" },
  { value: "Magi - Essense", label: "Magi - Essense" },
  { value: "ImageInWords", label: "ImageInWords" },
  { value: "Ads", label: "Ads" },
  { value: "Bard", label: "Bard" },
  { value: "VideoInWords", label: "VideoInWords" },
  { value: "Buffer", label: "Buffer" },
  { value: "Core Fixed", label: "Core Fixed" },
  { value: "Magi - JA", label: "Magi - JA" },
  { value: "Gemit - Factuality4", label: "Gemit - Factuality4" },
  { value: "Magi - Writing 4", label: "Magi - Writing 4" },
  { value: "Magi - Eval 5", label: "Magi - Eval 5" },
  { value: "Onboarding", label: "Onboarding" },
  {
    value: "Gemini Multilinguality - JA",
    label: "Gemini Multilinguality - JA",
  },
  {
    value: "Gemini Multilinguality - DE",
    label: "Gemini Multilinguality - DE",
  },
  {
    value: "Gemini Multilinguality - HI",
    label: "Gemini Multilinguality - HI",
  },
  { value: "Magi - HI US", label: "Magi - HI US" },
  { value: "Magi - TE US", label: "Magi - TE US" },
  { value: "Magi - MR US", label: "Magi - MR US" },
];

const BASEPROJECT: Option[] = [
  { value: "Magi - JA", label: "Magi - JA" },
  { value: "Cloud LLM", label: "Cloud LLM" },
  { value: "GEMIT", label: "GEMIT" },
  { value: "Bard Extensions", label: "Bard Extensions" },
  { value: "Ambient", label: "Ambient" },
  { value: "Workspace", label: "Workspace" },
  { value: "Buffer", label: "Buffer" },
  { value: "PAO", label: "PAO" },
  { value: "QC", label: "QC" },
  { value: "Ads", label: "Ads" },
  { value: "Magi - HI", label: "Magi - HI" },
  { value: "Program Lead", label: "Program Lead" },
  { value: "ImageInWords", label: "ImageInWords" },
  { value: "Magi", label: "Magi" },
  { value: "Core Fixed", label: "Core Fixed" },
  { value: "Magi - Essense", label: "Magi - Essense" },
  { value: "Ask Photos", label: "Ask Photos" },
  { value: "Magi - Python", label: "Magi - Python" },
  { value: "Magi - BN", label: "Magi - BN" },
  { value: "Magi - TA", label: "Magi - TA" },
  { value: "Magi - TE", label: "Magi - TE" },
  { value: "Magi - MR", label: "Magi - MR" },
  { value: "VideoInWords", label: "VideoInWords" },
  { value: "Magi - Gemini", label: "Magi - Gemini" },
  {
    value: "Gemini Multilinguality - JA",
    label: "Gemini Multilinguality - JA",
  },
  {
    value: "Gemini Multilinguality - DE",
    label: "Gemini Multilinguality - DE",
  },
  {
    value: "Gemini Multilinguality - HI",
    label: "Gemini Multilinguality - HI",
  },
  { value: "Magi - Writing", label: "Magi - Writing" },
  { value: "Magi - Evaluation", label: "Magi - Evaluation" },
];

const WORKFLOWOPTIONS: Option[] = getWorkFlowOptions();

const CURRENTTASK: Option[] = getCurrentTaskOptions();

export const TOP_FILTER_CONFIG: Column = {
  columnNum: "C",
  placeHolder: "Select A Super Rator",
  type: QuestionType.SELECTOR,
  options: [],
};

export const USER_TAB_CONFIG: Column[] = [
  {
    label: "Super Rater Name",
    columnNum: "C",
    placeHolder: "Loading ...",
    type: QuestionType.INPUT,
  },
  {
    label: "Super Rater LDAP",
    columnNum: "D",
    placeHolder: "Loading ...",
    type: QuestionType.INPUT,
  },
  {
    label: "Pod",
    columnNum: "E",
    placeHolder: "Loading ...",
    type: QuestionType.INPUT,
  },
  {
    label: "Location",
    columnNum: "Q",
    placeHolder: "Loading ...",
    type: QuestionType.INPUT,
  },
  {
    label: "GlobalLogic Email",
    columnNum: "AC",
    placeHolder: "Loading ...",
    type: QuestionType.INPUT,
    validation: {
      type: "email",
      regex: "@globallogic.com",
    },
  },
  {
    label: "Google Email",
    columnNum: "Z",
    placeHolder: "Loading ...",
    type: QuestionType.INPUT,
    validation: {
      type: "email",
      regex: "@google.com",
    },
  },
  {
    label: "Onboarding Status",
    columnNum: "K",
    placeHolder: "Please select ...",
    type: QuestionType.SELECTOR,
    options: ONBOARDING_STATUS,
  },
  {
    label: "Highest Level of Education",
    columnNum: "R",
    placeHolder: "Please select ...",
    type: QuestionType.SELECTOR,
    options: EDUCATION,
  },
  {
    label: "All Associated Roles",
    columnNum: "W",
    placeHolder: "Please select ...",
    type: QuestionType.MULTISELECT,
    options: ROLES,
  },
  {
    label: "Production Role",
    columnNum: "N",
    placeHolder: "Select A Prod Role ...",
    type: QuestionType.SELECTOR,
    options: PRODUCTIONROLE,
  },
  {
    label: "Vendor Onboarded Date",
    columnNum: "J",
    placeHolder: "Please select ...",
    type: QuestionType.DATEPICKER,
  },
  {
    label: "Production Ready Date",
    columnNum: "L",
    placeHolder: "Please select ...",
    type: QuestionType.DATEPICKER,
  },
  {
    label: "Est. Date of Prod. Start",
    columnNum: "M",
    placeHolder: "Please select ...",
    type: QuestionType.DATEPICKER,
  },
  {
    label: "Released from Onboarding",
    columnNum: "AA",
    placeHolder: "Please select ...",
    type: QuestionType.DATEPICKER,
  },
  {
    label: "Major/Area of Study",
    columnNum: "S",
    placeHolder: "Loading ...",
    type: QuestionType.TEXTAREA,
  },
  {
    label: "Technical Language Skills",
    columnNum: "X",
    placeHolder: "Loading ...",
    type: QuestionType.TEXTAREA,
  },
  {
    label: "Notes",
    columnNum: "F",
    placeHolder: "Loading ...",
    type: QuestionType.TEXTAREA,
  },
];

export const PROJECT_TAB_CONFIG: Column[] = [
  {
    label: "Base Project",
    columnNum: "I",
    placeHolder: "Select A Base Project",
    type: QuestionType.SELECTOR,
    options: BASEPROJECT,
  },
  {
    label: "Project - Work Type",
    columnNum: "H",
    placeHolder: "Select A Project",
    type: QuestionType.SELECTOR,
    options: PROJECTWORKTYPE,
  },
  {
    label: "Current Task",
    columnNum: "G",
    placeHolder: "Please select ...",
    type: QuestionType.SELECTOR,
    options: CURRENTTASK,
  },
  {
    label: "Assigned Project (q type)",
    columnNum: "V",
    placeHolder: "Please enter ...",
    type: QuestionType.INPUT,
  },
  {
    label: "Prod Lead",
    columnNum: "O",
    placeHolder: "Please enter ...",
    type: QuestionType.INPUT,
  },
  {
    label: "Prod Lead Ldap",
    columnNum: "P",
    placeHolder: "Please enter ...",
    type: QuestionType.INPUT,
  },
];

export interface Cell extends Column {
  disabled?: boolean;
  rowNum?: number;
  width?: string;
}

export interface SuperRaterRow {
  id: string;
  superRaterName: Cell;
  superRaterLDAP: Cell;
  pod: Cell;
  location: Cell;
  globalLogicEmail: Cell;
  googleEmail: Cell;
  onboardingStatus: Cell;
  highestLevelofEducation: Cell;
  allAssociatedRoles: Cell;
  productionRole: Cell;
  vendorOnboardedDate: Cell;
  productionReadyDate: Cell;
  estDateofProdStart: Cell;
  releasedfromOnboarding: Cell;
  majorAreaofStudy: Cell;
  technicalLanguageSkills: Cell;
  notes: Cell;
  baseProject: Cell;
  project: Cell;
  currentTask: Cell;
  assignedProject: Cell;
  prodLead: Cell;
  prodLeadLdap: Cell;
  isChecked?: boolean;
}

export const SUPERRATEROW_MAP: SuperRaterRow = {
  id: "Roster",
  superRaterName: {
    columnNum: "C",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Super Rater Name",
  },
  superRaterLDAP: {
    columnNum: "D",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Super Rater LDAP",
  },
  pod: {
    columnNum: "E",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Pod",
  },
  location: {
    columnNum: "Q",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Location",
  },
  globalLogicEmail: {
    columnNum: "AC",
    type: QuestionType.INPUT,
    disabled: true,
    label: "GlobalLogic Email",
  },
  googleEmail: {
    columnNum: "Z",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Google Email",
  },
  onboardingStatus: {
    columnNum: "K",
    type: QuestionType.SELECTOR,
    options: ONBOARDING_STATUS,
    disabled: true,
    label: "Onboarding Status",
  },
  highestLevelofEducation: {
    columnNum: "R",
    type: QuestionType.SELECTOR,
    options: EDUCATION,
    disabled: true,
    label: "Highest Level of Education",
  },
  allAssociatedRoles: {
    columnNum: "W",
    type: QuestionType.MULTISELECT,
    options: ROLES,
    disabled: true,
    label: "All Associated Roles",
  },
  productionRole: {
    columnNum: "N",
    type: QuestionType.SELECTOR,
    options: PRODUCTIONROLE,
    disabled: true,
    label: "Production Role",
  },
  vendorOnboardedDate: {
    columnNum: "J",
    type: QuestionType.DATEPICKER,
    disabled: true,
    label: "Vendor Onboarded Date",
  },
  productionReadyDate: {
    columnNum: "L",
    type: QuestionType.DATEPICKER,
    disabled: true,
    label: "Production Ready Date",
  },
  estDateofProdStart: {
    columnNum: "M",
    type: QuestionType.DATEPICKER,
    disabled: true,
    label: "Est Date of Prod Start",
  },
  releasedfromOnboarding: {
    columnNum: "AA",
    type: QuestionType.DATEPICKER,
    disabled: true,
    label: "Released from Onboarding",
  },
  majorAreaofStudy: {
    columnNum: "S",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Major Area of Study",
  },
  technicalLanguageSkills: {
    columnNum: "X",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Technical Language Skills",
  },
  notes: {
    columnNum: "F",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Notes",
  },
  baseProject: {
    columnNum: "I",
    type: QuestionType.SELECTOR,
    options: BASEPROJECT,
    disabled: true,
    label: "Base Project",
  },
  project: {
    columnNum: "H",
    type: QuestionType.SELECTOR,
    options: PROJECTWORKTYPE,
    disabled: true,
    label: "Project",
  },
  currentTask: {
    columnNum: "G",
    type: QuestionType.SELECTOR,
    options: CURRENTTASK,
    disabled: true,
    label: "Current Task",
  },
  assignedProject: {
    columnNum: "V",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Assigned Project",
  },
  prodLead: {
    columnNum: "O",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Prod Lead",
  },
  prodLeadLdap: {
    columnNum: "P",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Prod Lead Ldap",
  },
  isChecked: false,
};

export const ADD_SUPERRATEROW_MAP: SuperRaterRow = {
  id: "Roster",
  superRaterName: {
    columnNum: "C",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Super Rater Name",
  },
  superRaterLDAP: {
    columnNum: "D",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Super Rater LDAP",
  },
  pod: {
    columnNum: "E",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Pod",
  },
  location: {
    columnNum: "Q",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Location",
  },
  globalLogicEmail: {
    columnNum: "AC",
    type: QuestionType.INPUT,
    disabled: false,
    label: "GlobalLogic Email",
  },
  googleEmail: {
    columnNum: "Z",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Google Email",
  },
  onboardingStatus: {
    columnNum: "K",
    type: QuestionType.SELECTOR,
    options: ONBOARDING_STATUS,
    disabled: false,
    label: "Onboarding Status",
  },
  highestLevelofEducation: {
    columnNum: "R",
    type: QuestionType.SELECTOR,
    options: EDUCATION,
    disabled: false,
    label: "Highest Level of Education",
  },
  allAssociatedRoles: {
    columnNum: "W",
    type: QuestionType.MULTISELECT,
    options: ROLES,
    disabled: false,
    label: "All Associated Roles",
  },
  productionRole: {
    columnNum: "N",
    type: QuestionType.SELECTOR,
    options: PRODUCTIONROLE,
    disabled: false,
    label: "Production Role",
  },
  vendorOnboardedDate: {
    columnNum: "J",
    type: QuestionType.DATEPICKER,
    disabled: false,
    label: "Vendor Onboarded Date",
  },
  productionReadyDate: {
    columnNum: "L",
    type: QuestionType.DATEPICKER,
    disabled: false,
    label: "Production Ready Date",
  },
  estDateofProdStart: {
    columnNum: "M",
    type: QuestionType.DATEPICKER,
    disabled: false,
    label: "Est Date of Prod Start",
  },
  releasedfromOnboarding: {
    columnNum: "AA",
    type: QuestionType.DATEPICKER,
    disabled: false,
    label: "Released from Onboarding",
  },
  majorAreaofStudy: {
    columnNum: "S",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Major Area of Study",
  },
  technicalLanguageSkills: {
    columnNum: "X",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Technical Language Skills",
  },
  notes: {
    columnNum: "F",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Notes",
  },
  baseProject: {
    columnNum: "I",
    type: QuestionType.SELECTOR,
    options: BASEPROJECT,
    disabled: false,
    label: "Base Project",
  },
  project: {
    columnNum: "H",
    type: QuestionType.SELECTOR,
    options: PROJECTWORKTYPE,
    disabled: false,
    label: "Project",
  },
  currentTask: {
    columnNum: "G",
    type: QuestionType.SELECTOR,
    options: CURRENTTASK,
    disabled: false,
    label: "Current Task",
  },
  assignedProject: {
    columnNum: "V",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Assigned Project",
  },
  prodLead: {
    columnNum: "O",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Prod Lead",
  },
  prodLeadLdap: {
    columnNum: "P",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Prod Lead Ldap",
  },
  isChecked: false,
};

export interface DataWithFilter {
  data: SuperRaterRow[];
  filtered: SuperRaterRow[];
}

export const SUPERRATER_TABLEHEADER = [
  "",
  "super Rater Name",
  "super Rater LDAP",
  "base Project",
  "project",
  "current Task",
  "assigned Project",
  "pod",
  "location",
  "globalLogic Email",
  "google Email",
  "onboarding Status",
  "highest Level of Education",
  "all Associated Roles",
  "production Role",
  "vendor Onboarded Date",
  "production Ready Date",
  "est Date of Prod Start",
  "released from Onboarding",
  "major Area of Study",
  "technical Language Skills",
  "notes",
  "prod Lead",
  "prod Lead Ldap",
];

export const TABLE_CONFIG: Column[] = [
  { label: "Row Number", value: "id", columnNum: "B" },
  { label: "Super Rater Name", value: "superRaterName", columnNum: "C" },
];

export interface ActiveProjectRow {
  id: string;
  bugId: Cell;
  project: Cell;
  workflow: Cell;
  tasksubtype: Cell;
  workspace: Cell;
  qType: Cell;
  status: Cell;
  startDate: Cell;
  endDate: Cell;
  reviewCompleted: Cell;
  averageHandlingTime: Cell;
  isChecked?: boolean;
}

export interface ProjectDataWithFilter {
  data: ActiveProjectRow[];
  filtered: ActiveProjectRow[];
}

export const ACTIVEPROJECT_CONFIG: ActiveProjectRow = {
  id: "ActiveProject",
  bugId: {
    columnNum: "C",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Bug ID",
  },
  project: {
    columnNum: "F",
    type: QuestionType.SELECTOR,
    disabled: true,
    label: "Project",
    options: BASEPROJECT,
  },
  workflow: {
    columnNum: "G",
    type: QuestionType.SELECTOR,
    disabled: true,
    label: "Work Flow",
    options: getWorkFlowOptions(),
    width: "400px",
  },
  tasksubtype: {
    columnNum: "H",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Task Subtype",
  },
  workspace: {
    columnNum: "I",
    type: QuestionType.INPUT,
    disabled: true,
    label: "GlobalLogic Email",
  },
  qType: {
    columnNum: "J",
    type: QuestionType.SELECTOR,
    disabled: true,
    label: "Question Type",
    options: getQTypeOptions(),
    width: "400px",
  },
  status: {
    columnNum: "M",
    type: QuestionType.SELECTOR,
    disabled: true,
    label: "Status",
    options: WORKSTATUS,
  },
  startDate: {
    columnNum: "N",
    type: QuestionType.DATEPICKER,
    disabled: true,
    label: "Start Date",
  },
  endDate: {
    columnNum: "P",
    type: QuestionType.DATEPICKER,
    disabled: true,
    label: "End Date",
  },
  reviewCompleted: {
    columnNum: "R",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Review Completed",
  },
  averageHandlingTime: {
    columnNum: "U",
    type: QuestionType.INPUT,
    disabled: true,
    label: "Average Handling Time",
  },
  isChecked: false,
};

export const ADD_ACTIVEPROJECT_CONFIG: ActiveProjectRow = {
  id: "ActiveProject",
  bugId: {
    columnNum: "C",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Bug ID",
  },
  project: {
    columnNum: "F",
    type: QuestionType.SELECTOR,
    disabled: false,
    label: "Project",
    options: BASEPROJECT,
  },
  workflow: {
    columnNum: "G",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Work Flow",
    width: "400px",
  },
  tasksubtype: {
    columnNum: "H",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Task Subtype",
  },
  workspace: {
    columnNum: "I",
    type: QuestionType.INPUT,
    disabled: false,
    label: "GlobalLogic Email",
  },
  qType: {
    columnNum: "J",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Question Type",
    options: getQTypeOptions(),
    width: "400px",
  },
  status: {
    columnNum: "M",
    type: QuestionType.SELECTOR,
    disabled: false,
    label: "Status",
    options: WORKSTATUS,
  },
  reviewCompleted: {
    columnNum: "R",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Review Completed",
  },
  averageHandlingTime: {
    columnNum: "U",
    type: QuestionType.INPUT,
    disabled: false,
    label: "Average Handling Time",
  },
  startDate: {
    columnNum: "N",
    type: QuestionType.DATEPICKER,
    disabled: false,
    label: "Start Date",
  },
  endDate: {
    columnNum: "P",
    type: QuestionType.DATEPICKER,
    disabled: false,
    label: "End Date",
  },
  isChecked: false,
};

export const ACTIVEPROJECT_TABLEHEADER = [
  "",
  "bug Id",
  "project",
  "work flow",
  "task subtype",
  "work space",
  "question Type",
  "status",
  "start Date",
  "end Date",
  "review Completed",
  "average Handling Time",
];

export enum Dimension {
  DIMENSION_UNSPECIFIED,
  ROWS,
  COLUMNS,
}

export interface ValueRange {
  range: string;
  value: string;
  col?:string;
  column?:Cell;
}

export type Record = {
  [key: string]: ValueRange;
};

export const WORKFLOWFILTER_CONFIG = {
  label: "Work Flow",
  columnNum: "G",
  placeHolder: "Select A Work Flow",
  type: QuestionType.SELECTOR,
  options: getWorkFlowOptions(),
  width: "400px",
};

export const QTYPE_CONFIG = {
  label: "Question Type",
  columnNum: "J",
  placeHolder: "Select A Question Type",
  type: QuestionType.SELECTOR,
  options: getQTypeOptions(),
  width: "400px",
};

export interface Topprojectfilter {
  baseproject: string;
  workflow: string;
  qtype: string;
}

export interface Toprosterfilter {
  baseproject: string;
  project: string;
  productionrole: string;
  superrator: string;
}

export interface ChangeHistory {
  [key: number]: string
}