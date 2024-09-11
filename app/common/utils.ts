import { Badge, Project, SuperRaterRow, ActiveProjectRow } from "./constants";
export function titleToNumber(columnTitle: string): number {
  let result = 0;

  for (const char of columnTitle) {
    result = result * 26 + (char.charCodeAt(0) - "A".charCodeAt(0) + 1);
  }

  return result;
}

export function formatDate(date: Date) {
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return year + "-" + month + "-" + day;
}

export function validateDate(value: string) {
  if (Number.isNaN(Date.parse(value))) {
    return Date.now();
  }
  if (value.split("-").length > 1) {
    return Date.parse(value + "T00:00:00");
  }
  return Date.parse(value);
}

export function getBadge(idx: number, value: string): Badge {
  if (!value) return Badge.UNDEFINED;
  if (idx === 2 && value.toLowerCase() === "new role") return Badge.NEW_ROLE;
  if (idx === 2 && value.toLowerCase() === "newbie") return Badge.NEWBIE;
  return Badge.UNDEFINED;
}

export function createMapFromStr(input: string) {}

export function stringToArr(input: string) {
  if (!input) return [];
  input = input.replace(/"/g, "");
  return input.split(", ");
}

export function arrToObject(input: string[]): Project[] {
  if (!input) return [];
  const names = stringToArr(input[0]);
  const projects = stringToArr(input[1]);
  const res = [];
  for (let i = 0; i < names.length; i++) {
    res.push({ name: names[i], project: projects[i] });
  }
  return res;
}

export function getRowNumberFromId(input: string) {
  if (!input) return 0;
  const rowNum = input.split("-")[1].replace(".", "");
  return Number(rowNum);
}

export function getRowNumber(input: string) {
  if (!input) return 0;
  const rowNum = input.replace(".", "");
  return Number(rowNum);
}

export function convertSuperRaterRowToArray(row: SuperRaterRow) {
  return [
    row.id,
    row.superRaterName,
    row.superRaterLDAP,
    row.baseProject,
    row.project,
    row.currentTask,
    row.assignedProject,
    row.pod,
    row.location,
    row.globalLogicEmail,
    row.googleEmail,
    row.onboardingStatus,
    row.highestLevelofEducation,
    row.allAssociatedRoles,
    row.productionRole,
    row.vendorOnboardedDate,
    row.productionReadyDate,
    row.estDateofProdStart,
    row.releasedfromOnboarding,
    row.majorAreaofStudy,
    row.technicalLanguageSkills,
    row.notes,
    row.prodLead,
    row.prodLeadLdap,
  ];
}

export function convertSuperRaterRowToArrayExcludeId(row: SuperRaterRow) {
  return [
    row.superRaterName,
    row.superRaterLDAP,
    row.baseProject,
    row.project,
    row.currentTask,
    row.assignedProject,
    row.pod,
    row.location,
    row.globalLogicEmail,
    row.googleEmail,
    row.onboardingStatus,
    row.highestLevelofEducation,
    row.allAssociatedRoles,
    row.productionRole,
    row.vendorOnboardedDate,
    row.productionReadyDate,
    row.estDateofProdStart,
    row.releasedfromOnboarding,
    row.majorAreaofStudy,
    row.technicalLanguageSkills,
    row.notes,
    row.prodLead,
    row.prodLeadLdap,
  ];
}

export function convertActiveProjectRowToArray(row: ActiveProjectRow) {
  return [
    row.id,
    row.bugId,
    row.project,
    row.workflow,
    row.tasksubtype,
    row.workspace,
    row.qType,
    row.status,
    row.startDate,
    row.endDate,
    row.reviewCompleted,
    row.averageHandlingTime,
  ];
}

export function convertActiveProjectRowToArrayExcludeId(row: ActiveProjectRow) {
  return [
    row.bugId,
    row.project,
    row.workflow,
    row.tasksubtype,
    row.workspace,
    row.qType,
    row.status,
    row.startDate,
    row.endDate,
    row.reviewCompleted,
    row.averageHandlingTime,
  ];
}

export function getOptions(input: string[]) {
  input = input.filter((s) => s);
  return Array.from(new Set(input)).map((s) => ({ value: s, label: s }));
}

export function getColumnFromRange(input: string) {
  if (!input) {
    return "";
  }
}
