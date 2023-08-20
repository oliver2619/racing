import { CarJson } from "./car-json";
import { TeamJson } from "./team-json";

export interface AppModelBaseJson {
    readonly cars: CarJson[];
    readonly teams: TeamJson[];
    readonly userTeam: string;
    readonly weather: string;
}