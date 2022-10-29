import { backendCall } from '../js/backendCall';
import { showToastMessage } from '../js/showToastMessage';

const URL='https://paykessup.herokuapp.com'

export const updatePasswordAPICall = async (data) => {
  let _url = `${URL}/updateUser`;
  let _response = {
    isSuccess: false,
  };
  await backendCall(_url, 'POST', data, false).then(async response => {
    if (response.statusCode < 400) {
      _response = {
        isSuccess: true,
      };
    }
  });

  return _response;
}
export const postComplainAPICall = async (data) => {
  let _url = `${URL}/sendComplain`;
  let _response = {
    isSuccess: false,
  };
  await backendCall(_url, 'POST', data, false).then(async response => {
    console.log("response here",response);
    if (response?.statusCode < 400) {
      _response = {
        isSuccess: true,
      };
    } else {
      showToastMessage('error', 'top', response.message.length > 0 ? response.message[0] : '');

    }
  });

  return _response;
}
