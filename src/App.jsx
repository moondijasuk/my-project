import {
  ArrowUpDown,
  Camera,
  Eye,
  Heart,
  IdCard,
  MousePointerClick,
  Palette,
  PenTool,
  PlayCircle,
  Sparkles,
  Type,
} from 'lucide-react';
import APPHeader from './components/common/APPHeader';
import { Separator } from './components/ui/separator';
import { Skeleton } from './components/ui/skeleton';
import SkeltonImageCard from './components/skeleton/imageCard';

export default function App() {
  const dummySkeletons = [1, 2, 3, 4, 5, 6];
  const categories = [
    {
      incons: Type,
      label: '전체',
      isActive: true, //라벨 색상 통제를 위한 속성
    },
    {
      incons: PlayCircle,
      label: '영상/모션그래픽',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: Palette,
      label: '그래픽 디자인',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: IdCard,
      label: '브랜딩/편집',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: MousePointerClick,
      label: 'UI/UX',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: PenTool,
      label: '일러스트레이션',
      isActive: false, //라벨 색상 통제를 위한 속성
    },

    {
      incons: Type,
      label: '디지털 아트',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: Sparkles,
      label: 'AI',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: Type,
      label: '케릭터 디자인',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: Type,
      label: '제품/페키지 디자인',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: Camera,
      label: '포토그래픽',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: Type,
      label: '타이포그래피',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: Type,
      label: '공예',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: Type,
      label: '파인아트',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
    {
      incons: Type,
      label: '경기도 AI콘텐츠',
      isActive: false, //라벨 색상 통제를 위한 속성
    },
  ];
  return (
    <div className="w-screen h-screen px-8">
      {/* 베너 */}
      <div className="w-full h-15 flex items-center justify-center text-xl font-semibold bg-[#4EABFF]">
        <p className="text-white ">
          레퍼런스로 시작하는 스몰 브랜드 브랜딩 워크숍
        </p>
      </div>
      {/* 자회사 링크 */}
      <div className="w-full flex items-center gap-3 h-[34px] px-8">
        <Heart />
        <Separator orientation="vertical" className="h-3!" />
        <p className="font-semibold">notefolio</p>
        <Separator orientation="vertical" className="h-3!" />
        <p className="text-sm font-bold text-neutral-400">LOGO</p>
      </div>
      {/* 헤더 */}
      <APPHeader />
      <main className="flex flex-col items-center py-6">
        {/* 메인 홍보 갤러리 */}
        <section className="flex items-center gap-6 mt-6 overflow-x-scroll">
          {dummySkeletons.map((_, i) => (
            <Skeleton key={i} className="min-w-[520px] w-[520px] h-80" />
          ))}
        </section>
        {/* STICKY MENU */}
        <section className="flex gap-10 mt-20">
          <div className="flex flex-col gap-2">
            {/* 아이콘 */}
            <ArrowUpDown className="text-neutral-700" />
            {/* 아이콘 라벨 */}
            <p className="text-sm">정렬</p>
          </div>
          <Separator orientation="vertical" className="h-10!" />
          <div className="flex items-center gap-12">
            {categories.map((categories) => {
              const IconComponent = categories.incons;
              return (
                <div className="flex flex-col items-center gap-2">
                  <IconComponent className="text-neutral-700" />
                  <p className="text-sm">{categories.label}</p>
                </div>
              );
            })}
          </div>
        </section>
        {/* 이미지 리스트 */}
        <section className="w-full grid grid-cols-6 gap-6">
          <SkeltonImageCard />
          <SkeltonImageCard />
          <SkeltonImageCard />
          <SkeltonImageCard />
          <SkeltonImageCard />
          <SkeltonImageCard />
          <SkeltonImageCard />
          <SkeltonImageCard />
          <SkeltonImageCard />
          <SkeltonImageCard />
        </section>
      </main>
    </div>
  );
}
