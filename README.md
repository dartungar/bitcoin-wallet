# bitcoin-wallet

A prototype of bitcoin wallet, built with React and Python/FastAPI/PostgreSQL.

### Deployment

via Docker:

1. Copy docker-compose.yml
2. `docker-compose run` with default DB URL & credentials, or create `.env` with `DB_URL=`desired postgres DB URL.
3. Application will be awailable on `localhost:80` (change `docker-compose.yml` if needed)

### TO DO

- [ ] proper bitcoin seed & address generation
- [ ] nice responsive navigation
- [ ] non-basic styling
- [ ] auth
- [ ] secure seed management
- [ ] tests
