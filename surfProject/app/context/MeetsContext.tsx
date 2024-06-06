import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import React from "react";
import { getMeets } from "../service/ApiService";


interface FindInter {
    _id: String,
    organiser: String,
    date: Date,
    location: String, 
    description: String,
    tags: [{}], 
    attendants: [{}],
}



interface FindContextProp {
    find: FindInter[];
    setFind: React.Dispatch<React.SetStateAction<FindInter[]>>; 
}

const FindContext = createContext<FindContextProp | undefined> (undefined);

export const FindProvider: React.FC <{children: React.ReactNode}> = ({children}) => {
    const [find, setFind] = useState<FindInter[]>([]);

    useEffect(() => {
        getMeets().then(res => {
            if (res && res.data) {
              const data: FindInter[] = res.data;
              console.log('Data fetched from API:', data);
              setFind(data);
            } else {
              console.error('No data received');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    return (
        < FindContext.Provider value={ { find, setFind}}> 
            {children}
         </FindContext.Provider>
    )
}

export const useFind = () => {
    const context = useContext(FindContext);
    if (!context) {
        throw new Error("useFind must be used within a FindProvider");
      }
      return context;
}