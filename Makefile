build:
	docker build -t storefront-rw-frontend .

up:
	docker run -p 3000:3000 --name storefront-rw-frontend --restart=on-failure storefront-rw-frontend

down:
	docker rm -f storefront-rw-frontend