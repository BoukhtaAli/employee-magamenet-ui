### Bootstrap Integration

run : npm i bootstrap@version --save to install bootstrap to your angular application
add bootstrap style to your application either via
- style.css : @import "~bootstrap/dist/css/bootstrap.css";
- angular.json css section : "bootstrap/dist/css/bootstrap.css"

### Angular CLI

ng g c name to generate component

ng new name to generate project

ng new name --routing=true --style=css to generate project with options

ng g class to generate classes

ng c s name to generate service

### Create and use Http Requests

goto app.module.ts and import http client module
goto your service class and import httpClient in the constructor

### Apply I18n 

1- npm i @ngx-translate/core @ngx-translate/http-loader --save
2- add translate module as defined in import section.
3- 
