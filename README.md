## What is node-boot?
Node Boot is a framework for REST API management and it is similar to Spring boot. Node Boot is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript and combines elements of OOP (Object Oriented Programming).  

Node boot makes use of robust HTTP Server frameworks is Express. This gives developers the freedom to use the third-party modules which are available for the platform.

## What can I do with it?
You can simplify make your Node.JS web application with Typescript by using Dependency Injection, and RESTful apis throughout simple annotations.

## What about this library?
This library is enable the mail feature for the Node Boot framework only. It is easy to use like Spring mail. We have enable the feature to send mail via smtp

## How do I use it?
1. First of all you need install the lib in Node Boot application. 
2. Now you need to setup the properties in `application.properties` file in application.

### SMTP
For the send email via smtp you need to set the below property in `application.properties`.
```java
mail.type=smtp
mail.host=
mail.port=
mail.secure   //true/false
mail.tls=     //true/false
mail.auth.user=
mail.auth.pass=
mail.logger=   //true/false
```

We are provide the two diffrent ways to use send the email. 
1. Abstract class
2. Direct method

1. Abstract class
Abstract class machanism is use for the loose coupling. You can create the service class and extend the `BootMail` abstract class. Now you can inject your service and you will able to get the `sendMail` method to send the mail.

```typescript
import { Service } from "node-boot-core";
import { BootMail } from "node-boot-mail";

@Service("MailService")
export class MailService extends BootMail{
  constructor() {
    super()
  }
}


@Controller("home")
class MyClass {

    @Autowired("MailService")
    private mailService: MailService;

    private method() {
        this.mailService.sendMail({ body: "", subject: "", to: "" });
    }
}

```

2. Direct method
We are provide the other way to send mail via direct method. 

```typescript
import { sendMail } from 'node-boot-mail';

@Service("MailService")
export class MailService {
  public sendEmail() {
    await sendMail({ body: "", subject: "", to: "" });
  }
}
```

The send mail function accept the below properties:

**from** - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted '“Sender Name” sender@server.com', see Address object for details
**to** - Comma separated list or an array of recipients email addresses that will appear on the To: field
**cc** - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
**bcc** - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
**subject** - The subject of the email
**body** - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object.
**attachments** - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.

#### Optional parameters
**headers** - An object or array of additional header fields (e.g. {“X-Key-Name”: “key value”} or [{key: “X-Key-Name”, value: “val1”}, {key: “X-Key-Name”, value: “val2”}]). Read more about custom headers
**priority** - Sets message importance headers, either ‘high’, ‘normal’ (default) or ‘low’
**messageId** - optional Message-Id value, random value will be generated if not set
**date** - optional Date value, current UTC string will be used if not set

## Consulting
With official support, you can get expert help straight from Node Boot core team. We provide dedicated technical and team augmentation.

## Support
Node Boot is an MIT-licensed open source project. It can grow thanks to the support from the amazing team members.

<!-- ## Stay in touch

* Author - [<a href="https://codequality.us" target="_blank">Codequality Technologies</a>] -->

## License

Node Boot is MIT, Apache and BSD licensed.