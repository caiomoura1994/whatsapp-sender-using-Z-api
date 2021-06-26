import apiClient from '.';

const handleSuccess = (response) => response;
// const redirectTo = (document, path) => {
//   document.location = path
// }
// let document = { location: '' };
class ApiService {
  service;

  constructor() {
    this.service = apiClient;
    this.service.interceptors.response.use(handleSuccess);
  }
  // handleError(error) {
  //   switch (error.response.status) {
  //     case 401:
  //       redirectTo(document, '/')
  //       break;
  //     case 404:
  //       redirectTo(document, '/404')
  //       break;
  //     default:
  //       redirectTo(document, '/500')
  //       break;
  //   }
  //   return Promise.reject(error)
  // }
}
export default ApiService;
