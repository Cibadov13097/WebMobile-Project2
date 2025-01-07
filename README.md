# Recipe App

This project is a simple **Recipe App** built with React. It allows users to display, manage, search, and filter recipes. The app includes basic routing for easy navigation and features a contact form.

## Link to the GitHub Page That Hosts the Website  
[Recipe Manager App](https://github.com/Cibadov13097/WebMobile-Project2)

## Website video link
[Video](https://adauniversity-my.sharepoint.com/:v:/g/personal/cibadov13097_ada_edu_az/EX8ZrvZ--f1CsMJwqg3CAKIBvEKls-hNhzl3swSAP4etHg?e=pDLPSL&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D)

- View featured recipes on the homepage.
- Search and filter recipes by title, description, ingredients, difficulty, and tags.
- Add, edit, delete, and reorder recipes using a drag-and-drop interface.
- Contact form to send messages.
- Fully responsive design.

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**
- **npm** 
- **json-server**



## Setup Instructions


### Install Dependencies


If your project doesn’t already have a package.json file, you need to initialize it by running:

![resim](https://github.com/user-attachments/assets/37bdc1dc-7248-4633-a42e-2d7649ff14a5)

#### Install npm Packages


Common npm Commands for React Projects

![resim](https://github.com/user-attachments/assets/f984a403-a1cd-4c21-b21b-3a1b866e11e6)

![resim](https://github.com/user-attachments/assets/662f53c6-a0e5-4de1-8359-3bdd8afa7db6)

![resim](https://github.com/user-attachments/assets/821b1a8c-14c5-425e-b9c9-34fe6ee0c7bd)



Command for Server installing

![resim](https://github.com/user-attachments/assets/19cc7852-01fc-4c94-be04-4f96ef0239a4)

Then create a db.json file with the following structure

![resim](https://github.com/user-attachments/assets/ec41cf0d-092a-42e3-953f-70efa14872ff)


After that
Run this command in the terminal from the root directory of your React app.

![resim](https://github.com/user-attachments/assets/1b4049c3-5c9c-403e-b722-60c75acfc07b)

and also open another terminal and run this command for running server

![resim](https://github.com/user-attachments/assets/87eb9f48-e305-48c6-8a98-26e9f2dba5e8)


## Pages Overview
### HomePage

The HomePage serves as the entry point to the Recipe App. It includes:

A welcome section with an introduction to the app.
A featured recipes section that displays two randomly selected recipes from the database.
A projects section that lists additional project information with links to external repositories.

Screenshot of HomePage
![resim](https://github.com/user-attachments/assets/0388006b-d99c-454f-8aff-66b32589ef59)


### RecipesPage

The RecipesPage displays a list of all recipes and provides the following features:

Search Functionality: Users can search recipes by title, description, or ingredients.

Filter Functionality: Users can filter recipes by difficulty and tags.

Add, Edit, and Delete Recipes: Users can add new recipes, edit existing ones, or delete them.

Drag-and-Drop Reordering: Recipes can be reordered using a drag-and-drop interface.

Pagination: Recipes are paginated to display a manageable number of recipes per page.

Screenshot of RecipesPage
![resim](https://github.com/user-attachments/assets/9567572f-3c54-4df7-ab57-656987d7cd9c)


### ContactPage

The ContactPage provides a simple form for users to send a message. The form includes:

Input fields for subject, email, and message.
Form validation to ensure all fields are filled before submission.
Success and error messages displayed based on the response from the server.

Screenshot of ContactPage
![resim](https://github.com/user-attachments/assets/e1dcfb4d-9415-46be-870b-4f1d9fd29af6)

## Project Structure

![resim](https://github.com/user-attachments/assets/7bb62413-3926-42ef-85ea-5ef1094149a6)
![resim](https://github.com/user-attachments/assets/8a079119-2642-497f-9492-587e4c1497fa)

