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
