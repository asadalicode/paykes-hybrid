import axios from "axios";
import { showToastMessage } from "../js/showToastMessage";

export const backendCall = async (
  url,
  method = "POST",
  data,
  isNavigate = true,
  isShowErrorMessage = true,
  contentType = "application/json"
) => {
  const _headers = {
    "Content-Type": contentType,
  };
let _payload= {
  method: method, // or 'PUT'
  headers: _headers,
}
if(method === "POST" || method === "PUT" ){
  _payload.body = JSON.stringify(data)
}


  let _response = "";
  await fetch(url,_payload)
    .then((response) => response.json())
    .then((data) => {
      _response = data;
      console.log("suucess 121113", data);

    })
    .catch((error) => {
      console.log("backend error 121113", error);
      let _responseData = error.response.data;
      if (isShowErrorMessage) {
        // let _error =typeof _responseData?.error?.message?.[0] === 'string'  ? _responseData?.error?.message?.[0] :"";
        showToastMessage('error', 'top', 'Internal server error', 3000, 60);
      }
      _response = _responseData;
    });
  // await axios(url, {
  //   method: method,
  //   data: data,
  //   headers: _headers,
  // })
  //   .then((response) => {
  //     _response = response.data;
  //   })
  //   .catch((error) => {
  //    console.log("backend error",error);
  //     let _responseData = error.response.data;
  //     if (isShowErrorMessage) {
  //     // let _error =typeof _responseData?.error?.message?.[0] === 'string'  ? _responseData?.error?.message?.[0] :"";
  //       showToastMessage('error', 'top', 'Internal server error', 3000, 60);
  //     }
  //     _response = _responseData;
  //   }); 

  return _response;
};
