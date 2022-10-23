# drop-your-list
## Requirement
- Spring Boot
- Maven
- Angular
## Usage

Clone by or download .zip file
```
$ git clone https://github.com/yyYiran/drop-your-list.git
```

Go into the project backend directory, build and run Spring Boot server
Install [maven](https://www.digitalocean.com/community/tutorials/install-maven-mac-os) if it's not alreasy installed. 
```
$ cd drop-your-list-backend
$ mvn clean install
$ mvn spring-boot:run
```
Open `http://localhost:8081/#/login` and get started. 

<img width="519" alt="image" src="https://user-images.githubusercontent.com/72692392/197384427-b38304a8-118a-4eb1-bc78-dc298b6d38ae.png">
You can login an existing account with username `kiki` and password `kiki`, who has "Carrie" in their booklist

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/72692392/197384590-26c409b1-989c-4c58-8ffc-c18aa3b805bb.png">
Once logged in, you can add/remove book to/from your booklist. 

![kiki-add-remove](https://user-images.githubusercontent.com/72692392/197385268-2b10d0f5-f430-4e59-8b61-df40d0feded4.gif)

