The second assignment showcases the use of object-oriented programming, and a "Pharmacy Inventory Managament System" was to be created. 

For this assignment, the title says "Register Medicines", and the system is divided into two parts. One part for the "medicine-form"-form, and one for the "medicine-list"-section.

Within the medicine-form, the user can register medicines, and within two categories. Either a prescription medicine, or an OTC-medicine, which is short for an over-the-counter-medicine. 
To be able to register medicine, all of the inputs needs to be filled. The user needs to fill out product name, manufacturer, expiration-date, select either prescription or OTC-type, and quantity. 
If they are not filled, the medicine will not be registered. 

For the medicine-list, this is the section where the medicine will appear after being successfully registered. 
The section contains two buttons, a "Display Prescription Medicines"-button, and a "Display Over-the-Counter Medicines"-button. 
These buttons will display their respective medicine types, where the medicine registered with OTC-type, will be shown to the user if the "Display Over-the-Counter Medicine" is clicked, 
and the prescription type medicines will be displayed to the user if the "Display Prescription Medicines" button is clicked. 

The medicine-list contains a set header for each medicine type, containing the product name, manufacturer, expiration date, medicine type and quantity. 
Each generated registered medicine have its own delete-button, where the user can remove any registered medicine of their choosing. 
The medicines are stored using localStorage, so the lists do not disappear when page is refreshed. 

The medicine-list displays only one of the medicine types at a time, and if the page is refreshed, no registered medicines are initially shown. 
The user needs to click one of the buttons to show the stored registered medicine. 
