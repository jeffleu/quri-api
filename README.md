# UPC entry using Quri API
This application allows users to bulk upload UPCs using the Quri API.
[](https://raw.githubusercontent.com/jeffleu/quri-api/master/src/client/images/screenshot.png)

## Requirements
* [Node.js](https://node.js.org/) v6.x.x
* [NPM](https://www.npmjs.com/) v3.x.x
* [nodemon](https://nodemon.io/)

To install `nodemon` globally, run the following command:
```
npm install nodemon -g
```

## Download
You can either download the [zip file](https://github.com/jeffleu/quri-api/archive/master.zip) or use `git` to clone it down:
```
git clone https://github.com/jeffleu/quri-api.git
cd quri-api
```

## Usage
In order to use the application, first thing you would need to do is install the dependancies:
```
npm install
```

Once all the dependancies have been installed, run the following command to start up the local server:
```
npm run dev:start
```

Navigate to [localhost:8080](localhost:8080) to access the application.

#### Adding UPCs
When adding a UPC, there is immediate live feedback that will tell the user if the current UPC is in an incorrect format (has letters or incorrect length) via error message. If the current UPC is less than a length of 12 but all numbers, there is logic on the back end to find potential valid suggestions. The suggestion logic looks for two things:
* missing lead zeroes
* missing check digit

If the UPC is all numeric, but length is less than 12, `addLeadingZeroes` function will add the leading zeroes (until the UPC is a length of 12), then check to see if the updated UPC is valid or not (via the [upcitemdb](http://www.upcitemdb.com/) API). If after adding the leading zeroes the UPC is still invalid, it will then take the UPC, run `addCheckDigit` to add the check digit to the UPC (only if the length is 11), and check its validity against the upcitemdb API.

If after adding the check digit to the UPC and it's still not a valid UPC, the back end will send back an error message, which will be displayed under the input box.

#### Importing the UPC List
Users are only able to add a UPC to the list if it's a valid UPC (according to the upcitemdb API). When ready to import the entire list of UPCs using the Quri API, simply click the Import UPCs button. After the API request, there will be a message displayed under the buttons whether the import was a success or not.

## Note
If you do not have a paid [upcitemdb](http://www.upcitemdb.com/) plan, the API rate limit is 100 requests per day (per IP address).