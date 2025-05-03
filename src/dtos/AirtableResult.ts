/**
 * Represents the result of an Airtable query.
 */
export interface AirtableResult {
  records: AirtableResultRecord[];
}

/**
 * Represents a single record returned from an Airtable API call.
 *
 * @interface AirtableResultRecord
 * @property {string} id - The unique identifier for the record.
 * @property {Record<string, unknown>} fields - The fields of the record, represented as a key-value pair.
 * @property {string} createdTime - The creation time of the record in ISO 8601 format.
 */
export interface AirtableResultRecord {
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
