# engineer

## What is this?

This is a project for my engineering thesis. It's an application that helps with hospital appointments and patient registration.

It has been divided into 3 main parts:
* IdentityService - C# service responsible for authentication and authorization.
* database-service - Spring REST API
* mcc-app - Angular 8 front end that binds all parts together

## Main idea 

The main idea of this application is to divide users into 3 types: Patients, Doctors and Administration.
Each type has their own screen and functionalities.
- Patients can view possible appointments,
- Doctors can view only their patients data and their appointments,
- Administration activates new patients' accounts, can appoint patients, check all doctors' appointments

## Tech stack
- Spring Boot
- Hibernate
- Angular 8
- MySQL
- C#
