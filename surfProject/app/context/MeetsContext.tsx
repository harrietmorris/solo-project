import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import React from "react";
import { getMeets } from "../service/ApiService";
import { MeetType } from "../type/Types";
import { addMeet } from '../service/ApiService';


// type FormContextType = {
//     createMeet: (data: MeetType) => Promise<void>;
//     loading: boolean;
//     error: string | null;
//   };

interface FindContextProp {
    find: MeetType[];
    setFind: React.Dispatch<React.SetStateAction<MeetType[]>>; 
    createMeet: (data: MeetType) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const dataContext = createContext<FindContextProp | undefined> (undefined);


export const FindProvider: React.FC <{children: React.ReactNode}> = ({children}) => {
    const [find, setFind] = useState<MeetType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMeets().then(res => {
            if (res && res.data) {
              const data: MeetType[] = res.data;
            //   console.log('Data fetched from API:', data);
              setFind(data);
            } else {
              console.error('No data received');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      const createMeet = async (data: MeetType) => {
        setLoading(true);
        setError(null);
        try {
          await addMeet(data);
          console.log('reaching formContext:', data)
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };

    return (
        < dataContext.Provider value={ { find, setFind, createMeet, loading, error}}> 
            {children}
         </dataContext.Provider>
    )
}

// export const useFind = () => {
//     const context = useContext(FindContext);
//     if (!context) {
//         throw new Error("useFind must be used within a FindProvider");
//       }
//       return context;
// }
export const useDataContext = () => {
    const context = useContext(dataContext);
    console.log('accessing useFormContext')
    if (context === undefined) {
      throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
  };