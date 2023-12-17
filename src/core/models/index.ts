// Objetivo: Exportar todos os models da aplicação
export interface Script {
  id?: string;
  title: string;
  code: string;
  created_at: string;
  updated_at: string;
  shared?: boolean;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  scripts?: Script[];
}

export interface Error {
  message: string;
  code: string;
}
