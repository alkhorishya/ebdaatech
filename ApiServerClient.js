import axios from "axios";
import {firestore} from "./firebase";
import {addDoc,collection,query,doc, where,getDocs, getDoc} from "@firebase/firestore"

axios.defaults.withCredentials = true; // Send cookies with requests

const SERVER_URL = [
  "https://language-api-sogu.onrender.com",
  "http://localhost:3001",
];

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjY3MGJmNzFjY2U0NjUyZTE1YmMxNyIsImlhdCI6MTY4OTY4ODc2OSwiZXhwIjoxNjkyMjgwNzY5fQ.DnuAWqr71gYfsx4DGFYNXPmh1Pzj6-AfGXU2uyq6VSA";

export default class ApiServerClient {

  static async getRandomWord() {
    try {
      console.log("GetDataSection");
      const response = await fetch('/api/words/random'); // Wait for fetch
      const data = await response.json(); // Wait for JSON parsing
      console.log("Print Data");
      console.log(data); // Log the received data
      return data; // Return the result
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error so the calling function can handle it
    }
  }
  
  static async getReviewQuestions(amount) {
    if (amount === undefined) {
      amount = 1;
    } else if (amount > 20) {
      amount = 20;
    }
    const response = await fetch(`/api/review/${amount}`); 
    const data = await response.json(); 
    console.log(data);
    // const url = `${SERVER_URL[0]}/api/review/${amount}`;
    return data;
  }
  // AUTH POST

  static saveData (TableName, data){
   
    try {
      addDoc(collection(firestore,TableName),data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  static async auth(TableName, data) {
    let result=false;
    try {
      // console.log("get");
      // console.log("datas:",data.data.email);

      const querySnapshot = await getDocs(collection(firestore, TableName));
      const dataList = querySnapshot.docs.map(doc => doc.data());
      dataList.map(item=>
         
        {
          console.log(item.data.email);

          if(item.data.email === data.data.email && item.data.password === data.data.password){
            console.log("gets");
            // console.log(item.email);
            result=true ;
          }
        }
        );
 
      
  }catch(e){

  }
  console.log(result);
  return result;
}
  
static async GetData(TableName, data) {
  let result=false;
  try {
    const querySnapshot = await getDocs(collection(firestore, TableName));
    const dataList = querySnapshot.docs.map(doc => doc.data());
    dataList.map(item=>
       
      {
        console.log(item.data.email);

        if(item.data.email === data.data.email && item.data.password === data.data.password){
          console.log("gets");
          // console.log(item.email);
          result=true ;
        }
      }
      );

    
}catch(e){

}
console.log(result);
return result;
}

  // AUTH GET
  static async authGet(action) {
  const url = `${SERVER_URL[0]}/auth/${action}?_=${new Date().getTime()}`;
  const response = await axios.get(url, { cache: 'no-cache', withCredentials: true });
  return response;
}
  // AUTH DELETE
  static async authDelete(action) {
    const url = `${SERVER_URL[0]}/auth/${action}`;
    const response = await axios.delete(url, { withCredentials: true });
    return response;
  }

  static getLearnedWords(user) {
    const url = `${SERVER_URL[0]}/auth/progress/learned`;
    return axios.get(url, {
      params: { user: user },
      withCredentials: true,
    });
  }

  static getReviewedWords(user) {
    const url = `${SERVER_URL[0]}/auth/progress/reviewed`;
    return axios.get(url, {
      params: { user: user },
      withCredentials: true,
    });
  }

  static setLearnedWords(words, user) {
    const url = `${SERVER_URL[0]}/auth/setwordslearned`;
    return axios.post(
      url,
      { new_words: words, user: user },
      { withCredentials: true }
    );
  }

  static setReviewedWords(words, user) {
    const url = `${SERVER_URL[0]}/auth/setwordsreviewed`;
    return axios.post(
      url,
      { new_words: words, user: user },
      { withCredentials: true }
    );
  }
}
