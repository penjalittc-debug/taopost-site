# Авто-деплой на Selectel через GitHub Actions

Workflow `.github/workflows/deploy.yml` запускается на каждый push в `main` и
заходит на сервер по SSH, делает `git pull`, `npm ci`, `npm run build` и команду
перезагрузки.

## Что нужно настроить один раз

### 1. Создать deploy-пользователя на сервере (или использовать существующего)

На Selectel-сервере убедись, что есть пользователь, под которым крутится сайт
(например, `root`, `deploy` или `taopost`). У него должен быть SSH-доступ
и права на запись в папку проекта.

### 2. Сгенерировать SSH-ключ для GitHub Actions

На локальной машине (или прямо на сервере):

```bash
ssh-keygen -t ed25519 -C "github-actions@taopost" -f ~/.ssh/taopost_deploy -N ""
```

Это создаст два файла:
- `~/.ssh/taopost_deploy` — приватный ключ (его положим в GitHub Secret)
- `~/.ssh/taopost_deploy.pub` — публичный ключ (его положим на сервер)

### 3. Положить публичный ключ на сервер

Скопируй содержимое `~/.ssh/taopost_deploy.pub` и допиши его в файл
`~/.ssh/authorized_keys` на сервере (под тем пользователем, под которым
будет работать деплой):

```bash
# на сервере, под нужным пользователем
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "ssh-ed25519 AAAA...твой публичный ключ..." >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Проверь, что заход работает:
```bash
ssh -i ~/.ssh/taopost_deploy <user>@<host>
```

### 4. Добавить secret в GitHub

Нужен **один** секрет — приватный ключ. Адрес сервера, пользователь и путь
секретами не являются и с 01.09.2026 лежат дефолтами прямо в `deploy.yml`
(`155.212.182.80`, `root`, `/var/www/taopost-site`).

```bash
gh secret set SSH_KEY -R penjalittc-debug/taopost-site < ~/.ssh/taopost_deploy
```

Или руками: репозиторий → **Settings** → **Secrets and variables** → **Actions**
→ **New repository secret**, имя `SSH_KEY`, значение — содержимое приватного
ключа целиком, от `-----BEGIN OPENSSH PRIVATE KEY-----` до
`-----END OPENSSH PRIVATE KEY-----`.

Остальные секреты нужны, только если что-то отличается от дефолта:

| Имя | Когда нужен | Пример |
|---|---|---|
| `SSH_HOST` | Сервер переехал | `185.243.218.42` |
| `SSH_USER` | Деплой не под root | `deploy` |
| `DEPLOY_PATH` | Проект лежит не в `/var/www/taopost-site` | `/home/deploy/taopost-site` |
| `SSH_PORT` | Если SSH висит не на 22 | `2222` |
| `RELOAD_CMD` | Если перезапуск не `pm2 reload taopost-site` | `systemctl restart taopost` |

⚠️ `RELOAD_CMD` не ставь в `pm2 reload all`: на этом сервере рядом крутится
`taopost-app` (личный кабинет), и деплой сайта ронял бы его на пару секунд.

### 5. Запустить деплой

После добавления secrets:
- Любой `git push origin main` → автоматически запустится workflow и задеплоит изменения
- Или вручную: GitHub → **Actions** → **Deploy to Selectel** → **Run workflow**

Статус деплоя видно в логах в той же вкладке Actions.

## Что делает workflow

```bash
cd $DEPLOY_PATH
git fetch origin main
git reset --hard origin/main          # жёсткий ресет — чистая выкатка
npm ci --no-audit --no-fund           # установка из package-lock
npm run build                         # сборка Next.js
$RELOAD_CMD                           # pm2 reload taopost-site (по умолчанию)
```

Пока `SSH_KEY` не задан, шаг деплоя пропускается: push проходит с
предупреждением в логе, ручной запуск падает — чтобы «нажал кнопку, ничего
не задеплоилось» не выглядело как успешный прогон.

## Безопасность

- **Никогда не коммить приватный ключ в репозиторий** — только в GitHub Secrets
- `git reset --hard` сотрёт ВСЕ локальные изменения на сервере — на сервере не нужно ничего редактировать руками
- Если ключ скомпрометирован: удали из `~/.ssh/authorized_keys` на сервере и пересоздай

## Откат деплоя

Если последний деплой сломал прод:

```bash
# на локальной машине
git revert HEAD          # откатываем последний коммит
git push origin main     # workflow автоматически выкатит откат
```

Или вручную на сервере:

```bash
cd $DEPLOY_PATH
git log --oneline -10    # найти предыдущий рабочий коммит
git reset --hard <SHA>
npm ci && npm run build && pm2 reload all
```
