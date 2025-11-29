VERSION := 1.0

deps-reset:
	git checkout -- go.mod
	go mod tidy
	go mod vendor

tidy:
	go mod tidy
	go mod vendor
	

CERT_DIR=app/services/katana-mock

dev-cert:
	go run app/services/katana-mock-cert/main.go
	mv cert.pem key.pem $(CERT_DIR)/
	@echo "✅ Dev certificate created in $(CERT_DIR)"

run:
	go run backoffice/app/services/office-api/main.go 

dbtool:
	go run app/services/seeder/main.go server

build-win:
	GOOS=windows GOARCH=amd64 go build -o abin/mock-server.exe app/services/katana-mock/main.go
	GOOS=windows GOARCH=amd64 go build -o abin/mock-server-cert.exe app/services/katana-mock-cert/main.go
	cp -r ./pb_data ./abin

build-mac:
	 go build -o abin/mock-server app/services/katana-mock/main.go
	 go build -o abin/mock-server-cert app/services/katana-mock-cert/main.go
	 cp -r ./pb_data ./abin
		