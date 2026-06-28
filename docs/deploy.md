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

### 4. Добавить secrets в GitHub

Идёшь в репозиторий → **Settings** → **Secrets and variables** → **Actions**
→ **New repository secret**. Добавляешь 4 секрета:

| Имя | Что положить | Пример |
|---|---|---|
| `SSH_HOST` | IP или домен сервера Selectel | `185.243.218.42` или `taopost.ru` |
| `SSH_USER` | Имя пользователя на сервере | `root` или `deploy` |
| `SSH_KEY` | Содержимое **приватного** ключа `~/.ssh/taopost_deploy` (целиком, с `-----BEGIN OPENSSH PRIVATE KEY-----` до `-----END OPENSSH PRIVATE KEY-----`) | — |
| `DEPLOY_PATH` | Абсолютный путь к проекту на сервере | `/var/www/taopost-site` или `/home/deploy/taopost-site` |

И опционально (если не дефолт):

| Имя | Когда нужен | Пример |
|---|---|---|
| `SSH_PORT` | Если SSH висит не на 22 | `2222` |
| `RELOAD_CMD` | Если используется не `pm2 reload all` | `systemctl restart taopost` или `sudo systemctl restart taopost.service` |

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
$RELOAD_CMD                           # pm2 reload all (по умолчанию)
```

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
