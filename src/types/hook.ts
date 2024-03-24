import Language from "./language";
import Runner from "./runner";
import { Option } from "effect"

export default interface Hook {
    id: string;
    name: string;
    description: string;
    code: string;
    language: Language;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    runner: Option.Option<Runner>;
}
