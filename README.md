### To build, package and deploy this project follow this steps

1. Build SAM project

```
sam build --region <your region>
```

Example
```
sam build --region us-east-1
```

2. Create a S3 bucket. Only to do the first time you package this project
```
aws s3api create-bucket --bucket <name of bucket> --region <your region>
```

Example:
```
aws s3api create-bucket --bucket learning-serverless-publish-sam-app --region us-east-1
```

3. Package project

```
sam package --template-file <name of the template> --s3-bucket <name of the bucket you just created> --output-template-file <name of the output template file>
```

Example:
```
sam package --template-file template.yaml --s3-bucket learning-serverless-publish-sam-app --output-template-file packaged.yaml
```

4. Deploy project to cloudformation

Run this if there is no nested applications

```
sam deploy --region <your region> --template-file  <name of the output template file> --stack-name <name of your stack> --capabilities CAPABILITY_IAM
````

Example:
```
sam deploy --region us-east-1 --template-file packaged.yaml --stack-name learning-serverless-publish-sam-app --capabilities CAPABILITY_IAM
`````

## To clean up the application from your account

````
aws cloudformation delete-stack <name of your stack> --region <your region>
aws s3 rb s3://<name of the bucket you just created> --region <your region>
````