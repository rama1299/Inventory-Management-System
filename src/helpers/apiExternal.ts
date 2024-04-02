import axios, { AxiosResponse } from 'axios';

export class ApiExternal {
    static async getCountries(): Promise<any> {
        try {
            const url = 'https://restcountries.com/v3.1/all';
            const response: AxiosResponse<any> = await axios.get(url);

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error(`Failed to fetch data from API. Status code: ${response.status}`);
            }
        } catch (error) {
            throw new Error(`Fetching data from external API error: ${error}`);
        }
    }
}
