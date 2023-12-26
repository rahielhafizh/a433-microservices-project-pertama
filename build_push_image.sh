# Step 1: Membuat Docker Image
docker build -t item-app:v1 .  # Perintah ini membuat Docker image dengan nama "item-app" dan tag "v1"

# Step 2: Melihat daftar Image Lokal
docker images  # Perintah ini digunakan untuk melihat daftar semua Docker images yang ada di sistem lokal

# Step 3: Mengubah Nama Image
docker tag item-app:v1 rahielhfz/item-app:item-app-v1  # Perintah ini mengubah nama dan tag Docker image "item-app:v1" menjadi "rahielhfz/item-app:item-app-v1".

# Step 4: Login ke Docker Hub
docker login  # Perintah ini digunakan untuk login ke Docker Hub

# Step 5: Mengunggah Image ke Docker Hub
docker push rahielhfz/item-app:item-app-v1  # Perintah ini mengunggah Docker image "rahielhfz/item-app:item-app-v1" ke Docker Hub