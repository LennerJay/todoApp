# todoApp
Steps to run the app

----REST-API----
  in the root directory(click the rest-api folder), copy and pase the .env.example then rename the ".env copy.example" into .env <br>
  In the TERMINAL LOG 
  type cd rest-api and enter
  type composer update and enter (wait untill it finishes installing, it may take a while)
  type php artisan migrate(just type y)
  type php artisan migrate:fresh --seed and enter
  type php artisan serve and enter
----END----

[NOTE => add new terminal]

----todo-app----
  in the root directory(click the todo-app folder), copy and pase the .env.example then rename the ".env copy.example" into .env
  In the TERMINAL LOG
  type cd todo-app and enter
  type npm install and enter
  type npm run dev
----END----
