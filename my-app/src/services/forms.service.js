import axios from "axios";

const API_URL = "http://localhost:8080/form/";

class FormService {
 

  createProject(projectName, startDate, endDate, pmName, subLobName, customerName) {
    return axios.post(API_URL + "createproject", {
      projectName,
      startDate,
      endDate,
      pmName,
      subLobName,
      customerName
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new FormService();
