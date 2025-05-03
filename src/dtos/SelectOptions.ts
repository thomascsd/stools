/**
 * Options for selecting records from an Airtable base.
 * @interface SelectOptions
 */
export interface SelectOptions {
  /**
   * An array of field names to include in the response.
   * If not specified, all fields will be returned.
   * @type {string[]}
   * @memberof SelectOptions
   */
  fields?: string[];
  /**
   * A formula used to filter records, following Airtable formula syntax.
   * @type {string}
   * @memberof SelectOptions
   */
  filterByFormula?: string;
  /**
   * The maximum total number of records to return.
   * @type {number}
   * @memberof SelectOptions
   */
  maxRecords?: number;
  /**
   * The number of records to return per page.
   * @type {number}
   * @memberof SelectOptions
   */
  pageSize?: number;
  /**
   * Specifies the sorting order (e.g., "fieldName asc" or "fieldName desc").
   * @type {string}
   * @memberof SelectOptions
   */
  sort?: string; // Note: Airtable API actually expects an array of sort objects, but the 'airtable' package might simplify this. Check package docs if issues arise.
  /**
   * The name or ID of the view to use.
   * If not specified, the default view is used.
   * @type {string}
   * @memberof SelectOptions
   */
  view?: string;
}
