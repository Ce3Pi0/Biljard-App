import { fetchInfo, TableElementTemplate } from '../interfaces/interfaces';


const requestDBChange: Function = (url:string, { method, headers, body, redirect, signal }: fetchInfo) =>{
    
    fetch(url, {
            method:method,
            headers:headers,
            body:body,
            signal: signal,
            redirect: redirect
          })
          .then(data => {
            if (data.status === 401 || data.status === 422){
                  let refreshHeaders = new Headers();
                        
                  refreshHeaders.append("Authorization", `Bearer ${window.localStorage.getItem("refresh_token")}`);
                  refreshHeaders.append("Content-Type", "application/json");
                                  
                  fetch("https://ce3pi0.pythonanywhere.com/users/refresh_token", {
                      method:"GET",
                      headers: refreshHeaders
                  })
                  .then(data => {
                      if (!data.ok)
                          throw Error("There was a mistake!")
                      return data.json();
                  })
                  .then(json => {
                      localStorage.setItem("session_id", json.access_token);
                      localStorage.setItem("refresh_token", json.refresh_token);

                      let myHeaders = new Headers();
                      myHeaders.append("Authorization", `Bearer ${json.access_token}`);
                      myHeaders.append("Content-Type", "application/json");

                      fetch(url, {
                        method:method,
                        headers:myHeaders,
                        body:body,
                        signal: undefined,
                        redirect: undefined
                      })
                      .then(data => {
                        if(!data.ok){
                            throw Error("Something went wrong!")
                        }
                        return data.json()
                    })
                      .then(json => {
                        window.location.reload()
                    })
                  })
                  .catch(e => {
                      if (window.localStorage.getItem('logged_in') === "true"){
                          window.alert("Session expired!");
                          window.location.assign('/account');
                          window.localStorage.clear();    
                      }
                  })
              }else {
                  if(!data.ok){
                    console.log(data.json());
                    throw Error("Something went wrong!")
                  }
                  return data.json();
              }
          })
          .then(json => window.location.reload())
}

export default requestDBChange;