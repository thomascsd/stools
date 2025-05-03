/**
 * Represents the result structure containing records from an Airtable query.
 * @interface AirtableResult
 */
export interface AirtableResult {
  /**
   * An array of records returned by the Airtable API call.
   * @type {AirtableResultRecord[]}
   * @memberof AirtableResult
   */
  records: AirtableResultRecord[];
}

/**
 * Represents a single record returned from an Airtable API call.
 * @interface AirtableResultRecord
 */
export interface AirtableResultRecord {
  /**
   * The unique identifier for the record.
   * @type {string}
   * @memberof AirtableResultRecord
   */
  id: string;

  /**
   * The fields of the record, represented as a key-value object.
   * Keys are field names, and values are the corresponding field values.
   * @type {Record<string, unknown>}
   * @memberof AirtableResultRecord
   */
  fields: Record<string, unknown>;

  /**
   * The creation time of the record in ISO 8601 format.
   * @type {string}
   * @memberof AirtableResultRecord
   */
  createdTime: string;
}
