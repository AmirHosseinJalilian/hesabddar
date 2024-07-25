export type StepperFormStep = {
  name: string;
  path: string;
}

export const CreateNurseSteps = [
  {
    name: 'Personal Info',
    path: 'personal-info',
  },
  {
    name: 'Contract Info',
    path: 'contract-info',
  },
  {
    name: 'Addresses',
    path: 'addresses',
  },
  {
    name: 'Permissions',
    path: 'permissions',
  },
  {
    name: 'Absences',
    path: 'absences',
  }
] satisfies StepperFormStep[]

interface FormStep extends StepperFormStep {}

export enum CreateNurseStepsEnum {
  PersonalInfo = 0,
  ContractInfo = 1,
  Addresses = 2,
  Permissions = 3,
  Absences = 4,
}

export interface NurseState {
  createNurseActiveStep: FormStep;
  currentUserId: string;
  currentNurseId: string;
}

export type StepChangedPayloadType = FormStep;
export type CurrentUserIdChangedPayloadType = string;
export type CurrentNurseIdChangedPayloadType = string;

