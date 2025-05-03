/**
 * Represents the result of an update operation in Airtable.
 * @interface AirtableUpdateResult
 * @property {string} id - The unique identifier of the updated record.
 * @property {Record<string, any>} fields - An object containing the updated fields and their values.
 * @property {string} createdTime - The timestamp indicating when the record was created.
 */
export interface AirtableUpdateResult {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}
