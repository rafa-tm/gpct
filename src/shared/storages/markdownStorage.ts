import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

export type Markdown = {
  id: number;
  content: string;
};

type MarkdownStorage = BaseStorage<Markdown> & {
  save: (content: Markdown) => void;
  load: () => Promise<Markdown>;
  clear: () => void;
  remove: (id: number) => void;
};

const storage = createStorage<Markdown>(
  'markdown-storage-key',
  {
    id: 0,
    content: '',
  },
  {
    storageType: StorageType.Local,
  },
);

const markdownStorage: MarkdownStorage = {
  ...storage,
  // TODO: extends your own methods
  save: (content: Markdown) => {
    storage.set(content);
  },
  load: () => {
    return storage.get();
  },
  remove: (id: number) => {
    storage.remove(id);
  },
  clear: () => {
    storage.set({ id: 0, content: '' });
  },
};

export default markdownStorage;
