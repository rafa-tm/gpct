export interface Script {
  id: number;
  title: string;
  code: string;
  created_at: string;
  updated_at: string;
  shared: boolean;
}

export type Scripts = Array<Script>;
