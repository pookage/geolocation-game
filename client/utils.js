const utils = {
	localstorage: {
		getCurrentUser: function getCurrentUser(){
			const hasStorage = typeof(Storage !== "undefined");
			if(hasStorage){
				const geopook_data = localStorage.getItem("geopook");
				if(!geopook_data) setupGeopookData();
				else {
					const JSONData = JSON.parse(geopook_data);
					return JSONData;
				}
			} else {
				return {
					outcome: "failure",
					code: 501,
					reason: "Local storage is not enabled",
					data: {}
				}
			}
		},
		setupGeopookData: function setupGeopookData(){
			const geopook_data = {
				users: new Array(),
				current_user: ""
			};
			const safeData = JSON.stringify(geopook_data);
			localStorage.setItem("geopook", safeData);
		}
	}
};
const setupGeopookData = utils.localstorage.setupGeopookData;

module.exports = utils;