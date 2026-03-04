set -e

echo "Aguardando PostgreSQL..."

until pg_isready -h db -p 5432; do
  echo "Postgres ainda não está pronto... aguardando 2s"
  sleep 2
done

echo "Banco de dados ON!"

echo "Executando generate..."
npm run db:generate

echo "Executando migrate..."
npm run db:migrate

echo "Iniciando Servidor..."
npm run dev