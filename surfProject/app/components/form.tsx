import React, { useState, useEffect } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { StyleSheet, Text, ScrollView } from "react-native"
import { Button, Checkbox, HelperText, TextInput } from "react-native-paper"
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { useDataContext } from "../context/MeetsContext"
import { MeetType } from "../type/Types"
import { SafeAreaView } from "react-native-safe-area-context"


type NewMeet = Omit<MeetType, '_id'>;

const Form: React.FC = () => {   
  const {username} = useDataContext();
  const skillLevels = ['beginner', 'intermediate', 'advanced'];
  const groupOptions = ['women-only', 'mixed gender', 'mothers','foamy fun!', 'seniors','long-boards', 'short-boards'];

  const [tags, setTags] = useState<{key: string, value: boolean}[]>(
    [...skillLevels, ...groupOptions].map(tag => ({key:tag, value: false}))
  );


  const { control, reset, formState: { errors, isValid, isSubmitSuccessful}, handleSubmit, setValue } = useForm<NewMeet>({
    mode: "onChange",
  })

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        organiser: "",
        date: new Date(),
        location: "",
        tags: tags.map(tag=> ({...tag, value: false})),
        description:'',
      })
      setTags([...skillLevels, ...groupOptions].map(tag => ({key:tag, value: false})))
    }
  }, [isSubmitSuccessful, reset])


  const handleTagChange = (key:string) => {
    setTags(prevTags => {
      const nextTags = prevTags.map(tag => 
        (tag.key === key ? {...tag, value: !tag.value} : tag)
        )
      
        setValue("tags", nextTags)
        return nextTags
    })
  
  };
    

    const { createMeet, loading, error } = useDataContext();

    const submit: SubmitHandler<NewMeet> = async (data) => {
      const organiser = username || "Unable to identify user";
      data.organiser = organiser;
      await createMeet(data);
    };

    const setDate = (event: DateTimePickerEvent, date?: Date) => {
      if (date) {
        setValue("date", date);
      }
    };
  
    
      
    return (

        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
          
           {/* <Controller
              control={control}
              defaultValue=""
              name="organiser"
              render={({ field: { onChange, onBlur, value }}) => (
                <> 
                  <TextInput label='Organiser' style={styles.input} value={value} onBlur={onBlur} onChangeText={onChange}/>
                  <HelperText type="error">{errors.organiser?.message}</HelperText>
                </>
              )}
            /> */}

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
                    name="date"
                    defaultValue={new Date()}
                    render={({ field: { value } }) => (
                      <RNDateTimePicker mode="datetime" display="default" onChange={(event, date) => setDate(event, date)} value={value} />
                    )}
                  />

           
            
            <Controller
              control={control}
              defaultValue={tags}
              name="tags"
              render={({field: { onChange }}) => (
                <> 
      
            <Text style={styles.text}>Skill Level</Text>
                  {skillLevels.map(level => (
                    <Checkbox.Item 
                        key={level}
                        label ={level} 
                        status={tags.find(tag => tag.key === level)?.value? 'checked' : 'unchecked'}
                        
                        onPress={() => {
                          handleTagChange(level);
                        }} 
                       
                    />
                  ))}
                   

                </>
              )}
            />


             <Controller
              control={control}
              defaultValue={tags}
              name="tags"
              render={({field: { onChange }}) => (
                <> 
      
              <Text style={styles.text}>Options</Text>
                  {groupOptions.map(type => (
                    <Checkbox.Item 
                        key={type}
                        label ={type} 
                        status={tags.find(tag => tag.key === type)?.value? 'checked' : 'unchecked'}
                        onPress={() => {
                          handleTagChange(type);
                          // setTimeout(()=>{onChange(tags)}, 1000);

                        //  console.log(tags)
                         
                        }}
                      
                    />
                  ))}
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
           
            </ScrollView>
        </SafeAreaView>
       
    )
}



const styles = StyleSheet.create({
    safeArea: {
      flex:1
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
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
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  })

export default Form