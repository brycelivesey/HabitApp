this was my plan and i will tell yuo what is next:

I want to create an application that has the sole purpose of tracking habits daily and giving you an activity log similar to github's activity log.
I don't want to have any user accounts, I want it to be super lightweight and locally stored so that I dont have to serve it. 
The main features will be:
1. Create a daily goal - there is a plus button to add a daily goal, this daily goal can have a set/list of tasks (it will just be a popup with multiple input fields).
2. There will be an activity log/calendar - This should be almost exactly the same as github's activity log. Each daily goal will relate to its own activity log/calendar. it can either have the last 365 days or you can filter by year and show the 365 days in a specific year like 2024, 2025, etc.
3. For each "daily goal" there will be a "done" button - each time this is pressed, it will increment the count for the day (for that individual daily goal). Similar to GitHub, if you do this goal once in a day it will be a lower opacity opaque. for each time the goal is completed the opacity will go up 20%, up to 100% where anything more than 5 is just 100% solid color.
4. I want the UI design to be similar to github's too, their dark mode color scheme and button/component design is a good style to follow. 
Overall, the app should be pretty simple, it will have an add button in the top left. Will show pretty much just a list of activity logs that have the tiles like GitHub. The calendar will have a sort of container around it that is just a thin border that also contains the "done" button. each of these calendars will have tiles that represent the amount of times that goal was completed for the day. 

next: