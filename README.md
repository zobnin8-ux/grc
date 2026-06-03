# GRC Field Operations — US industrial website (demo)

Демо-сайт для выхода на рынок **США** (Houston / Gulf Coast): промышленные полевые операции, мобилизация бригад, emergency response. Контент на **английском**; стратегия и ТЗ — в `docs/`.

**Репозиторий:** https://github.com/zobnin8-ux/grc  
**Локальная папка:** `D:\ArtemSite`

---

## Содержание

- [О проекте](#о-проекте)
- [Ветки Git](#ветки-git)
- [Стек и требования](#стек-и-требования)
- [Быстрый старт](#быстрый-старт)
- [Скрипты](#скрипты)
- [Страницы сайта](#страницы-сайта)
- [Интеграция заявок (GRC intake)](#интеграция-заявок-grc-intake)
- [Структура репозитория](#структура-репозитория)
- [Конфигурация контента](#конфигурация-контента)
- [UI и эффекты (ветка preview)](#ui-и-эффекты-ветка-preview)
- [Деплой на Vercel](#деплой-на-vercel)
- [Документация и исследования](#документация-и-исследования)
- [Перед продакшеном](#перед-продакшеном)
- [Безопасность npm](#безопасность-npm)
- [Лицензия](#лицензия)

---

## О проекте

| | |
|---|---|
| **Цель** | Маркетинговый сайт B2B для нефтехимии / тяжёлой промышленности US Gulf Coast |
| **Позиционирование** | Full-scale field operations + rapid deployment (не «перевод RU-сайта») |
| **Язык сайта** | English only |
| **Конкуренты (анализ)** | [1grc.ru](https://www.1grc.ru), [tissinc.com](https://tissinc.com/) — см. `research/`, `docs/` |
| **Статус** | MVP в проде: плейсхолдеры LLC/телефона/домена; **форма `/contact` подключена к системе GRC** (заявки → CRM Pipedrive + Telegram) |

Сайт построен на **Next.js App Router**, тёмная «операционная» тема (Tailwind), шрифты Inter / Oswald / IBM Plex Mono.

---

## Ветки Git

| Ветка | Назначение |
|-------|------------|
| **`main`** | Стабильная демо-версия без экспериментальных эффектов |
| **`preview`** | То же + **wow-эффекты** на главной и пульс Emergency CTA; удобно для Vercel Preview Deployments |

```powershell
git checkout main      # базовая демо
git checkout preview   # версия с эффектами
```

После согласования с клиентом: merge `preview` → `main` или promote деплоя на Vercel.

---

## Стек и требования

- **Node.js** 20+ (рекомендуется LTS)
- **npm** 10+
- **Next.js** 15.x (App Router)
- **React** 19
- **TypeScript** 5
- **Tailwind CSS** 3.4

---

## Быстрый старт

```powershell
cd D:\ArtemSite
npm install
npm run dev
```

Откройте http://localhost:3000

Продакшен-сборка:

```powershell
npm run build
npm run start
```

> На некоторых Windows-сетях `npm run build` может падать при загрузке шрифтов Google (`next/font`). На **Vercel** сборка обычно проходит успешно.

---

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с HMR |
| `npm run build` | Production build |
| `npm run start` | Запуск после `build` |
| `npm run lint` | ESLint (Next.js) |

---

## Страницы сайта

| URL | Описание |
|-----|----------|
| `/` | Главная: hero, capabilities, positioning, services, deployment, industries, process, trust, coverage, projects teaser, contact |
| `/services` | Хаб услуг |
| `/services/[slug]` | Страницы услуг (динамический роут) |
| `/service-area` | Зона обслуживания Gulf Coast |
| `/equipment` | Оборудование / готовность к выезду |
| `/projects` | Кейсы (заглушки до контента от клиента) |
| `/about` | О компании |
| `/contact` | Форма заявки → серверный роут `/api/lead` → система GRC (Pipedrive + Telegram) |

**Слуги (slug в `lib/site.ts`):**  
`field-machining`, `emergency-field-response`, `shutdown-turnaround-support`, `mobile-field-crews`, `rotating-equipment`, `mechanical-services`

---

## Интеграция заявок (GRC intake)

Форма `/contact` (`components/ContactForm.tsx`) отправляет заявку на **серверный роут** `app/api/lead/route.ts`, который пересылает её в систему GRC (Supabase Edge Function `intake`). Дальше бэкенд сам: кладёт лид, создаёт сделку в **Pipedrive** и шлёт уведомление в **Telegram**.

```
форма /contact → POST /api/lead (сервер сайта) → GRC intake → enrich → Pipedrive + Telegram
```

**Почему через серверный роут, а не напрямую:** токен `INTAKE_TOKEN` хранится в env сайта и **не попадает в браузер**. Плюс на роуте — honeypot-защита от ботов.

### Переменные окружения

Задать в Vercel (Project → Settings → Environment Variables) и локально в `.env.local` (см. `.env.example`):

| Переменная | Назначение |
|---|---|
| `INTAKE_URL` | эндпоинт GRC intake (в коде уже есть прод-дефолт, можно не задавать) |
| `INTAKE_TOKEN` | общий секрет; **должен совпадать** с секретом `INTAKE_TOKEN` на стороне Supabase |

> `INTAKE_TOKEN` — серверный секрет, в репозиторий не коммитится (`.env*.local` в `.gitignore`).

### Поля формы

`name`, `phone`, `email`, `company`, `location`, `urgency`, `message`. Обязателен телефон **или** email. Имя/компания/срочность попадают в заголовок сделки Pipedrive (`[Срочность] Имя — Компания`). Загрузка файлов пока не отправляется (demo).

---

## Структура репозитория

```
ArtemSite/
├── app/                    # Next.js App Router (страницы, layout, globals.css)
├── components/             # UI: Header, Footer, Hero, формы, секции, wow-компоненты
│   └── ui/                 # Button и пр.
├── lib/
│   └── site.ts             # Единый источник: название, услуги, города, кейсы
├── docs/                   # ТЗ, стратегия, вопросы клиенту (.md / .docx)
├── assets/                 # Скриншоты, материалы для дизайна/контента
├── research/               # HTML-снимки конкурентов для анализа
├── public/                 # Статика (если добавляется)
├── package.json
├── tailwind.config.ts
└── README.md
```

### Ключевые компоненты

| Компонент | Роль |
|-----------|------|
| `Hero.tsx` | Первый экран, CTA |
| `OpsStatusLine.tsx` | Строка статуса (ротация городов) — **preview** |
| `ProcessSteps.tsx` | Шаги процесса с появлением при скролле — **preview** |
| `ContactForm.tsx` | Форма контакта |
| `MobileCtaBar.tsx` | Липкий CTA на мобильных |
| `Header.tsx` / `Footer.tsx` | Навигация, emergency-ссылки |

---

## Конфигурация контента

Все плейсхолдеры и копирайт услуг — в **`lib/site.ts`**:

```ts
export const site = {
  name: "GRC Field Operations",
  legalName: "[Company LLC]",
  phone: "[281-XXX-XXXX]",
  email: "ops@[domain].com",
  // ...
};
```

После ответов клиента (см. `docs/Вопросы-клиенту-сайт-США.md`) замените:

- юридическое имя и LLC  
- телефон / `phoneHref`  
- email и домен  
- реальные кейсы в `projects`  
- блок Trust (страховка, сертификаты)

Форма `/contact` подключена к системе GRC через серверный роут `/api/lead` (см. раздел «Интеграция заявок» ниже). Email-провайдер (Resend/SMTP) на сайте не нужен — обработкой занимается бэкенд GRC.

---

## UI и эффекты (ветка `preview`)

На главной (CSS в `app/globals.css` + компоненты):

1. **Hero** — медленный zoom фона + film grain (`hero-zoom-image`, `hero-grain`)
2. **Ops status line** — ротация городов Gulf Coast под hero
3. **Service cards** — оранжевая полоса и lift при hover (`service-card-wow`)
4. **Process steps** — stagger при появлении в viewport (`ProcessSteps`)
5. **Emergency CTA** — пульс рамки на кнопках `variant="emergency"` + точка у пункта Emergency в шапке

Карта Gulf Coast с «лучами» **снята** по обратной связи; в Positioning — карточка **Mobilization hub** (Houston + список городов).

Анимации отключаются при `prefers-reduced-motion: reduce`.

---

## Деплой на Vercel

1. Import репозитория `zobnin8-ux/grc` в [Vercel](https://vercel.com).
2. Framework: **Next.js** (авто).
3. **Production branch:** `main`  
4. **Preview:** включить для ветки `preview` — отдельный URL на каждый push.

Для работы формы задайте переменную окружения (Production, и Preview если тестируете на preview-URL):

- `INTAKE_TOKEN` — общий секрет с Supabase intake (обязательно)
- `INTAKE_URL` — опционально (в коде есть прод-дефолт)

```powershell
# опционально: CLI
npx vercel
npx vercel --prod
```

---

## Документация и исследования

| Файл | Содержание |
|------|------------|
| `obsidian/GRC — сайт США.md` | **Хаб для Obsidian** (vault root = `D:\ArtemSite`) |
| `docs/Мастер-документ-сайт-США.md` | Полное ТЗ на сайт US |
| `docs/Кратко-стратегия-сайт-США-пункты-1-5.md` | Краткая стратегия (п. 1–5) |
| `docs/Вопросы-клиенту-сайт-США.md` | Вопросы для согласования с заказчиком |
| `docs/Strategiya-sait-USA-punkty-1-5.md` | Стратегия (латиница в имени файла) |
| `research/` | Сохранённые страницы конкурентов |

Русский сайт (1grc.ru) ведётся **отдельно** — не смешивать с этим репозиторием US Next.js.

---

## Перед продакшеном

- [ ] Заполнить `lib/site.ts` (LLC, phone, email, domain)
- [ ] Реальные кейсы EN (~6), без русских названий заводов
- [x] Подключить отправку форм (→ GRC intake через `/api/lead`)
- [ ] Trust: COI, certs — по готовности полиса
- [ ] Домен + DNS на Vercel
- [ ] SEO: уточнить meta/OG по страницам
- [ ] Решить: merge `preview` → `main` или оставить эффекты только на preview

---

## Безопасность npm

В `package.json` зафиксирован **`postcss ^8.5.10`** и `overrides` — чтобы закрыть moderate advisory без `npm audit fix --force` (который ломает совместимость с Next).

```powershell
npm audit
```

Не запускайте `npm audit fix --force` без проверки сборки.

---

## Git — типовые команды

```powershell
cd D:\ArtemSite
git status
git add README.md
git commit -m "docs: update README"
git push origin preview    # или main
```

---

## Лицензия

Проект **private** (`package.json`: `"private": true`). Права на код и контент — у владельца репозитория / заказчика.
