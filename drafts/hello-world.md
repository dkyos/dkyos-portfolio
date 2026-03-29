---
title: "첫 번째 블로그 글: Hello World"
slug: hello-world
description: "개인 포트폴리오 사이트를 오픈하며 작성하는 첫 번째 블로그 글입니다. 사이트의 기술 스택과 앞으로의 계획을 소개합니다."
tags:
  - Next.js
  - Supabase
  - 포트폴리오
category: 개발
published: true
---

## 안녕하세요!

개인 포트폴리오 및 기술 블로그를 오픈했습니다. 이 글은 사이트가 정상적으로 동작하는지 확인하기 위한 첫 번째 테스트 글입니다.

## 기술 스택

이 사이트는 다음 기술로 구축되었습니다:

- **Next.js 15** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전한 개발
- **Tailwind CSS v4** - 유틸리티 기반 스타일링
- **Supabase** - 데이터베이스 및 인증
- **Vercel** - 배포 및 호스팅

## 코드 예시

간단한 TypeScript 예시입니다:

```typescript
interface Post {
  title: string;
  slug: string;
  content: string;
  published: boolean;
}

function getPublishedPosts(posts: Post[]): Post[] {
  return posts.filter(post => post.published);
}
```

## 앞으로의 계획

- 다양한 기술 주제에 대한 글 작성
- 프로젝트 경험 공유
- 개발 팁과 노하우 정리

앞으로 많은 글을 올릴 예정입니다. 감사합니다!
