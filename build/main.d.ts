export interface XMLObject {
    tag: string;
    attrs?: {
        [attr: string]: string | number;
    };
    content?: string | XMLObject[];
}
export declare function obj2xml(obj: XMLObject, options?: {
    selfClosingTags?: boolean;
    crlf?: boolean;
}): string;
