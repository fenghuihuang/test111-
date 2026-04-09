/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Search, X, User, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Prince {
  name: string;
  description: string;
}

const PRINCE_DATA: Prince[] = [
  { name: "威廉王子 (Prince William)", description: "英国王储，威尔士亲王，英王查尔斯三世与戴安娜王妃的长子。" },
  { name: "哈里王子 (Prince Harry)", description: "萨塞克斯公爵，英王查尔斯三世与戴安娜王妃的次子。" },
  { name: "查尔斯王子 (Prince Charles)", description: "现任英国国王查尔斯三世，曾长期担任威尔士亲王。" },
  { name: "菲利普亲王 (Prince Philip)", description: "爱丁堡公爵，英国女王伊丽莎白二世的丈夫。" },
  { name: "乔治王子 (Prince George)", description: "威廉王子与凯特王妃的长子，英国王位第二顺位继承人。" },
  { name: "路易王子 (Prince Louis)", description: "威廉王子与凯特王妃的次子，以其活泼的表情包闻名。" },
  { name: "阿奇王子 (Prince Archie)", description: "哈里王子与梅根王妃的长子。" },
  { name: "阿尔贝王子 (Prince Albert II)", description: "现任摩纳哥亲王，格里马尔迪王朝首领。" },
  { name: "德仁亲王 (Prince Naruhito)", description: "现任日本天皇，即位前为德仁亲王，年号令和。" },
  { name: "悉达多太子 (Prince Siddhartha)", description: "古印度释迦族王子，后出家修行，创立佛教，被称为释迦牟尼佛。" },
  { name: "文莱马丁王子 (Prince Mateen)", description: "文莱苏丹的儿子，以其帅气的外表和在社交媒体上的活跃而闻名。" },
  { name: "汉姆丹王子 (Sheikh Hamdan)", description: "迪拜王储，绰号Fazza，以其诗作、马术和极限运动爱好著称。" },
  { name: "克里斯蒂安王子 (Prince Christian)", description: "丹麦王储，弗雷德里克十世的长子。" }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrinces = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return PRINCE_DATA;
    return PRINCE_DATA.filter(prince => 
      prince.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-8 selection:bg-red-100">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
            王子名称搜索工具
          </h1>
          <p className="text-slate-500 text-sm">
            快速查找并过滤世界各地知名王子的信息
          </p>
        </header>

        {/* Search Section */}
        <div className="relative mb-6 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="输入王子名称关键词，如 '威廉' 或 'Prince'..."
            className="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-12 text-slate-900 shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500 transition-all outline-none text-lg"
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              title="清空搜索"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {filteredPrinces.length > 0 ? `找到 ${filteredPrinces.length} 位匹配王子` : '无匹配结果'}
          </span>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredPrinces.length > 0 ? (
              filteredPrinces.map((prince) => (
                <motion.div
                  key={prince.name}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-6 rounded-3xl shadow-sm ring-1 ring-slate-100 hover:ring-red-200 hover:shadow-md transition-all group cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-red-50 rounded-xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">
                        {prince.name}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {prince.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-3xl shadow-sm ring-1 ring-slate-100"
              >
                <AlertCircle className="h-12 w-12 mb-4 opacity-20" />
                <p className="text-lg font-medium">未找到相关王子</p>
                <p className="text-sm">请尝试更换关键词或清空搜索框</p>
                <button
                  onClick={handleClear}
                  className="mt-6 text-red-600 font-semibold hover:text-red-700 transition-colors"
                >
                  显示全部王子
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer / Info */}
      <footer className="mt-20 text-center text-slate-400 text-xs pb-10">
        <p>© 2026 王子名称搜索工具 · 基于 React & Tailwind 构建</p>
      </footer>
    </div>
  );
}
