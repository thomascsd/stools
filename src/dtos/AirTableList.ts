/**
 * Represents a list of records from Airtable.
 */
export interface AirtableList {
  offset?: string;
  records: AirtableRecord[];
}

/**
 * Represents a record in Airtable.
 */
/**
 * Represents a single record retrieved from an Airtable base.
 * It includes the record's unique ID, its fields, creation time,
 * and optionally, the comment count.
 * @interface AirtableRecord
 * @property {string} id - The unique identifier for the record.
 * @property {Record<string, unknown>} fields - The fields of the record, represented as a key-value pair.
 * @property {string} createdTime - The ISO 8601 formatted string representing when the record was created.
 * @property {number} [commentCount] - The optional number of comments associated with the record.
 */
export interface AirtableRecord {
  /**
   * The unique identifier for the record.
   */
  id: string;

  /**
   * The fields of the record, represented as a key-value pair.
   */
  fields: Record<string, unknown>;

  /**
   * The time when the record was created.
   */
  createdTime: string;

  /**
   * The number of comments associated with the record.
   * This field is optional.
   */
  commentCount?: number;
}
