---
title: GRC — сайт США (хаб Obsidian)
aliases:
  - ArtemSite
  - GRC US Site
  - Houston Gulf Coast Site
tags:
  - grc
  - usa
  - houston
  - industrial
  - nextjs
  - project-hub
  - intake
status: active
version: "1.2"
updated: 2026-05-22
repo: https://github.com/zobnin8-ux/grc
local_path: D:\ArtemSite
---

# GRC — сайт США · центральная заметка (Obsidian)

> **Назначение:** единая точка входа в проект — стратегия, ТЗ, код, статус, ссылки.  
> Откройте vault с корнем **`D:\ArtemSite`**, чтобы работали wikilinks на `docs/` и `README`.

---

## Быстрая навигация (MOC)

| Раздел | Ссылка |
|--------|--------|
| Полное ТЗ | [[docs/Мастер-документ-сайт-США]] |
| Стратегия (кратко, п. 1–5) | [[docs/Кратко-стратегия-сайт-США-пункты-1-5]] |
| Вопросы клиенту | [[docs/Вопросы-клиенту-сайт-США]] |
| Word (вопросы) | `docs/Вопросы клиенту.docx` |
| Word (стратегия) | `docs/Кратко-стратегия-сайт-США-пункты-1-5.docx` |
| Репозиторий / dev | [[README]] |
| Контент сайта (код) | `lib/site.ts` |
| Прокси заявок | `app/api/lead/route.ts` |
| Env-шаблон | `.env.example` |
| TISS разбор | `docs/Главная проблема TISS.docx` |

**Внешние ссылки**

- GitHub: https://github.com/zobnin8-ux/grc
- Конкурент US: https://tissinc.com/
- Внутренний ориентир capability (не публиковать на US-сайте): https://www.1grc.ru

---

## Статус проекта (дашборд)

| Поле | Значение |
|------|----------|
| **Фаза** | MVP: демо в проде + intake на `preview` |
| **Язык сайта** | English only |
| **Рынок** | Houston · US Gulf Coast |
| **Ветка стабильная** | `main` — без wow-эффектов, **без** `/api/lead` (пока) |
| **Ветка рабочая** | `preview` — wow + **GRC intake** |
| **Деплой** | Vercel (`zobnin8-ux/grc`) |
| **LLC / домен / телефон** | Placeholders в `lib/site.ts` |
| **Формы** | На **`preview`**: `/contact` → `POST /api/lead` → GRC intake → Pipedrive + Telegram |
| **Кейсы** | 6 заглушек, контент от клиента |
| **RU-сайт** | Отдельный репозиторий / папка — **не смешивать** |

### Чеклист «готово к продакшену»

- [ ] Ответы клиента: [[docs/Вопросы-клиенту-сайт-США]]
- [ ] Заполнить `lib/site.ts` (LLC, phone, email, domain)
- [ ] ~6 реальных кейсов EN (без имён RU-заводов)
- [ ] Фото: замена стока пакетом от клиента
- [ ] Trust: COI, certs — только подтверждённые
- [x] Backend форм → GRC intake (на `preview`, merge в `main` — TBD)
- [ ] `INTAKE_TOKEN` в Vercel Production (и Preview при тесте)
- [ ] Домен + DNS
- [ ] SEO: meta/OG по страницам
- [ ] Merge `preview` → `main` (эффекты + intake)

---

## Интеграция заявок (GRC intake)

> Актуально для ветки **`preview`** (коммиты `0b67dc1`, `cdad04c`).

### Цепочка

```
/contact (ContactForm.tsx)
  → POST /api/lead  (сервер Next.js, app/api/lead/route.ts)
    → Supabase Edge Function intake
      → enrich → Pipedrive (сделка) + Telegram (уведомление)
```

**Почему прокси, а не прямой вызов из браузера:** `INTAKE_TOKEN` только в env сервера, не утекает в клиент. На роуте — honeypot (`company_website`).

### Env (Vercel + `.env.local`)

| Переменная | Назначение |
|------------|------------|
| `INTAKE_URL` | URL intake (в коде дефолт на prod Supabase; можно не задавать) |
| `INTAKE_TOKEN` | Общий секрет с Supabase intake — **обязателен в prod** |

Шаблон: `.env.example` → скопировать в `.env.local`.

### Поля формы

`name`, `phone`, `email`, `company`, `location`, `urgency`, `message` + скрытый honeypot.

- Обязателен **телефон или email**
- `form`: `contact` или `emergency` (короткая форма)
- Имя / компания / срочность → заголовок сделки в Pipedrive
- Загрузка файлов — **пока нет** (demo)

### Ключевые файлы

| Файл | Роль |
|------|------|
| `components/ContactForm.tsx` | UI, fetch `/api/lead`, состояния sending/sent/error |
| `app/api/lead/route.ts` | Валидация, honeypot, прокси в intake |
| `.env.example` | Документация env |

---

## 1. Суть проекта (одним абзацем)

Создаётся **американский** B2B-сайт industrial field operations: не перевод 1grc.ru, не SaaS-лендинг, не образ «фургона с ключом». Целевое восприятие: **full-scale Gulf Coast operations + rapid deployment**. Конкурентный ориентир по UX/conversion — **TISS** (слабый CTA, нет proof на главной); по capability — факты с **1grc.ru**, перепакованные в US EN copy.

**Целевая реакция посетителя:**

> *These people look operationally ready.*

---

## 2. Зафиксированные решения

| Тема | Решение |
|------|---------|
| Россия / RU на US-сайте | **Нет** |
| Партнёры | **Не упоминать** |
| Язык | **English only** |
| Юрлицо | US LLC — placeholder |
| Люди / оборудование | **Все в США** (целевая модель) |
| Структура launch | **10 сильных + 2 коротких + 1 hub** |
| Кейсы launch | **~6** EN, без Severstal и т.п. |
| Insurance / certs | После LLC; Trust block **без выдумок** |
| Формы | **GRC intake** (не Resend/SMTP на сайте) |
| Фото старт | Сток допустим → замена |

Подробно: [[docs/Мастер-документ-сайт-США#6. Зафиксированные решения заказчика]]

---

## 3. Конкуренты (кратко)

### TISS — tissinc.com

| Метрика Site Doctor | Балл |
|---------------------|------|
| Общий | **48** |
| CTA | **25** |
| Доверие | 42 |

**Слабости:** нет CTA на главной, нет H1/meta, generic «leading provider», proof спрятан (150" VTL — только в Shop), brochure ~2014.

**Как бьём:** proof на первом экране, `tel:` + форма с реальным intake, emergency CTA, equipment-страница, тёмный operational UI, field-first.

### 1grc.ru (внутренний ориентир)

Сильный контент **ниже fold**; слабый hero/H1. На US-сайте: доказательства **выше**, без русского следа и имён RU-заводов.

---

## 4. Структура сайта (launch)

Принцип: **не 13 равных страниц** — глубина там, где есть факты.

| № | URL | Тип | В демо |
|---|-----|-----|--------|
| 1 | `/` | Home | ✅ |
| 2 | `/services` | Hub | ✅ |
| 3 | `/services/field-machining` | Сильная | ✅ |
| 4 | `/services/emergency-field-response` | Сильная | ✅ |
| 5 | `/services/shutdown-turnaround-support` | Сильная | ✅ |
| 6 | `/services/mobile-field-crews` | Сильная | ✅ |
| 7 | `/projects` | Кейсы (min 6) | ✅ заглушки |
| 8 | `/equipment` | Fleet | ✅ |
| 9 | `/service-area` | Gulf Coast | ✅ |
| 10 | `/about` | About | ✅ |
| 11 | `/contact` | Intake → `/api/lead` | ✅ на `preview` |
| 12 | `/services/rotating-equipment` | Короткая | ✅ |
| 13 | `/services/industrial-mechanical-services` | Короткая | ✅ |

**Core на hub:** Field Machining, Emergency, Shutdown, Mobile Crews, Equipment narrative.  
**Extended:** Rotating, Mechanical — короткие / «contact for scope».

**Фаза 2:** отдельный `/industries`, blog/SEO, цифры insurance, больше projects, upload файлов в форме.

Полная карта секций Home: [[docs/Мастер-документ-сайт-США#8.1 Home]]

---

## 5. Позиционирование и copy

### Hero (EN, в демо)

- **H1:** *Industrial field operations & rapid response*
- **Primary CTA:** Request Field Support
- **Secondary CTA:** Emergency Response
- **Geo:** Houston · Gulf Coast

### Capability strip (6)

Field Machining · Rotating Equipment · Mechanical Services · Shutdown Support · Mobile Crews · Emergency Response

### Запреты (anti-patterns)

- Переводный EN, «адаптивное производство», AI/SaaS визуал
- Выдуманные сертификаты и суммы страховки
- Российские бренды заводов на US-кейсах
- Партнёры, dual-language RU/EN
- Карта с «лучами» (пробовали на preview — **снято**)
- `INTAKE_TOKEN` в клиентском коде или в git

Список: [[docs/Мастер-документ-сайт-США#17. Запреты (anti-patterns)]]

---

## 6. Код и репозиторий

### Стек

- Next.js 15 (App Router)
- React 19, TypeScript, Tailwind 3.4
- Шрифты: Inter, Oswald, IBM Plex Mono (`next/font`)
- Backend заявок: Supabase Edge Function (GRC intake), не на этом репо

### Структура (ключевое)

```
app/
  api/lead/route.ts   → прокси в GRC intake (preview)
  page.tsx, layout.tsx, globals.css
components/           → Hero, Header, Footer, ContactForm, wow-компоненты
lib/site.ts           → контент и плейсхолдеры
docs/                 → ТЗ, стратегия, вопросы
research/             → снимки конкурентов
obsidian/             → эта заметка
.env.example          → INTAKE_URL, INTAKE_TOKEN
```

### Ветки Git

| Ветка | Содержимое |
|-------|------------|
| `main` | Стабильное демо, wow **нет**, intake **нет** (на момент v1.2) |
| `preview` | Wow-эффекты + `/api/lead` + обновлённый [[README]] |

```powershell
git checkout main
git checkout preview
```

### Локальный запуск (с формой)

```powershell
cd D:\ArtemSite
copy .env.example .env.local
# заполнить INTAKE_TOKEN
npm install
npm run dev
# http://localhost:3000
```

### Плейсхолдеры (`lib/site.ts`)

```ts
name: "GRC Field Operations"
legalName: "[Company LLC]"
phone: "[281-XXX-XXXX]"
email: "ops@[domain].com"
```

---

## 7. UI — ветка `preview` (wow-эффекты)

| # | Эффект | Файлы |
|---|--------|-------|
| 1 | Hero: slow zoom + film grain | `Hero.tsx`, `globals.css` |
| 2 | ~~Карта Gulf Coast с лучами~~ | **Удалено** — карточка Houston + города |
| 3 | Service cards: оранжевая полоса + lift | `service-card-wow`, `page.tsx` |
| 4 | Ops status line (ротация городов) | `OpsStatusLine.tsx` |
| 5 | Process steps: stagger при скролле | `ProcessSteps.tsx` |
| 6 | Emergency CTA pulse | `globals.css`, `Button.tsx`, `Header.tsx` |

`prefers-reduced-motion: reduce` → анимации отключены.

---

## 8. Вопросы клиенту (сводка)

Полный список: [[docs/Вопросы-клиенту-сайт-США]]

| Блок | О чём |
|------|-------|
| **A** | Название, LLC, домен, телефон, email, адрес Houston |
| **B** | Что реально продаёте в US (да/нет по услугам); топ-3 в hero; 3 факта vs TISS |
| **C** | Кейсы (~6), фото, сток |
| **D** | Оборудование в US, цифры для Equipment |
| **E** | Куда лиды, срочность, чат, вложения |
| **F** | COI, certs (только подтверждённые) |

**Статус ответов:** _ожидаем клиента_  
**Intake:** технически готов на `preview`; маршрутизация emergency vs ops — уточнить с клиентом (блок E).

---

## 9. SEO и деплой (напоминание)

- **SEO:** H1 на каждой странице, meta description — см. мастер-док §11
- **Vercel Production:** `main` (или `preview` после merge)
- **Vercel env:** `INTAKE_TOKEN` обязателен для рабочей формы
- **Preview deployments:** ветка `preview` — отдельный URL на push

---

## 10. Исследования и материалы

| Папка | Содержание |
|-------|------------|
| `research/` | HTML-снимки tissinc.com и др. |
| `assets/` | Скриншоты, референсы |
| `docs/` | ТЗ, стратегия, docx для клиента |

---

## 11. Журнал решений (log)

| Дата | Решение |
|------|---------|
| 2026-05 | US-only, EN, 10+2+1, placeholders LLC |
| 2026-05 | Demo Next.js → GitHub `zobnin8-ux/grc` |
| 2026-05 | Ветка `preview`: wow-эффекты на главной |
| 2026-05 | Карта с лучами — **отклонена**, Mobilization hub card |
| 2026-05 | Emergency pulse на preview |
| 2026-05 | Полный [[README]] + Obsidian-хаб v1.1 |
| 2026-05 | **Форма → GRC intake** через `/api/lead` (preview) |
| 2026-05 | README: раздел интеграции заявок, `.env.example` |

---

## 12. Следующие шаги

1. Получить ответы клиента → `lib/site.ts` и тексты  
2. Заменить 6 project placeholders  
3. Merge `preview` → `main` (intake + wow — по согласованию)  
4. `INTAKE_TOKEN` в Vercel Production  
5. Production domain + DNS  
6. Фаза 2: upload файлов, отдельный emergency routing  

---

## Связанные заметки (граф Obsidian)

- [[README]]
- [[docs/Мастер-документ-сайт-США]]
- [[docs/Кратко-стратегия-сайт-США-пункты-1-5]]
- [[docs/Вопросы-клиенту-сайт-США]]

---

*Версия хаба: 1.2 · обновляйте `updated` в frontmatter при крупных изменениях.*
