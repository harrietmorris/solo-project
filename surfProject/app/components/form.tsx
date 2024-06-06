import React from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { View, StyleSheet, Text } from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper"
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { useDataContext } from "../context/MeetsContext"


type NewMeet = {
    organiser: string,
    date: Date,
    location: string, 
    description: string,
    tags: Array<Record<string, unknown>>;
  attendants: Array<Record<string, unknown>>;
}

const Form: React.FC = () => {   
  
    const { control, formState: { errors, isValid }, handleSubmit, setValue } = useForm<NewMeet>({
      mode: "onChange",
    })

    const submit: SubmitHandler<NewMeet> = async (data) => {
      await createMeet(data);
    };

    const { createMeet, loading, error } = useDataContext();
 
    // const submit: SubmitHandler<NewMeet> = (data) => console.log(data);



    const setDate = (event: DateTimePickerEvent, date?: Date) => {
      if (date) {
        setValue("date", date);
      }
    };
  
      
    return (
        <View style={styles.container}>
           <Controller
              control={control}
              defaultValue=""
              name="organiser"
              render={({ field: { onChange, onBlur, value }}) => (
                <> 
                  <TextInput label='Organiser' style={styles.input} value={value} onBlur={onBlur} onChangeText={onChange}/>
                  <HelperText type="error">{errors.organiser?.message}</HelperText>
                </>
              )}
            />


            <Controller
                    control={control}
                    name="date"
                    defaultValue={new Date()}
                    render={({ field: { value } }) => (
                      <RNDateTimePicker mode="datetime" display="default" onChange={setDate} value={value} />
                    )}
                  />

            <Controller
              control={control}
              defaultValue=""
              name="location"
              render={({field: { onChange, onBlur, value }}) => (
                <> 
                  <TextInput label='Location' style={styles.input} value={value} onBlur={onBlur} onChangeText={onChange}/>
                  <HelperText type="error">{errors.location?.message}</HelperText>
                </>
              )}
            />

            <Controller
              control={control}
              defaultValue=""
              name="description"
              render={({field: { onChange, onBlur, value }}) => (
                <> 
                  <TextInput label='Description' style={styles.input} value={value} onBlur={onBlur} onChangeText={onChange}/>
                  <HelperText type="error">{errors.description?.message}</HelperText>
                </>
              )}
            />

            <Button mode="contained" onPress={handleSubmit(submit)} disabled={!isValid}>
              Create
            </Button>
                  
        </View>
    )
}



const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        marginHorizontal: 30 
    },
    input: { 
        marginVertical: 5 
    },
    row: {
      alignItems: "center",
      flexDirection: "row",
      marginVertical: 20,
      justifyContent: "space-between",
    },
  })

export default Form