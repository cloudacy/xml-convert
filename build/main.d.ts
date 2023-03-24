export interface XMLObject {
    tag: string;
    attrs?: {
        [attr: string]: string | number;
    };
    children?: Array<XMLObject>;
    text?: string;
}
export declare function obj2xml(obj: XMLObject, pad?: string, options?: {
    selfClosingTags?: boolean;
    crlf?: boolean;
}): string;
