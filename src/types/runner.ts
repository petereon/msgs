import Language from "./language";

export enum RunnerType {
    Deta = 'deta',
    Local = 'local',
}

export default interface Runner {
    id: string;
    name: string;
    description: string;
    language: Language;
    type: RunnerType;
}
