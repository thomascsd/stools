/**
 * Represents a base object with an optional `id` property.
 *
 * @template T - The type of the object's properties.
 * @property {string} [id] - Optional unique identifier for the object.
 * @extends {Record<string, unknown>}
 */
export interface BaseObj extends Record<string, unknown> {
  id?: string;
}
/**
 * Represents the base model for data transfer objects.
 *
 * @implements {BaseObj}
 * @property {string} [id] - Optional unique identifier for the model.
 * @property {unknown} [x: string] - Index signature allowing additional properties of any type.
 */
export class BaseModel implements BaseObj {
  [x: string]: unknown;
  id?: string;
}
