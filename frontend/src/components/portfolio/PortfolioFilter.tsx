import React from 'react';
import { ProjectCategory, RoomType } from '../../types';

interface PortfolioFilterProps {
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  selectedRoom: RoomType;
  onSelectRoom: (room: RoomType) => void;
  categories: ProjectCategory[];
  roomTypes: RoomType[];
  totalCount: number;
}

export const PortfolioFilter: React.FC<PortfolioFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedRoom,
  onSelectRoom,
  categories,
  roomTypes,
  totalCount,
}) => {
  return (
    <div className="space-y-6 pb-8 border-b border-[#E7E2D8] mb-10">
      {/* Category Filter Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#757069]">
            Filter by Archetype ({totalCount} Projects)
          </span>
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-xs font-sans uppercase tracking-[0.16em] transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#181716] text-[#FBF9F5] border-[#181716]'
                    : 'bg-[#FBF9F5] text-[#55504A] border-[#E7E2D8] hover:border-[#181716]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Room Type Secondary Filter */}
      <div>
        <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#847262] block mb-2">
          Room / Spatial Focus:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {roomTypes.map((room) => {
            const isActive = selectedRoom === room;
            return (
              <button
                key={room}
                type="button"
                onClick={() => onSelectRoom(room)}
                className={`px-3 py-1.5 text-[11px] font-sans transition-colors ${
                  isActive
                    ? 'bg-[#5D6853] text-[#FBF9F5] font-medium'
                    : 'text-[#757069] hover:text-[#181716] hover:bg-[#F2EDE4]'
                }`}
              >
                {room}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

