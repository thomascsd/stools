export interface AirTableGetMapping {
  offset?: string;
  records: [
    {
      id: string;
      fields: Record<string, unknown>;
      createdTime: string;
      commentCount?: number;
    }
  ];
}
