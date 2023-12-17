import Button from '@src/components/Button';
import MarkdownResult from '@pages/content/components/MeetPanel/MarkdownResult';
import { Script } from '@src/core/models';
import { Rnd } from 'react-rnd';
import { IconX } from '@tabler/icons-react';

export default function PreviewResult({ script, onClose }: { script: Script; onClose: () => void }) {
  return (
    <Rnd
      default={{
        x: 80,
        y: 56,
        width: 600,
        height: 600,
      }}>
      <div className="w-full h-full bg-white border border-black">
        <div className="w-full h-9 bg-gray-700 py-1 flex justify-between items-center px-2">
          <h5 className="text-base font-medium text-white">{script.title}</h5>
          <Button color="gray-light" className="px-2 py-1" onClick={onClose}>
            <IconX size={20} />
          </Button>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-[calc(100%-40px)] overflow-y-scroll p-2 flex flex-col gap-4">
            <MarkdownResult markdown={script.code} />
          </div>
        </div>
      </div>
    </Rnd>
  );
}
