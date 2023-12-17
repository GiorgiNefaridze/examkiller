import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const networkClient = axios;

export default networkClient;
