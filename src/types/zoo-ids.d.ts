// see https://github.com/bryanmylee/zoo-ids/issues/15
declare module "zoo-ids" {
    type CaseStyle = "titlecase" | "camelcase" | "uppercase" | "lowercase" | "togglecase";

    interface GenerateIdOptions {
        numAdjectives: number;
        delimiter: string;
        caseStyle: CaseStyle;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export function generateId(seed?: any, options?: Partial<GenerateIdOptions>): string;
}
