/**
 * Represents the result of a deletion operation for a single record in Airtable.
 * @interface AirtableDeletion
 */
export interface AirtableDeletion {
  /**
   * The unique identifier of the record that was deleted.
   * @type {string}
   * @memberof AirtableDeletion
   */
  id: string;
  /**
   * Indicates whether the deletion was successful. Always true if the operation succeeded for this ID.
   * @type {boolean}
   * @memberof AirtableDeletion
   */
  deleted: boolean;
}
