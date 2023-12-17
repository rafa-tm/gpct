import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

interface EditorConfig {
  tutorial: boolean;
}

type EditorConfigStorage = BaseStorage<EditorConfig> & {
  toggleTutorial: () => void;
};

const storage = createStorage<EditorConfig>(
  'editorConfig-storage-key',
  {
    tutorial: true,
  },
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const editorConfigStorage: EditorConfigStorage = {
  ...storage,
  toggleTutorial: () => {
    storage.set(currentConfig => {
      return {
        ...currentConfig,
        tutorial: !currentConfig.tutorial,
      };
    });
  },
};

export default editorConfigStorage;
