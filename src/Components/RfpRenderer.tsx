import type { RfpBlockType } from "../types";
import RfpBlock from "./RfpBlock";

const RfpRenderer = ({ data }: { data: RfpBlockType[] }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="bg-white shadow-lg w-[800px] mx-auto p-4">
        
        {/* CSS columns */}
        <div className="columns-3 gap-4">
          {data.map((block, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <RfpBlock block={block} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RfpRenderer;