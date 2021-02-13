export interface Skill {
    id: string;
    name: string;
} 

export interface Profile {
    id: string;
    name: string;
} 

export interface Employee {
    name: string;
    profile: Profile;
    skills: Array<Skill>;
} 