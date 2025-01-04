/**
 * Represents the result of an Airtable query.
 */
export interface AirtableResult {
  /**
   * The unique identifier for the record.
   */
  id: string;

  /**
   * The fields of the record, represented as a key-value pair.
   */
  fields: Record<string, unknown>;

  /**
   * The creation time of the record in ISO 8601 format.
   */
  createdTime: string;
}
