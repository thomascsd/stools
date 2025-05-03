/**
 * Represents the result of a successful update operation for a single record in Airtable.
 * @interface AirtableUpdateResult
 */
export interface AirtableUpdateResult {
  /**
   * The unique identifier of the updated record.
   * @type {string}
   * @memberof AirtableUpdateResult
   */
  id: string;
  /**
   * An object containing the updated fields and their values.
   * The keys are field names, and the values are the corresponding field values.
   * @type {Record<string, any>}
   * @memberof AirtableUpdateResult
   */
  fields: Record<string, any>;
  /**
   * The timestamp indicating when the record was created (ISO 8601 format).
   * Note: This reflects the original creation time, not the update time.
   * @type {string}
   * @memberof AirtableUpdateResult
   */
  createdTime: string;
}
