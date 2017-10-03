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
	}
};

const setupGeopookData = utils.localstorage.setupGeopookData;

module.exports = utils;