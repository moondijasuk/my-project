import React from 'react';
import { ChevronDown, Search, Underline } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

const menu = [
  {
    label: '발견',
    newest: false,
    dropdown: false,
    Underline: true,
  },
  {
    label: '채용',
    newest: false,
    dropdown: false,
    Underline: false,
  },
  {
    label: '워크숍/커뮤니티',
    newest: false,
    dropdown: true,
    Underline: false,
  },
  {
    label: '포폴 피드백',
    newest: true,
    dropdown: false,
    Underline: false,
  },
  {
    label: '에이전시',
    newest: false,
    dropdown: false,
    Underline: false,
  },
];

function APPHeader() {
  return (
    <div>
      <header className="w-full h-14 flex items-center justify-between px-2 border-b px-8">
        <div className="h-full flex gap-10">
          {/* 로고 */}
          <img src="src/assets/logo.svg" alt="@LOGO" className="w-30" />
          <nav className="h-full flex items-center gap-4">
            {menu.map((item) => {
              return (
                <div
                  className={`h-full font-medium flex gap-1 items-center ${
                    item.Underline && 'border-b-2 border-black'
                  }`}
                >
                  <p className="text-sm">{item.label}</p>
                  {item.dropdown && <ChevronDown size={16} />}
                  {item.newest && <p className="text-teal-300">NEW</p>}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {/* 검색창 */}
          <div className="flex items-center border px-3 rounded-full bg-neutral-50">
            <Search size={18} className="text-neutral-500" />
            <Input
              placeholder="230,000 이상의 크리에이티브 검색"
              className="w-60 placeholder:text-neutral-400 border-none focus-visible:ring-0"
            />
          </div>
          {/* 로그인 */}
          <Button variant={'link'}>로그인</Button>
          {/* 회원가입 */}
          <Button className="rounded-full">회원가입</Button>
        </div>
      </header>
    </div>
  );
}

export default APPHeader;
