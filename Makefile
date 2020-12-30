build-image:
	docker build -t kino .

run-image:
	docker run -p 5000:5000 -d kino

push-image:
	docker tag kino unrufflednightingale/kino:latest
	docker push unrufflednightingale/kino:latest

run-locally:
	npm run dev
