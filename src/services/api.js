import axios from "axios";

function getAccessToken() {
  const accessTokenData = localStorage.getItem("accessToken");
  if (!accessTokenData) return "";
  const { value } = JSON.parse(accessTokenData);
  return value;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function createUser(userData) {
  const response = await api.post("/users/", {
    email: userData.email,
    password: userData.password,
  });
  return response.data;
}

export async function fetchUsers() {
  const response = await api.get("/users/");
  return response.data;
}

export async function authenticateUser(credentials) {
  const response = await api.post(
    "/users/login",
    new URLSearchParams({
      username: credentials.email,
      password: credentials.password,
    })
  );
  return response.data;
}

export async function fetchCurrentUser() {
  const response = await api.get("/users/me");
  return response.data;
}

export class UserService {
  static async fetchUsers() {
    const response = await api.get("/users");
    return response.data;
  }

  static async fetchActiveUsers() {
    const response = await api.get("/users/?is_active=true");
    return response.data;
  }

  static async updateUser(id, data) {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  }

  static async changePassword(data) {
    const response = await api.patch("/users/change-password", data);
    return response.data;
  }
}

export class TeamAssignmentService {
  static async createAssignment(data) {
    const response = await api.post("/team-assignments/", data);
    return response.data;
  }

  static async deleteAssignment(id) {
    const response = await api.delete(`/team-assignments/${id}`);
    return response.data;
  }

  static async updateAssignment(id, data) {
    const response = await api.patch(`/team-assignments/${id}`, data);
    return response.data;
  }
}

export class PersonService {
  static async fetchPeople() {
    const response = await api.get("/people/");
    return response.data;
  }

  static async fetchTeamlessPeople() {
    const response = await api.get("/people?has_team=false");
    return response.data;
  }

  static async updatePerson(id, data) {
    const response = await api.patch(`/people/${id}`, data);
    return response.data;
  }

  static async createPerson(data) {
    const response = await api.post("/people/", data);
    return response.data;
  }

  static async deletePerson(id) {
    const response = await api.delete(`/people/${id}`);
    return response.data;
  }

  static async fetchPerson(id) {
    const response = await api.get(`/people/${id}`);
    return response.data;
  }
}

export class TeamService {
  static async createTeam(data) {
    const response = await api.post("/teams", data);
    return response.data;
  }

  static async fetchTeams() {
    const response = await api.get(`/teams`);
    return response.data;
  }

  static async fetchTeamDetail(id) {
    const response = await api.get(`/teams/${id}`);
    return response.data;
  }

  static async fetchTeamMembers(id) {
    const response = await api.get(`/teams/${id}/members`);
    return response.data;
  }

  static async fetchTeamAssignments(id) {
    const response = await api.get(`/teams/${id}/assignments`);
    return response.data;
  }

  static async deleteTeam(id) {
    const response = await api.delete(`/teams/${id}`);
    return response.data;
  }

  static async updateTeam(id, data) {
    const response = await api.patch(`/teams/${id}`, data);
    return response.data;
  }
}

export class DestinationService {
  static async createDestination(data) {
    const response = await api.post("/destinations/", data);
    return response.data;
  }

  static async fetchDestinations() {
    const response = await api.get("/destinations/");
    return response.data;
  }

  static async fetchDestination(id) {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  }

  static async deleteDestination(id) {
    const response = await api.delete(`/destinations/${id}`);
    return response.data;
  }

  static async updateDestination(id, data) {
    const response = await api.patch(`/destinations/${id}`, data);
    return response.data;
  }
}

export class ProcessService {
  static async fetchProcesses(params) {
    const response = await api.get(`/processes/`, {
      params: params,
    });
    return response.data;
  }

  static async fetchLatest() {
    const response = await api.get("/processes/latest");
    return response.data;
  }

  static async fetchProcess(id) {
    const response = await api.get(`/processes/${id}`);
    return response.data;
  }

  static async createProcess(data) {
    const response = await api.post("/processes/", data);
    return response.data;
  }

  static async deleteProcess(id) {
    const response = await api.delete(`/processes/${id}`);
    return response.data;
  }

  static async editProcess(id, data) {
    const response = await api.patch(`/processes/${id}`, data);
    return response.data;
  }

  static async advancedSearch(params) {
    const response = await api.get("/processes/advanced", { params });
    return response.data;
  }
}

export class ProcessUpdateService {
  static async deleteProcessUpdate(id) {
    const response = await api.delete(`/process-updates/${id}`);
    return response.data;
  }

  static async createProcessUpdate(data) {
    const response = await api.post(`process-updates/`, data);
    return response.data;
  }
}
