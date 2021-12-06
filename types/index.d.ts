export var __esModule: boolean;
export default generateArgTypes;

interface Json {
  [key: string]: string
    | number
    | boolean
    | NumberConstructor
    | StringConstructor
    | ObjectConstructor
    | ArrayConstructor
    | BooleanConstructor
    | DateConstructor
    | Json
    | Json[]
}

/**
 * Generate the arg types based on the component and recursive mixins.
 *
 * @param {object} component
 * @param {object} args
 *
 * @returns {object}
 */
declare function generateArgTypes(component: object, ...args: Json[]): object;
