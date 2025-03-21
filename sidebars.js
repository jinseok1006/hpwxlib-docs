// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '시작하기',
      items: [
        'getting-started/introduction',
        'getting-started/installation',
      ],
    },
    {
      type: 'category',
      label: '기본 사용법',
      items: [
        'basic-usage/reading',
        'basic-usage/writing',
      ],
    },
    {
      type: 'category',
      label: '고급 기능',
      items: [
        'advanced-features/document-structure',
        'advanced-features/objects',
        'advanced-features/metadata',
      ],
    },
    {
      type: 'category',
      label: '유틸리티',
      items: [
        'utilities/text-extractor',
        'utilities/empty-file-generator',
        'utilities/file-converter',
      ],
    },
    {
      type: 'category',
      label: '예제',
      items: [
        'examples/basic-examples',
        'examples/advanced-examples',
        'examples/real-world-examples',
      ],
    },
    {
      type: 'category',
      label: '문제 해결',
      items: [
        'troubleshooting/common-issues',
        'troubleshooting/performance-optimization',
        'troubleshooting/security',
      ],
    },
    {
      type: 'category',
      label: '참고 자료',
      items: [
        'references/api-reference',
        'references/additional-resources',
      ],
    },
  ],
};

module.exports = sidebars;
