const utils = {
	localstorage: {
		setupGeopookData: function setupGeopookData(){
			const geopook_data = {
				users: new Array(),
				current_user: ""
			};
			const safeData = JSON.stringify(geopook_data);
			localStorage.setItem("geopook", safeData);
			return geopook_data;
		},//setupGeopookData
		
		//////////////////////////////////////////////////
		//USER FUNCTIONS 	//////////////////////////////
		//////////////////////////////////////////////////

		setCurrentUser: function setCurrentUser(username){
			const hasStorage = typeof(Storage !== "undefined");
			if(hasStorage){

				//get and update app data
				const geopook_data   = localStorage.getItem("geopook") || setupGeopookData();
				const AppData        = JSON.parse(geopook_data);			
				AppData.current_user = username;
				
				//store updated app ata
				const safeData       = JSON.stringify(AppData);
				localStorage.setItem("geopook", safeData);
				return {
					outcome: "SUCCESS",
					code: 200,
					message: `Current user set to ${username}`,
					data: {}
				}
			} else {
				return {
					outcome: "FAILURE",
					code: 501,
					message: "Local storage is not enabled",
					data: {}
				}
			}
		},//setCurrentUser
		requestCurrentUser: function requestCurrentUser(){
			const hasStorage = typeof(Storage !== "undefined");
			if(hasStorage){

				//get app data from localstorage
				const geopook_data = localStorage.getItem("geopook") || setupGeopookData();
				const AppData     = JSON.parse(geopook_data);
				const currentUser  = AppData.current_user;

				if(!!currentUser){
					return {
						outcome: "SUCCESS",
						code: 200,
						message: "User retreived",
						data: currentUser
					};
				} else {
					return {
						outcome: "FAILURE",
						code: 204,
						message: "No current user exists",
						data: {}
					};
				}
			} else {
				return {
					outcome: "FAILURE",
					code: 501,
					message: "Local storage is not enabled",
					data: {}
				};
			}
		},//requestCurrentUser
		clearCurrentUser: function clearCurrentUser(){
			const hasStorage = typeof(Storage !== "undefined");
			if(hasStorage){
				const geopook_data   = localStorage.getItem("geopook") || setupGeopookData();
				const AppData        = JSON.parse(geopook_data);
				AppData.current_user = "";

				const safeData       = JSON.stringify(AppData);
				localStorage.setItem("geopook", safeData);
				return {
					outcome: "SUCCESS",
					code: 200,
					message: `Current user removed`,
					data: {}
				}
			} else {
				return {
					outcome: "FAILURE",
					code: 501,
					message: "Local storage is not enabled",
					data: {}
				}
			}
		}//clearCurrentUser	
	},
	geolocation: {
		getUserLocation: function getUserLocation(){
			return new Promise((resolve, reject) => {
				if("geolocation" in navigator){
					navigator.geolocation.getCurrentPosition(({coords}) => {
						resolve({
							outcome: "SUCCESS",
							code: 200,
							message: "User geolocation retrieved",
							data: {
								latitude: coords.latitude,
								longitude: coords.longitude
							}
						})
					});
				} else {
					reject({
						outcome: "FAILURE",
						code: 501,
						message: "Geolocation is not enabled",
						data: {}
					});
				}
			}).catch((error) => {
				return error;
			})
		}
	},
	google: {
		addGoogleAPIScript: function addGoogleAPIScript(){

			const timeout       = 10000;
			const checkInterval = 100;

			return new Promise((resolve, reject) => {

				//add google api to page if it doesn't already exist
				if(!window.gapi){

					//add the api script to the paeg
					const script = document.createElement("script");
					script.src = "https://apis.google.com/js/api.js";
					script.async = true;
					document.body.appendChild(script);

					//see if the api has loaded yet
					const apiCheckInterval = setInterval(() => {
						if(window.gapi){
							clearInterval(apiCheckInterval);
							window.gapi.load("auth2", () => {
								resolve({
									outcome: "SUCCESS",
									code: 200,
									message: "Google APIs ready to use",
									data: window.gapi
								});
							});
						} else {
							console.log("no google api yet...")
						}
					}, checkInterval);

					//stop listening for API after 10 seconds;
					setTimeout(() => {
						clearInterval(apiCheckInterval)
						reject({
							outcome: "FAILURE",
							code: 408,
							message: "google api is taking a while to respond",
							data: {}
						})
					}, timeout);

				} 

				//if it's already on the page then just crack on, bud!
				else {
					resolve({
						outcome: "SUCCESS",
						code: 200,
						message: "Google APIs ready to use",
						data: window.gapi
					});
				}
			}).catch((error) => {
				return error;
			})
		},
		places: {
			setupAPI: async function setupAPI(key){
				try {
					const setupResponse = await addGoogleAPIScript();	
					if(setupResponse.outcome == "SUCCESS"){

						console.log("succeeded!")

						//SOLUTION COULD BE HERE : https://stackoverflow.com/questions/19476332/getting-gapi-client-is-undefined-when-trying-to-retrieve-an-authenticated-goog

						const API = window.gapi;//setupResponse.data;
						const url = `https://maps.googleapis.com/maps/api/js`;
						const params = {
							"key" : key,
							"libraries" : "places",
							"callback": testCallback
						}

						console.dir(window.gapi);

						const request = API.client.request({
							"path" : url,
							"params" : params
						});



						console.log("request: ", request);


						function testCallback(){
							console.log("places api loadeeed!")
						}
					} else throw setupResponse;
				} catch(error){
					return error;
				}
			}
		}
	}
};

const setupGeopookData = utils.localstorage.setupGeopookData;
const addGoogleAPIScript = utils.google.addGoogleAPIScript;

module.exports = utils;