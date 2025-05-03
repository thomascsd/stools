/**
 * Represents the result of a deletion operation in Airtable.
 * @interface AirtableDeletion
 * @property {string} id - The unique identifier of the record that was deleted.
 * @property {boolean} deleted - Indicates whether the deletion was successful.
 */
export interface AirtableDeletion {
  id: string;
  deleted: boolean;
}
