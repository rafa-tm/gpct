import ResultMarkdown from './ResultMarkdown';

export default function ViewResult({ result, close }: { result: string; close: (value: boolean) => void }) {
  return (
    <div className="w-[75%] min-h-[100vh] bg-white p-16 relative border border-slate-900">
      <button
        onClick={() => close(false)}
        className="absolute -top-2 -right-2
        w-12 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-lg rounded-xl shadow-lg font-bold select-none
      ">
        X
      </button>
      <div className="absolute -top-4 left-[37%] ">
        <h3 className="bg-[#338AF0] text-white py-2 px-16 rounded-3xl text-xl font-bold">Pré-visualização</h3>
      </div>
      <ResultMarkdown markdown={result} />
    </div>
  );
}
