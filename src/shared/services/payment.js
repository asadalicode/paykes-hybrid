import { backendCall } from '../js/backendCall';
import { showToastMessage } from '../js/showToastMessage';

export const paymentAPICall = async data => {
  let _url = `https://us-central1-paykes.cloudfunctions.net/api_v1/payments`;
  let _response = {
    isSuccess: false,
  };

  await backendCall(_url, 'POST', data, false).then(async response => {
    if (!response.error) {
      _response = {
        isSuccess: true,
      };
    }
  });

  return _response;
};
export const getCardDetailsAPICall = async userId => {
  let _url = `https://us-central1-paykes.cloudfunctions.net/api_v1/users/${userId}`;
  let _response = {
    isSuccess: false,
    data: {}
  };

  await backendCall(_url, 'Get', {}, false, false).then(async response => {
    if (response.data) {
      _response = {
        isSuccess: true,
        data: response.data
      };
    }
  });

  return _response;
};

export const mPaisaAPICall = async data => {
  let _url = `https://us-central1-paykes.cloudfunctions.net/api_v1/m_payments/b2c`;
  let _response={
    isSuccess: false
  };

  await backendCall(_url, 'POST', {data}, false).then(async response => {
    if(response?.data === null){
      _response={
        isSuccess : false
      }
    }else{
      _response={
        isSuccess : true
      }
    }
  });

  return _response;
};

export const createCustomerAPICall = async data => {
  let _url = `https://us-central1-paykes.cloudfunctions.net/api_v1/customers`;
  let _response = {
    isSuccess: false,
  };
  await backendCall(_url, 'POST', data, false, false).then(async response => {
  });

  return _response;
};

export const getCustomerProfileAPICall = async phoneNumber => {
  let _phoneNumber = phoneNumber;
  let _url = `https://us-central1-paykes.cloudfunctions.net/api_v1/customers/filter?phoneNumber=${phoneNumber}`;
  let _response = {
    isSuccess: false,
    data: {},
  };

  await backendCall(_url, 'GET', {}, false).then(async response => {
    if (response.data) {
      _response = {
        isSuccess: true,
        data: response.data,
      };
    }
  });

  return _response;
};
export const currencyConverterAPICall = async usd => {
  let _url = `https://openexchangerates.org/api/latest.json?app_id=4156d6b185474d64945b6e590b354a69&symbols=KES`;
  let _response = {
    isSuccess: false,
    resultAmount: 0,
  };
  await backendCall(_url, 'GET', {}, false).then(async response => {
    if (response?.rates) {
      _response = {
        isSuccess: true,
        resultAmount: response.rates.KES,
      };
    }
  });

  return _response;
};



export const getTansectionAPICall = async userId => {
  let _url = `https://us-central1-paykes.cloudfunctions.net/api_v1//users/${userId}/mpesa-transactions`
  let _response = {
    isSuccess: false,
    result: [],
  };
  await backendCall(_url, 'GET', {}, false, false).then(async response => {
    if (response.data) {
      _response = {
        isSuccess: true,
        result: response.data,
      };
    }
  });

  return _response;
};


export const registerCardAPICall = async userId => {
  let _url = `https://us-central1-paykes.cloudfunctions.net/api_v1/users/${userId}`;
  let _response = {
    isSuccess: false,
    result: 0,
  };
  await backendCall(_url, 'GET', {}, false, false).then(async response => {
    if (response.data) {
      _response = {
        isSuccess: true,
        result: response.data,
      };
    }
  });

  return _response;
};
export const createCardAPICall = async (data, customerId) => {
  let _url = `https://us-central1-paykes.cloudfunctions.net/api_v1/customers/${customerId}/cards`;
  let _response = {
    isSuccess: false,
  };

  await backendCall(_url, 'POST', data, false, false).then(async response => {
    if (response.data) {
      _response = {
        isSuccess: true,
      };
    } else {
      showToastMessage('error', 'top', 'Server error', 3000, 60);
    }
  });

  return _response;
};

export const deleteCardAPICall = async (data, customerId, cardId) => {
  let _url = `https://us-central1-paykes.cloudfunctions.net/api_v1/customers/${customerId}/cards/${cardId}/disable`;
  let _response = {
    isSuccess: false,
  };
  await backendCall(_url, 'DELETE', data, false).then(async response => {
    if (response.data) {
      _response = {
        isSuccess: true
      }
    }
  });

  return _response;
};
