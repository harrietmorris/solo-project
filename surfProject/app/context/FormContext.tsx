// import React, { createContext, useContext, useState } from 'react';
// import { addMeet } from '../service/ApiService';
// import { MeetType } from '../type/Types';

// // type FormContextType = {
// //   createMeet: (data: MeetType) => Promise<void>;
// //   loading: boolean;
// //   error: string | null;
// // };

// const FormContext = createContext<FormContextType | undefined>(undefined);
// // 
// export const FormProvider: React.FC <{children: React.ReactNode}> = ({children}) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const createMeet = async (data: MeetType) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await addMeet(data);
//       console.log('reaching formContext:', data)
//     } catch (e: any) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <FormContext.Provider value={{ createMeet, loading, error }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useFormContext = () => {
//   const context = useContext(FormContext);
//   console.log('accessing useFormContext')
//   if (context === undefined) {
//     throw new Error('useFormContext must be used within a FormProvider');
//   }
//   return context;
// };