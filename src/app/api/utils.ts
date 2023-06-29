import HttpMethod = Cypress.HttpMethod;
import {CheckError} from "app/store/checks/types";
import {HEADERS} from "app/api/types";

export async function callApi(method: HttpMethod, url: string, data?: any) {
    let error: CheckError | undefined;
    let body: any;
    try {
        const response = await fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: HEADERS
        });
        if (response.status !== 200) {
            error = await response.json();
        } else {
            body = await response.json();
        }
    } catch (e: any) {
        console.log('There was an error', e);
    }
    return {error, response: body}
}
