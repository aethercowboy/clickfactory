export interface Material {
    name: string;
    stackSize: number;
    technologies?: string[]
}

export interface Ingredient {
    itemName: string;
    count: number;
}

// Starting Materials
export class HubParts implements Material {
    name = "HUB Parts";
    stackSize = 1;
}

// Raw Materials
export class Iron implements Material {
    name = "Iron";
    stackSize = 100;
    technologies = ["Iron Mining"];
}

export class Copper implements Material {
    name = "Copper";
    stackSize = 100;
    technologies = ["Copper Mining"];
}