OUT=src/grpc

protobuf:
	protoc \
	--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
	--js_out=import_style=commonjs,binary:$(OUT) \
	--ts_out=service=true:$(OUT) \
	-I $(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
	-I $(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway \
	-I $(GOPATH)/src/github.com/golang/protobuf \
	-I $(GOPATH)/src/ \
	-I node_modules/go-example-app/api \
	node_modules/go-example-app/api/example.proto
	sed -i '1i/* eslint-disable */' src/grpc/example_pb.js 
	sed -i '1i/* eslint-disable */' src/grpc/example_pb.d.ts 
	sed -i '/google_api_annotations_pb/d' src/grpc/example_pb.js 
	sed -i '/google_api_annotations_pb/d' src/grpc/example_pb.d.ts  
	sed -i '/github_com_mwitkow_go/d' src/grpc/example_pb.js 
	sed -i '/github_com_mwitkow_go/d' src/grpc/example_pb.d.ts 