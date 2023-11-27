import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

export type ScriptLocal = {
  title: string;
  code: string;
  created_at: string;
  updated_at: string;
};

type ScriptLocalStorage = BaseStorage<ScriptLocal> & {
  save: (content: ScriptLocal) => void;
  load: () => Promise<ScriptLocal>;
  clear: () => void;
};

const storage = createStorage<ScriptLocal>(
  'scriptLocal-storage-key',
  {
    title: '',
    code: '',
    created_at: '',
    updated_at: '',
  },
  {
    storageType: StorageType.Local,
  },
);

const scriptLocalStorage: ScriptLocalStorage = {
  ...storage,
  save: (content: ScriptLocal) => {
    storage.set({
      title: content.title,
      code: content.code,
      created_at: content.created_at === '' ? new Date().toLocaleString() : content.created_at,
      updated_at: content.updated_at,
    });
  },
  load: () => {
    return storage.get();
  },
  clear: () => {
    storage.set({ title: '', code: '', created_at: '', updated_at: '' });
  },
};

export default scriptLocalStorage;
