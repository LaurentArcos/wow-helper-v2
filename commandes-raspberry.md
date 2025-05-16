# Commandes Raspberry

## 1. Supprimer l'ancienne instance de l'application dans PM2

pm2 delete wow-helper

## 2. Récupérer les dernières mises à jour du code

git pull

## 3. Installer les dépendances (si jamais il y a de nouvelles dépendances dans package.json)

npm install

## 4. Construire l'application pour la production

npm run build

## 5. Démarrer l'application avec PM2

pm2 start npm --name "wow-helper" -- start

## 6. Sauvegarder l'état des processus PM2 pour redémarrage automatique

pm2 save

## 7. Configurer PM2 pour démarrer au reboot du serveur (une seule fois si non fait)

pm2 startup
