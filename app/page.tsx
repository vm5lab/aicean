import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Aicean</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                登入
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                開始使用
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              AI 驅動的
              <span className="text-indigo-600">影片製作</span>
              <br />
              新時代
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              運用先進的 AI 技術，將您的創意轉化為專業級影片。無需複雜的技術背景，即可製作出令人驚艷的視覺內容。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                免費試用
              </Link>
              <Link
                href="#features"
                className="bg-white text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg text-lg font-medium border border-gray-300 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>

          {/* Feature Section */}
          <div id="features" className="mt-32">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              為什麼選擇 Aicean？
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              © 2025 Aicean. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "AI 智能編輯",
    description: "自動分析影片內容，智能推薦最佳剪輯方案，節省大量後期製作時間。",
    icon: (
      <svg
        className="w-6 h-6 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "一鍵生成",
    description: "輸入文字描述，AI 自動生成專業級影片，無需複雜的技術操作。",
    icon: (
      <svg
        className="w-6 h-6 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "智能優化",
    description: "自動調整影片品質，優化音效和畫面，確保最佳觀看體驗。",
    icon: (
      <svg
        className="w-6 h-6 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
        />
      </svg>
    ),
  },
];

const footerLinks = [
  {
    title: "產品",
    links: [
      { text: "功能", href: "#features" },
      { text: "定價", href: "/pricing" },
      { text: "案例", href: "/cases" },
    ],
  },
  {
    title: "資源",
    links: [
      { text: "教學", href: "/tutorials" },
      { text: "部落格", href: "/blog" },
      { text: "API", href: "/api" },
    ],
  },
  {
    title: "公司",
    links: [
      { text: "關於我們", href: "/about" },
      { text: "聯絡我們", href: "/contact" },
      { text: "加入我們", href: "/careers" },
    ],
  },
  {
    title: "法律",
    links: [
      { text: "隱私政策", href: "/privacy" },
      { text: "使用條款", href: "/terms" },
      { text: "Cookie 政策", href: "/cookies" },
    ],
  },
];
