import React, { useState, useEffect } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native"
import { Button, Checkbox, HelperText, TextInput } from "react-native-paper"
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { useDataContext } from "../context/MeetsContext"
import { MeetType } from "../type/Types"
import { SafeAreaView } from "react-native-safe-area-context"
import FormStyles from "../styling/components/form"



type NewMeet = Omit<MeetType, '_id'>;

const Form: React.FC = () => {   
  const {username} = useDataContext();
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const groupOptions = ['Women-only', 'Mixed gender', 'Mothers', 'Seniors', 'Soft-tops','Long-boards', 'Short-boards'];

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

        <SafeAreaView style={FormStyles.container}>
          <ScrollView contentContainerStyle={FormStyles.scrollViewContent}>
          
            
            <Controller
              control={control}
              defaultValue=""
              name="location"
              render={({field: { onChange, onBlur, value }}) => (
                <> 
                  <Text style={FormStyles.text}>Location... </Text>
                  <TextInput label='Location' style={FormStyles.input} value={value} onBlur={onBlur} onChangeText={onChange} theme={{
              colors: {
                primary: '#6893BD',
              }, }} textColor={'#6893BD'}/>
                  <HelperText type="error">{errors.location?.message}</HelperText>
                </>
              )}
            />

            <Controller
                    control={control}
                    name="date"
                    defaultValue={new Date()}
                    render={({ field: { value } }) => (
                      <>
                      <Text style={FormStyles.text}>Date and Time ... </Text>
                      <RNDateTimePicker style={FormStyles.date} mode="datetime" display="default" onChange={(event, date) => setDate(event, date)} value={value} minimumDate={new Date}/>
                      </>
                    )}
                  />

           
            
            <Controller
              control={control}
              defaultValue={tags}
              name="tags"
              render={({field: { onChange }}) => (
                <> 
      
            <Text style={FormStyles.text}>Skill Level</Text>
                  {skillLevels.map(level => (
                    <Checkbox.Item 
                        key={level}
                        label ={level} 
                        status={tags.find(tag => tag.key === level)?.value? 'checked' : 'unchecked'}
                        color="#6893BD" 
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
      
              <Text style={FormStyles.text}>Options</Text>
                  {groupOptions.map(type => (
                    <Checkbox.Item 
                        key={type}
                        label ={type} 
                        status={tags.find(tag => tag.key === type)?.value? 'checked' : 'unchecked'}
                        color="#6893BD" 
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
                  <TextInput label='Description' style={FormStyles.input} value={value} onBlur={onBlur} onChangeText={onChange} theme={{
              colors: {
                primary: '#6893BD',
              }, }} textColor={'#6893BD'}/>
                  <HelperText type="error">{errors.description?.message}</HelperText>
                </>
              )}
            />

            <Button mode="contained" onPress={handleSubmit(submit)} disabled={!isValid}  style={FormStyles.button}>
              Create
            </Button>
           
            </ScrollView>
        </SafeAreaView>
       
    )
}



export default Form