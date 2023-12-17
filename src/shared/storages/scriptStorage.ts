import { Script } from '@root/src/core/models';
import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type ScriptStorage = BaseStorage<Script> & {
  setScriptLocal: (script: Script) => void;
};

const storage = createStorage<Script>(
  'script-local-gpct-key',
  {
    id: '-1',
    title: '',
    code: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    shared: false,
  },
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const scriptStorage: ScriptStorage = {
  ...storage,
  // TODO: extends your own methods
  setScriptLocal: (script: Script) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    storage.set(currentScript => {
      return script;
    });
  },
};

export default scriptStorage;
