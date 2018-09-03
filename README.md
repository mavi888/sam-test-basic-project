### To package the project

aws cloudformation package --template-file template.yml --s3-bucket <name-of-the-bucket> --output-template-file packaged-template.yaml

### To deploy the project

aws --region <region> cloudformation deploy --template-file packaged-template.yaml --stack-name sam-test-basic-project --capabilities CAPABILITY_IAM

### To remove the stack from your account

aws --region <region> cloudformation delete-stack --stack-name sam-test-basic-project
