import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

interface Config {
  tutorial: boolean;
}

type ConfigStorage = BaseStorage<Config> & {
  toggleTutorial: () => void;
};

const storage = createStorage<Config>(
  'config-storage-key',
  {
    tutorial: true,
  },
  {
    storageType: StorageType.Local,
  },
);

const configStorage: ConfigStorage = {
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

export default configStorage;
