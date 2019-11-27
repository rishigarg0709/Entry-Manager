# Description 👈
It's an application which can capture the Name, email address, phone number of both visitor and host at frontend.
Users information along with the time stamp of entry is stored at backend.

When visitor will check-in it will trigger an email to the host informing him of the details of the visitor and when the visitor check-out it will generate an email to him informing him of his details like : 
1. Name
2. Phone
3. Check-in time,
4. Check-out time,
5. Host name
6. Address visited.

# Prerequisites
- [x] Node.js 6.9.1 or later - install from https://nodejs.org/

- [x] MongoDB 4.2.1 or later - install from https://www.mongodb.com/download-center/community   

# Installing - easy 🔌
1.	Download the repository
```
git clone https://github.com/rishigarg0709/Entry-Manager.git
```
2.	Open the Terminal (Linux & MacOS) or PowerShell (Windows) and change directory to the project folder.
3.	Type ‘npm install’ in the Terminal (PowerShell) and press Enter. All the dependencies would be installed.
4.	Go back to the Terminal (PowerShell) and be sure that you are pointing inside the project folder. To open the application, type ‘node server.js’ and press Enter.
5.	The application should be live on the local port 4800.  
6.	Type http://localhost:4800/ into a browser.
7.	Now you should be inside the application

# How to use it 📖
### Host Page

Firstly our application will ask for Host Details like his Name, Email and Password.

![Dashboard](https://github.com/rishigarg0709/Entry-Manager/blob/master/Readme_images/Host.png)

### Dashboard

Our Application will now ask Visitor wether he wants to Checkin or Checkout and he will choose option accordingly.
Also we have given a option of 'change host' by which a new user can become a host 

![Dashboard](https://github.com/rishigarg0709/Entry-Manager/blob/master/Readme_images/Dashboard.png)

If host has already checked in his information then our application will automatically redirect us to Dashboard page otherwise it will redirect us to Host Page

### Checkin Page

Our Application will ask visitor to enter his details like Name, Email and Phone Number which when submited will trigger an email to the email id provided by the host.

![Dashboard](https://github.com/rishigarg0709/Entry-Manager/blob/master/Readme_images/Checkin.png)

If visitor enters an email id which is already checked in but not checked out then it will not trigger any email.

### Checkout Page

Our Application will ask visitor to enter his details like Email id and Address visited which when submited will trigger an email to the visitor himself providing him his details like name, email, phone number, Checkin Time, Checkout Time, Host Name and Address visited.

![Dashboard](https://github.com/rishigarg0709/Entry-Manager/blob/master/Readme_images/Checkout.png)

If visitor does not enters same email id as he entered while check in then it will not trigger any email.

# Technologies

### Backend
- NodeJs
- ExpressJS

### Frontend 
- HTML
- CSS
- Bootsrap

### Database
- MongoDB

#### Nodemailer module has been used for generating emails.

# Limitations
Our Application will not trigger a SMS as it required use of various paid API's eg. Nexmo

# License 
Free to use, copy and distribute. :money_with_wings:


