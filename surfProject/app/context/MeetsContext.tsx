import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import React from "react";
import { getMeets, addMeet } from "../service/ApiService";
import { MeetType } from "../type/Types";
import { ListType } from "../type/ListType";



interface FindContextProp {
    find: ListType[];
    setFind: React.Dispatch<React.SetStateAction<ListType[]>>; 
    createMeet: (data: MeetType) => Promise<void>;
    loading: boolean;
    error: string | null;
    username: string | null;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

const dataContext = createContext<FindContextProp | undefined> (undefined);


export const FindProvider: React.FC <{children: React.ReactNode}> = ({children}) => {
    const [find, setFind] = useState<ListType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    const fetchMeets = async () => {
      try {
        const res = await getMeets();
        if (res && res.data) {
          const data: ListType[] = res.data;
          setFind(data);
        } else {
          console.log('no data receieved')
        }
      } catch (e) {
            console.log('Error updating data:', e)
          }
        }
  
    useEffect(()=> {
      fetchMeets()
    }, [])
  

    // useEffect(() => {
    //     getMeets().then(res => {
    //         if (res && res.data) {
    //           const data: ListType[] = res.data;
    //         //   console.log('Data fetched from API:', data);
    //           setFind(data);
    //         } else {
    //           console.error('No data received');
    //         }
    //       })
    //       .catch(error => {
    //         console.error('Error fetching data:', error);
    //       });
    //   }, []);

      const createMeet = async (data: MeetType) => {
        setLoading(true);
        setError(null);
        try {
            // setFind((prevFind) => [...prevFind, data]);
          await addMeet(data);
          fetchMeets();
          console.log('reaching formContext:', data)
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }

    return (
        < dataContext.Provider value={ { find, setFind, createMeet, loading, error, username, setUsername}}> 
            {children}
         </dataContext.Provider>
    )
}

export const useDataContext = () => {
    const context = useContext(dataContext);
    console.log('accessing useFormContext')
    if (context === undefined) {
      throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
  };