
export const BASE_URL = "http://localhost:8080/java-ee-practice/api";
export const resultsUrl = `${BASE_URL}/results`;
export const resultsGroupsUrl = `${BASE_URL}/resultsGroups`;
export const userUrl = `${BASE_URL}/users`;
export const adminUrl = `${BASE_URL}/admin`;

export const registerUrl = `${userUrl}/register`;
export const loginUrl = `${userUrl}/login`;
export const statisticUrl = `${userUrl}/statistic`;

export const bookUrl_create = `${BASE_URL}/books/donate`;
export const bookUrl_getGruped = `${BASE_URL}/books/gruped`;
export const bookUrl = `${BASE_URL}/books`;
export const bookUrl_getTaken = `${userUrl}/taken`;
export const adminUrl_allbooks = `${adminUrl}/books`;
export const adminUrl_bookhistory = `${adminUrl}/history`;

export const adminUserHistory="http://localhost:8080/java-ee-practice/api/admin/userHistory/";
export const adminUrl_bookinfo = `${adminUrl}/info`;



export const playersUrl = `${BASE_URL}/players`;
export const leadersUrl = `${BASE_URL}/leaders`;
export const tournamentUrl = `${BASE_URL}/tournament`;
