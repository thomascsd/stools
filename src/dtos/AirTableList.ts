/**
 * Represents the response structure when listing records from Airtable.
 * This structure supports pagination through the optional `offset` property.
 *
 * @interface AirtableList
 * @property {string} [offset] - An optional token for pagination. If provided, it signifies more records are available. Use this token in subsequent requests to fetch the next page.
 * @property {AirtableRecord[]} records - An array containing the Airtable records retrieved in the response.
 */
export interface AirtableList {
  offset?: string;
  records: AirtableRecord[];
}

/**
 * Represents a single record retrieved from an Airtable base.
 * Contains the record's unique ID, its field data, creation timestamp,
 * and optionally, the comment count if requested.
 *
 * @interface AirtableRecord
 * @property {string} id - The unique identifier for this record within its Airtable table.
 * @property {Record<string, unknown>} fields - An object containing the record's data, where keys are field names (or IDs if requested) and values are the corresponding field contents.
 * @property {string} createdTime - An ISO 8601 formatted string representing the exact time the record was created.
 * @property {number} [commentCount] - An optional number indicating the count of comments on the record. This is only included if specifically requested.
 */
export interface AirtableRecord {
  /**
   * The unique identifier for the record.
   */
  id: string;

  /**
   * The fields of the record, represented as a key-value pair object.
   * Field values will correspond to their Airtable field types.
   */
  fields: Record<string, unknown>;

  /**
   * The ISO 8601 timestamp indicating when the record was created.
   */
  createdTime: string;

  /**
   * The number of comments associated with the record.
   * This field is optional and only present if requested.
   */
  commentCount?: number;
}
