import axios from "axios";

export default class DashboardAnalytics {




    constructor(projectId, ssk) {
        this.projectId = projectId;
        this.ssk = ssk;
        this.baseUrl = "http://149.54.3.139:9892/api/v1";
    }



    async track(trackerId, value, itemId, name, extras=null) {

        const route = `${this.baseUrl}/${this.projectId}/tracker/${trackerId}/track`;

        const headers = {
            "x-project-secret": this.ssk,
            "Content-Type": "application/json",
        }

        const body = {
            "value": value,
            extras: extras,
            
        }
        
        if (itemId != null && name != null) {
            body.itemId = itemId;
            body.name = name;
        }


        try {
            
            // const response =await axios.post(route, body, {
            //     headers: headers,
            // });

            // console.log("Tracking response:", response.data);
            if (response.status !== 201) {
                throw new Error(`Error tracking: ${response.statusText}`);
            }
            return response.data;
        } catch (error) {
            console.error("Error tracking:", error);
            throw error;
        }
    }

}


export const dashboardAnalytics = new DashboardAnalytics("7d1935ec-764b-4b2a-89b0-cfdb45a65bc3", "2560aaaef578e6d39127f733c706c8b27f375dd28b226c9986798370703edb18");
