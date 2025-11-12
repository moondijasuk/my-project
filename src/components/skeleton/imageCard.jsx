import { Eye, Heart } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

function SkeltonImageCard() {
  return (
    <div className="w-full flex flex-col gap-2">
      <Skeleton className="w-full aspect-square " />
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-12 h-4" />
        </div>
        <div className="flex items-center gap-3">
          {/* 조회수 */}
          <div className="flex items-center gap-1">
            <Eye size={18} className="text-neutral-400" />
            <p className="text-sm text-neutral-400">3</p>
          </div>
          {/* 좋아요 */}
          <div className="flex items-center gap-1">
            <Heart size={16} className="text-neutral-400" />
            <p className="text-sm  text-neutral-400">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeltonImageCard;
