/* eslint-disable @typescript-eslint/no-explicit-any */


interface IPLocation {
    ip: string;
    city: string;
    region: string;
    region_code: string;
    country_name: string;
    country_code: string;
    latitude: number;
    longitude: number;
    postal: string;
    error: any | null
}

// interface LocationState {
//     data: IPLocation | null;
//     loading: boolean;
//     error: string | null;
// }


const getLocation = async () => {
    try {

        // This single API call will automatically detect IP and return location
        const response = await fetch('https://ipapi.co/json/');
        const data: IPLocation = await response.json();

        if (data.error) {
            throw new Error(data.error || 'Failed to get location');
        }

        return {
            data: data,
            loading: false,
            error: null
        }


    } catch (error) {

        return {
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch location'
        };
    }
};

export default getLocation;