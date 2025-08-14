import axios from "axios";

const BASE_API = import.meta.env.VITE_BASE_API || "http://localhost:8080";

export async function calculate(image, variables) {
    const res = await axios.post(`${BASE_API}/api/calculate`, { image, variables }, { timeout: 60000 });
    return res.data;
}