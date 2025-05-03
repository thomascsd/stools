/**
 * Represents the options for selecting records.
 * @property {string[]} [fields] - An array of field names to include in the response. If not specified, all fields will be returned.
 * @property {string} [filterByFormula] - A formula used to filter records, following Airtable formula syntax.
 * @property {number} [maxRecords] - The maximum total number of records to return.
 * @property {number} [pageSize] - The number of records to return per page.
 * @property {string} [sort] - Specifies the sorting order (e.g., "fieldName asc" or "fieldName desc").
 * @property {string} [view] - The name or ID of the view to use. If not specified, the default view is used.
 */
export interface SelectOptions {
  fields?: string[];
  filterByFormula?: string;
  maxRecords?: number;
  pageSize?: number;
  sort?: string;
  view?: string;
}
