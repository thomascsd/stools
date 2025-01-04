export interface AirtableListMapping {
  offset?: string;
  records: AirtableRecord[];
}

export interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
  createdTime: string;
  commentCount?: number;
}
